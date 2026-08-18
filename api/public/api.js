document.querySelector("#greetingButton").onclick = async () => {
  const response = await fetch("/greeting");
  document.querySelector("#greetingResult").innerText = await response.text();
};

document.querySelector("#greetingMeButton").onclick = async () => {
  const name = document.querySelector("#nameInput").value;
  const response = await fetch("/greeting-me?name=" + name);
  document.querySelector("#greetingMeResult").innerText = await response.text();
};

document.querySelector("#profileButton").onclick = async () => {
  const response = await fetch("/profile");
  const data = await response.json();
  document.querySelector("#profileResult").innerText = data.name + " / " + data.favorite;
};

document.querySelector("#authButton").onclick = async () => {
  const password = document.querySelector("#passwordInput").value;
  const response = await fetch("/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: password }),
  });
  const data = await response.json();
  document.querySelector("#authResult").innerText = data.message;
};
