import { serveDir } from '@std/http';

/**
 * APIリクエストを処理する
 */
Deno.serve((req) => {
	// URLのパスを取得
	const pathname = new URL(req.url).pathname;
	console.log(pathname);
	// パスが'/welcome-message'だったら「'jigインターンへようこそ！'」の文字を返す
	if (req.method === 'GET' && pathname === '/welcome-message') {
		return new Response('jig.jpインターンへようこそ！👍');
	}

	// publicフォルダ内にあるファイルを返す
	return serveDir(req, {
		fsRoot: 'deno/public',
		urlRoot: '',
		showDirListing: true,
		enableCors: true,
	});
});
