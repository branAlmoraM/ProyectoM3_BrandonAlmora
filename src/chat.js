const fakeBatmanResponses = [
  "He analizado la situación. Necesitamos actuar con estrategia.",
  "No basta con tener fuerza. La preparación lo es todo.",
  "Cada decisión tiene consecuencias. Piensa antes de actuar.",
  "Gotham me enseñó que incluso en la oscuridad puede haber esperanza.",
];

export function initChat() {
  const form = document.querySelector("#chat-form");
  const input = document.querySelector("#message-input");
  const messages = document.querySelector("#messages");
  const emptyChat = document.querySelector("#empty-chat");
  const typing = document.querySelector("#typing");

  if (!form || !input || !messages) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const text = input.value.trim();

    if (!text) return;

    addMessage("user", text);
    input.value = "";

    if (emptyChat) {
      emptyChat.remove();
    }

    showTyping(true);

    setTimeout(() => {
      const response = getFakeBatmanResponse();
      addMessage("batman", response);
      showTyping(false);
    }, 1200);
  });

  function addMessage(sender, text) {
    const message = document.createElement("div");

    message.classList.add("message");

    if (sender === "user") {
      message.classList.add("message-user");
    } else {
      message.classList.add("message-batman");
    }

    message.textContent = text;
    messages.appendChild(message);

    scrollToBottom();
  }

  function showTyping(isVisible) {
    typing.classList.toggle("hidden", !isVisible);
  }

  function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
  }

  function getFakeBatmanResponse() {
    const index = Math.floor(Math.random() * fakeBatmanResponses.length);
    return fakeBatmanResponses[index];
  }
}
