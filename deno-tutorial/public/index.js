/**
 * ロードが終わったら 「GET /welcome-message」でサーバーにアクセスする
 */
window.onload = async () => {
  const response = await fetch('/welcome-message')
  document.querySelector('#welcomeMessage').innerText = await response.text()
}
