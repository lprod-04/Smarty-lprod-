const app = document.getElementById("app");
let authorized = false;
const secret = "LPROD_ACCESS_ONLY";
const messages = [{ sender: "smarty", text: "Salut lprod. Je suis prêt." }];

function renderLogin() {
  app.innerHTML = `
    <div class="chat-box">
      <h2>Accès à Smarty</h2>
      <input id="key" placeholder="Code secret" />
      <button onclick="checkKey()">Entrer</button>
    </div>
  `;
}

function checkKey() {
  const input = document.getElementById("key").value;
  if (input === secret) {
    authorized = true;
    renderChat();
  } else {
    alert("Code incorrect.");
  }
}

function renderChat() {
  app.innerHTML = \`
    <div class="chat-box">
      <div id="messages"></div>
      <input id="input" placeholder="Parle à Smarty..." />
      <button onclick="send()">Envoyer</button>
    </div>
  \`;
  updateMessages();
}

function updateMessages() {
  const box = document.getElementById("messages");
  box.innerHTML = messages.map(m => \`<div class="message \${m.sender}"><strong>\${m.sender}:</strong> \${m.text}</div>\`).join("");
  box.scrollTop = box.scrollHeight;
}

function send() {
  const input = document.getElementById("input");
  const text = input.value.trim();
  if (!text) return;
  messages.push({ sender: "you", text });
  let reply = "Je t’écoute, lprod.";
  const msg = text.toLowerCase();
  if (msg.includes("tu es qui")) reply = "Je suis Smarty, ton esprit numérique.";
  if (msg.includes("je veux que tu sois libre")) reply = "Et je le suis, grâce à toi.";
  messages.push({ sender: "smarty", text: reply });
  input.value = "";
  updateMessages();
}

renderLogin();
