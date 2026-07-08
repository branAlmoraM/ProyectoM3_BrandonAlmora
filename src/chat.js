import {
  createMessageElement,
  isValidMessage,
  sanitizeText,
  scrollToBottom,
} from "./utils.js";

import { sendMessageToBatman } from "./services/gemini.js";

export function initChat() {
  const form = document.querySelector("#chat-form");
  const input = document.querySelector("#message-input");
  const messages = document.querySelector("#messages");
  const emptyChat = document.querySelector("#empty-chat");
  const typing = document.querySelector("#typing");
  const errorMessage = document.querySelector("#error-message");

  if (!form || !input || !messages || !typing || !errorMessage) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userMessage = sanitizeText(input.value);

    if (!isValidMessage(userMessage)) return;

    addMessage("user", userMessage);
    input.value = "";
    emptyChat?.remove();
    showError("");
    showTyping(true);

    try {
      const batmanResponse = await sendMessageToBatman(userMessage);
      addMessage("batman", batmanResponse);
    } catch (error) {
      showError("Batman no pudo responder. Intenta de nuevo.");
    } finally {
      showTyping(false);
    }
  });

  function addMessage(sender, text) {
    const message = createMessageElement(sender, text);
    messages.appendChild(message);
    scrollToBottom(messages);
  }

  function showTyping(isVisible) {
    typing.classList.toggle("hidden", !isVisible);
  }

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.toggle("hidden", !message);
  }
}
