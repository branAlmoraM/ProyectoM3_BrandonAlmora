import {
  createMessageElement,
  isValidMessage,
  sanitizeText,
  scrollToBottom,
} from "./utils.js";

import { sendMessageToBatman } from "./services/gemini.js";

let conversation = [];

export function initChat() {
  const form = document.querySelector("#chat-form");
  const input = document.querySelector("#message-input");
  const sendButton = document.querySelector("#send-button");
  const clearButton = document.querySelector("#clear-chat");
  const messagesContainer = document.querySelector("#messages");
  const typing = document.querySelector("#typing");
  const errorMessage = document.querySelector("#error-message");

  if (
    !form ||
    !input ||
    !sendButton ||
    !clearButton ||
    !messagesContainer ||
    !typing ||
    !errorMessage
  ) {
    return;
  }

  form.addEventListener("submit", handleSubmit);
  clearButton.addEventListener("click", clearConversation);

  input.focus();

  async function handleSubmit(event) {
    event.preventDefault();

    const userMessage = sanitizeText(input.value);

    if (!isValidMessage(userMessage)) return;

    addMessage("user", userMessage);
    conversation.push({
      role: "user",
      text: userMessage,
    });

    input.value = "";
    showError("");
    setLoading(true);

    try {
      const batmanResponse = await sendMessageToBatman(conversation);

      addMessage("batman", batmanResponse);

      conversation.push({
        role: "model",
        text: batmanResponse,
      });
    } catch (error) {
      showError("Batman no pudo responder. Intenta de nuevo.");
    } finally {
      setLoading(false);
      input.focus();
    }
  }

  function addMessage(sender, text) {
    removeEmptyState();

    const message = createMessageElement(sender, text);

    messagesContainer.appendChild(message);
    scrollToBottom(messagesContainer);
  }

  function clearConversation() {
    conversation = [];

    messagesContainer.innerHTML = `
      <div id="empty-chat" class="empty-chat">
        <p>Comienza a chatear con Batman.</p>
      </div>
    `;

    showError("");
    setLoading(false);
    input.value = "";
    input.focus();
  }

  function removeEmptyState() {
    const emptyChat = document.querySelector("#empty-chat");

    if (emptyChat) {
      emptyChat.remove();
    }
  }

  function setLoading(isLoading) {
    typing.classList.toggle("hidden", !isLoading);
    input.disabled = isLoading;
    sendButton.disabled = isLoading;
    clearButton.disabled = isLoading;
  }

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.toggle("hidden", !message);
  }
}
