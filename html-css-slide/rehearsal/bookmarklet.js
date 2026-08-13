/*
 * Marp スライドのリハーサル計測ブックマークレット
 *
 * slide.html を開いた状態で起動すると、スライドを送るたびに滞在時間を記録する。
 * 記録は localStorage に逐次保存するので、誤ってリロードしても続きから再開できる。
 *
 * キー操作
 *   Ctrl+Shift+E  記録を Markdown で書き出す (クリップボードとファイルの両方)
 *   Ctrl+Shift+P  一時停止 / 再開 (右上のバッジをクリックしても同じ)
 *   Ctrl+Shift+X  記録を破棄して最初から
 */
(() => {
  'use strict';

  const STORAGE_KEY = 'marp-rehearsal:' + location.pathname;
  const VERSION = 1;

  // 二重起動したときは計測を止めず、バッジの表示だけ切り替える
  if (window.__marpRehearsal) {
    window.__marpRehearsal.toggleBadge();
    return;
  }

  /* ------------------------------------------------------------------ *
   * スライドの目次
   * ------------------------------------------------------------------ */

  // Marp の HTML では各スライドが <svg> の中の <section id="連番"> になっている
  const slides = [...document.querySelectorAll('section[id]')]
    .map((el) => {
      const h1 = el.querySelector('h1');
      const h2 = el.querySelector('h2');
      return {
        n: Number(el.id),
        h1: h1 ? h1.textContent.trim() : null,
        h2: h2 ? h2.textContent.trim() : null,
      };
    })
    .filter((s) => Number.isFinite(s.n) && s.n > 0)
    .sort((a, b) => a.n - b.n);

  if (slides.length === 0) {
    alert('スライドが見つかりません。Marp が生成した slide.html で実行してください。');
    return;
  }

  const total = slides.length;
  const byNumber = new Map(slides.map((s) => [s.n, s]));

  const labelOf = (n) => {
    const s = byNumber.get(n);
    if (!s) return '(不明なスライド)';
    if (s.h1 && s.h2) return s.h1 + ' — ' + s.h2;
    return s.h1 || s.h2 || '(見出しなし)';
  };

  // h1 を持つスライドを章の扉とみなす
  const chapters = slides
    .filter((s) => s.h1)
    .map((s) => ({ start: s.n, title: s.h1, sub: s.h2 }));

  // 章の範囲を確定させる。1 枚目が章扉でない場合に備えて先頭を補う
  if (chapters.length === 0 || chapters[0].start > 1) {
    chapters.unshift({ start: 1, title: '(章の前)', sub: null });
  }
  chapters.forEach((c, i) => {
    c.end = i + 1 < chapters.length ? chapters[i + 1].start - 1 : total;
  });

  const chapterOf = (n) => chapters.find((c) => n >= c.start && n <= c.end) || null;

  /* ------------------------------------------------------------------ *
   * 計測の状態
   *
   * events の at は「一時停止を除いた進行時間 (ms)」で持つ。
   * こうしておくと、休憩を挟んでも章の所要時間がそのまま足し算になる。
   * ------------------------------------------------------------------ */

  const freshState = () => ({
    version: VERSION,
    startedAt: new Date().toISOString(),
    base: 0, // 直近の再開までに積んだ進行時間
    paused: false,
    pausedTotal: 0, // 一時停止していた実時間の合計
    events: [],
  });

  const load = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && parsed.version === VERSION && Array.isArray(parsed.events) ? parsed : null;
    } catch (e) {
      return null;
    }
  };

  let state = load();
  if (state && state.events.length > 0) {
    const at = new Date(state.startedAt).toLocaleString('ja-JP');
    const keep = confirm(
      '前回の記録が残っています (' + at + ' 開始 / ' + state.events.length + ' 件)。\n\n' +
        'OK: 続きから記録する\n' +
        'キャンセル: 破棄して最初から'
    );
    if (!keep) state = freshState();
  } else {
    state = freshState();
  }

  let resumeAt = Date.now(); // 直近に計測を再開した実時刻
  let pausedAt = state.paused ? Date.now() : null;

  const progress = () => (state.paused ? state.base : state.base + (Date.now() - resumeAt));

  const save = () => {
    // 保存前に進行時間を base へ畳んでおくと、リロード後もそのまま続けられる
    if (!state.paused) {
      state.base = progress();
      resumeAt = Date.now();
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* 保存できなくても計測は続ける */
    }
  };

  const currentPage = () => {
    const n = Number(location.hash.replace('#', ''));
    return Number.isFinite(n) && n > 0 ? n : 1;
  };

  const record = (n) => {
    const last = state.events[state.events.length - 1];
    if (last && last.n === n) return; // 同じスライドの連続記録は無視する
    state.events.push({ n, at: progress() });
    save();
  };

  const pause = () => {
    if (state.paused) return;
    state.base = progress();
    state.paused = true;
    pausedAt = Date.now();
    save();
  };

  const resume = () => {
    if (!state.paused) return;
    if (pausedAt !== null) state.pausedTotal += Date.now() - pausedAt;
    pausedAt = null;
    state.paused = false;
    resumeAt = Date.now();
    save();
  };

  const togglePause = () => (state.paused ? resume() : pause());

  /* ------------------------------------------------------------------ *
   * 集計
   * ------------------------------------------------------------------ */

  const fmt = (ms) => {
    const sec = Math.max(0, Math.round(ms / 1000));
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    const pad = (v) => String(v).padStart(2, '0');
    return h > 0 ? h + ':' + pad(m) + ':' + pad(s) : m + ':' + pad(s);
  };

  const summarize = () => {
    const now = progress();
    const perSlide = new Map(); // n -> { ms, visits }

    state.events.forEach((e, i) => {
      const end = i + 1 < state.events.length ? state.events[i + 1].at : now;
      const entry = perSlide.get(e.n) || { ms: 0, visits: 0 };
      entry.ms += Math.max(0, end - e.at);
      entry.visits += 1;
      perSlide.set(e.n, entry);
    });

    const perChapter = chapters.map((c) => {
      let ms = 0;
      let visited = 0;
      for (let n = c.start; n <= c.end; n++) {
        const entry = perSlide.get(n);
        if (!entry) continue;
        ms += entry.ms;
        visited += 1;
      }
      const first = state.events.find((e) => e.n >= c.start && e.n <= c.end);
      return { ...c, ms, visited, count: c.end - c.start + 1, startedAt: first ? first.at : null };
    });

    return { now, perSlide, perChapter, visited: perSlide.size };
  };

  /* ------------------------------------------------------------------ *
   * 書き出し
   * ------------------------------------------------------------------ */

  const toMarkdown = () => {
    const { now, perSlide, perChapter, visited } = summarize();
    const started = new Date(state.startedAt);
    const stamp = started.toLocaleString('ja-JP', { dateStyle: 'medium', timeStyle: 'short' });

    const lines = [];
    lines.push('# リハーサル記録 — ' + stamp);
    lines.push('');
    lines.push('- 所要: ' + fmt(now) + ' (一時停止 ' + fmt(state.pausedTotal) + ' を除く)');
    lines.push('- 通過スライド: ' + visited + ' / ' + total);
    lines.push('');
    lines.push('## 章ごとの所要');
    lines.push('');
    lines.push('| 章 | 所要 | 開始時点 | 通過 |');
    lines.push('| --- | --- | --- | --- |');
    perChapter.forEach((c) => {
      const title = c.sub ? c.title + ' ' + c.sub : c.title;
      lines.push(
        '| ' +
          title +
          ' | ' +
          (c.visited ? fmt(c.ms) : '-') +
          ' | ' +
          (c.startedAt === null ? '-' : fmt(c.startedAt)) +
          ' | ' +
          c.visited +
          ' / ' +
          c.count +
          ' |'
      );
    });
    lines.push('');
    lines.push('## スライドごとの所要');
    lines.push('');
    lines.push('| # | 見出し | 所要 | 訪問 |');
    lines.push('| --- | --- | --- | --- |');
    slides.forEach((s) => {
      const entry = perSlide.get(s.n);
      lines.push(
        '| ' +
          s.n +
          ' | ' +
          labelOf(s.n).replace(/\|/g, '\\|') +
          ' | ' +
          (entry ? fmt(entry.ms) : '-') +
          ' | ' +
          (entry ? entry.visits : 0) +
          ' |'
      );
    });
    lines.push('');
    return lines.join('\n');
  };

  const fileName = () => {
    const d = new Date(state.startedAt);
    const pad = (v) => String(v).padStart(2, '0');
    return (
      'rehearsal-' +
      d.getFullYear() +
      '-' +
      pad(d.getMonth() + 1) +
      '-' +
      pad(d.getDate()) +
      '-' +
      pad(d.getHours()) +
      pad(d.getMinutes()) +
      '.md'
    );
  };

  const exportRecord = async () => {
    save();
    const md = toMarkdown();

    // ファイルとして残す
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName();
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    // 貼り付けたいときのためにクリップボードにも入れる
    let copied = false;
    try {
      await navigator.clipboard.writeText(md);
      copied = true;
    } catch (e) {
      /* 権限がなければファイルだけ残る */
    }

    flash('書き出しました' + (copied ? ' (クリップボードにもコピー)' : ''));
    console.log(md);
  };

  const reset = () => {
    if (!confirm('記録を破棄して最初から計測しますか?')) return;
    state = freshState();
    resumeAt = Date.now();
    pausedAt = null;
    record(currentPage());
    flash('リセットしました');
  };

  /* ------------------------------------------------------------------ *
   * バッジ
   * ------------------------------------------------------------------ */

  const panelStyle = (top, cursor) =>
    [
      'position:fixed',
      'top:' + top,
      'right:10px',
      'z-index:2147483647',
      'padding:6px 10px',
      'border-radius:6px',
      'font:12px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace',
      'color:#fff',
      'background:rgba(24,24,27,.82)',
      'box-shadow:0 1px 4px rgba(0,0,0,.3)',
      'cursor:' + cursor,
      'user-select:none',
      'white-space:pre',
      'text-align:right',
    ].join(';');

  const badge = document.createElement('div');
  badge.style.cssText = panelStyle('10px', 'pointer');
  badge.title = 'クリックで一時停止 / 再開\nCtrl+Shift+E で書き出し\nCtrl+Shift+X でリセット';
  badge.addEventListener('click', togglePause);
  document.body.appendChild(badge);

  const flashEl = document.createElement('div');
  flashEl.style.cssText = panelStyle('56px', 'default');
  flashEl.style.display = 'none';
  document.body.appendChild(flashEl);

  let flashTimer = null;
  const flash = (msg) => {
    flashEl.textContent = msg;
    flashEl.style.display = '';
    clearTimeout(flashTimer);
    flashTimer = setTimeout(() => {
      flashEl.style.display = 'none';
    }, 2500);
  };

  const renderBadge = () => {
    const n = currentPage();
    const chapter = chapterOf(n);
    const { perChapter } = summarize();
    const inChapter = chapter ? perChapter.find((c) => c.start === chapter.start) : null;

    // 章名が長いとバッジが横に伸びるので、表示だけ切り詰める (書き出しはフルのまま)
    const short = (s) => (s.length > 14 ? s.slice(0, 13) + '…' : s);

    badge.style.background = state.paused ? 'rgba(82,82,91,.82)' : 'rgba(127,29,29,.82)';
    badge.textContent =
      (state.paused ? 'PAUSE' : 'REC') +
      '  ' +
      fmt(progress()) +
      '\n' +
      n +
      ' / ' +
      total +
      (inChapter ? '  ' + short(inChapter.title) + ' ' + fmt(inChapter.ms) : '');
  };

  /* ------------------------------------------------------------------ *
   * 起動
   * ------------------------------------------------------------------ */

  window.addEventListener('hashchange', () => {
    record(currentPage());
    renderBadge();
  });

  document.addEventListener(
    'keydown',
    (e) => {
      if (!e.ctrlKey || !e.shiftKey || e.altKey || e.metaKey) return;
      const key = e.key.toLowerCase();
      if (key !== 'e' && key !== 'p' && key !== 'x') return;
      e.preventDefault();
      e.stopPropagation();
      if (key === 'e') exportRecord();
      if (key === 'p') {
        togglePause();
        flash(state.paused ? '一時停止しました' : '再開しました');
        renderBadge();
      }
      if (key === 'x') reset();
    },
    true // bespoke のキー操作より先に受け取る
  );

  setInterval(renderBadge, 500);
  setInterval(save, 5000);

  record(currentPage());
  renderBadge();

  window.__marpRehearsal = {
    toggleBadge() {
      const hidden = badge.style.display === 'none';
      badge.style.display = hidden ? '' : 'none';
      flash(hidden ? 'バッジを表示しました' : 'バッジを隠しました (計測は継続中)');
    },
    export: exportRecord,
    markdown: toMarkdown,
    state: () => state,
  };

  flash('リハーサル計測を開始しました');
})();
