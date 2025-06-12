/**
 * ロードが終わったら 「GET /welcome-message」でサーバーにアクセスする
 */

addEventListener('load', async () => {
	const response = await fetch('/welcome-message');
	document.querySelector('#welcomeMessage').innerText = await response.text();
});
