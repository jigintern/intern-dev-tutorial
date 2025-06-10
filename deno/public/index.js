/**
 * ロードが終わったら 「GET /welcome-message」でサーバーにアクセスする
 */
onload = async () => {
	const response = await fetch('/welcome-message');
	document.querySelector('#welcomeMessage').innerText = await response.text();
};
