export function sanitizeText(text) {
  return text.trim();
}

export function isValidMessage(text) {
  return sanitizeText(text).length > 0;
}

export function createMessageElement(sender, text) {
  const message = document.createElement("div");

  message.classList.add("message");

  if (sender === "user") {
    message.classList.add("message-user");
  } else {
    message.classList.add("message-batman");
  }

  message.textContent = text;

  return message;
}

export function scrollToBottom(element) {
  element.scrollTop = element.scrollHeight;
}
