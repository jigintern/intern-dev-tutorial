/*
 * slide.md と rehearsal/transcript/*.md から、発表者ノート入りの slide.notes.md を生成します。
 *
 *   node rehearsal/build-notes.mjs             # このスクリプトのある教材に対して実行
 *   node rehearsal/build-notes.mjs <教材dir>   # 別教材を指定（例: 2026/shinkei-suijaku）
 *
 * transcript の各ブロック（## 見出し）を、slide.md の「同じ見出し」のスライドに
 * 発表者ノート（HTML コメント）として差し込みます。
 * → 見出しは transcript 側で、スライドの見出しを一字一句そのままコピーしておくのが前提です
 *   （transcript/README.md の「生成ルール」を参照）。
 *
 * 生成した slide.notes.md を marp でビルドし、ブラウザで P キーを押すと
 * 発表者ビューに台本が表示されます（投影スライドには出ません）。
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url)); // .../rehearsal
const arg = process.argv[2];
const materialDir = arg ? resolve(arg) : dirname(scriptDir);
const rehearsalDir = arg ? join(materialDir, 'rehearsal') : scriptDir;
const transcriptDir = join(rehearsalDir, 'transcript');
const slidePath = join(materialDir, 'slide.md');
const outPath = join(materialDir, 'slide.notes.md');

// 見出しの表記ゆれ（全角半角・空白・末尾記号・強調）を吸収して比較するためのキー。
const norm = s =>
  s.normalize('NFKC').replace(/[`*_]/g, '').replace(/\s+/g, '').replace(/[.:。、]+$/, '').toLowerCase();

// スライド／ブロックの先頭見出し（コードブロック内は無視）。
const firstHeading = block => {
  let inFence = false;
  for (const line of block.split(/\r?\n/)) {
    if (/^```/.test(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    const m = line.match(/^#{1,6}\s+(.*\S)\s*$/);
    if (m) return m[1];
  }
  return null;
};

if (!existsSync(transcriptDir)) {
  console.error('transcript/ が見つかりません: ' + transcriptDir);
  process.exit(1);
}
if (!existsSync(slidePath)) {
  console.error('slide.md が見つかりません: ' + slidePath);
  process.exit(1);
}

// --- transcript を「## 見出し」ブロックに分解 ---
const files = readdirSync(transcriptDir).filter(f => /^\d{2}-.*\.md$/.test(f)).sort();
const blocks = []; // { heading, note }
for (const f of files) {
  const text = readFileSync(join(transcriptDir, f), 'utf8');
  for (const part of text.split(/^(?=##\s)/m)) {
    const m = part.match(/^##\s+(.*\S)\s*$/m);
    if (!m) continue; // 先頭の「# タイトル」や「> 前書き」は無視
    const note = part.replace(/^##\s+.*$/m, '').trim();
    if (note) blocks.push({ heading: m[1], note });
  }
}
const noteByHeading = new Map();
for (const b of blocks) {
  const k = norm(b.heading);
  if (!noteByHeading.has(k)) noteByHeading.set(k, []);
  noteByHeading.get(k).push(b.note);
}

// --- slide.md を frontmatter + スライド配列に分解 ---
const lines = readFileSync(slidePath, 'utf8').split(/\r?\n/);
let fmEnd = -1;
if (lines[0].trim() === '---') {
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') { fmEnd = i; break; }
  }
}
const frontmatter = fmEnd >= 0 ? lines.slice(0, fmEnd + 1).join('\n') : '';
const body = (fmEnd >= 0 ? lines.slice(fmEnd + 1) : lines).join('\n');
const slides = body.split(/^---$/m);

// --- 各スライドにノートを差し込む ---
const used = new Set();
let matched = 0;
const unmatchedSlides = [];
const merged = slides.map(slide => {
  const h = firstHeading(slide);
  if (!h) return slide;
  const q = noteByHeading.get(norm(h));
  if (q && q.length) {
    // HTML コメントを閉じてしまう "--" を全角ダッシュに置換してから差し込む。
    const note = q.shift().replace(/-{2,}/g, '—');
    matched++;
    used.add(norm(h));
    return slide.replace(/\s*$/, '') + `\n\n<!--\n${note}\n-->\n`;
  }
  unmatchedSlides.push(h);
  return slide;
});

writeFileSync(outPath, (frontmatter ? frontmatter + '\n' : '') + merged.join('---'));

// --- レポート ---
const withHeading = slides.filter(s => firstHeading(s)).length;
const leftover = blocks.filter(b => !used.has(norm(b.heading))).map(b => b.heading);
const rel = arg ? arg.replace(/\/$/, '') + '/' : '';
console.log(`生成しました: ${outPath}`);
console.log(`スライド ${slides.length} 枚（見出しあり ${withHeading} 枚）／ ノートを差し込めた: ${matched} 枚`);
if (unmatchedSlides.length) {
  console.log(`\n台本が見つからなかったスライド (${unmatchedSlides.length}) — transcript 側の見出しをスライドに合わせると埋まります:`);
  unmatchedSlides.forEach(h => console.log('  - ' + h));
}
if (leftover.length) {
  console.log(`\nどのスライドにも一致しなかった台本ブロック (${leftover.length}):`);
  leftover.forEach(h => console.log('  - ' + h));
}
console.log(`\n次のコマンドで発表者ノート付き HTML を作成:`);
console.log(`  pnpm exec marp ${rel}slide.notes.md --html -o ${rel}slide.notes.html --allow-local-files`);
console.log(`  → ブラウザで開き、P キーで発表者ビュー（台本が表示されます）`);
