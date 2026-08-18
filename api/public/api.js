document.querySelector("#greetingButton").onclick = async () => {
  const response = await fetch("/greeting");
  document.querySelector("#serverResponse").innerText = await response.text();
};

document.querySelector("#greetingMeButton").onclick = async () => {
  const name = document.querySelector("#nameInput").value;
  const response = await fetch("/greeting-me?name=" + name);
  document.querySelector("#serverResponse").innerText = await response.text();
};

document.querySelector("#authButton").onclick = async () => {
  const pass = document.querySelector("#passwordInput").value;
  const response = await fetch("/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pass: pass }),
  });
  document.querySelector("#serverResponse").innerText = await response.text();
};
