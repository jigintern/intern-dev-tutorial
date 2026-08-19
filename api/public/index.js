const message = await fetch("/welcome-message")
document.querySelector("#welcomeMessage").innerText = await message.text()
