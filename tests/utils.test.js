import { describe, expect, it } from "vitest";

import {
  sanitizeText,
  isValidMessage,
  createMessageElement,
  scrollToBottom,
} from "../src/utils.js";

describe("utils.js", () => {
  it("sanitizeText elimina espacios al inicio y al final", () => {
    const result = sanitizeText("   Hola Batman   ");

    expect(result).toBe("Hola Batman");
  });

  it("isValidMessage devuelve false si el mensaje está vacío", () => {
    const result = isValidMessage("     ");

    expect(result).toBe(false);
  });

  it("isValidMessage devuelve true si el mensaje tiene contenido", () => {
    const result = isValidMessage("Necesito ayuda en Gotham");

    expect(result).toBe(true);
  });

  it("createMessageElement crea un mensaje del usuario con la clase correcta", () => {
    const element = createMessageElement("user", "Hola Batman");

    expect(element.textContent).toBe("Hola Batman");
    expect(element.classList.contains("message")).toBe(true);
    expect(element.classList.contains("message-user")).toBe(true);
  });

  it("createMessageElement crea un mensaje de Batman con la clase correcta", () => {
    const element = createMessageElement(
      "batman",
      "Estoy analizando la situación",
    );

    expect(element.textContent).toBe("Estoy analizando la situación");
    expect(element.classList.contains("message")).toBe(true);
    expect(element.classList.contains("message-batman")).toBe(true);
  });

  it("scrollToBottom mueve el scroll al final del contenedor", () => {
    const element = {
      scrollTop: 0,
      scrollHeight: 500,
    };

    scrollToBottom(element);

    expect(element.scrollTop).toBe(500);
  });
});
