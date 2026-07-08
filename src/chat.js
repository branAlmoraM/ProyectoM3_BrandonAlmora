import {
  createMessageElement,
  isValidMessage,
  sanitizeText,
  scrollToBottom,
} from "./utils.js";

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

  if (!form || !input || !messages || !typing) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const userMessage = sanitizeText(input.value);

    if (!isValidMessage(userMessage)) return;

    addMessage("user", userMessage);
    input.value = "";

    emptyChat?.remove();

    showTyping(true);

    setTimeout(() => {
      const batmanResponse = getFakeBatmanResponse();

      addMessage("batman", batmanResponse);
      showTyping(false);
    }, 1200);
  });

  function addMessage(sender, text) {
    const message = createMessageElement(sender, text);

    messages.appendChild(message);
    scrollToBottom(messages);
  }

  function showTyping(isVisible) {
    typing.classList.toggle("hidden", !isVisible);
  }

  function getFakeBatmanResponse() {
    const index = Math.floor(Math.random() * fakeBatmanResponses.length);
    return fakeBatmanResponses[index];
  }
}
