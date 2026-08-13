/*
 * bookmarklet.js を、ブックマークの URL 欄に貼れる 1 行に変換します。
 *
 *   node rehearsal/build.mjs
 *
 * 出力は bookmarklet.txt です。
 * bookmarklet.js を編集したら、このコマンドを実行して再生成してください。
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(here, 'bookmarklet.js'), 'utf8');

// encodeURIComponent で包むと、改行やコメントを含んだまま 1 行にできます。
// 圧縮せずにそのまま渡すので、行末コメントが後続のコードを飲み込む事故が起きません。
const url = 'javascript:' + encodeURIComponent(source);

// 元に戻せることを確認してから書き出します。
if (decodeURIComponent(url.slice('javascript:'.length)) !== source) {
  throw new Error('エンコード結果が元のソースと一致しません');
}

const out = join(here, 'bookmarklet.txt');
writeFileSync(out, url + '\n');
console.log('生成しました: ' + out + ' (' + url.length + ' 文字)');
