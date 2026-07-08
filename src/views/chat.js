export function ChatView() {
  return `
    <section class="view">
      <div class="chat-panel">
        <div class="chat-header">
          <div>
            <h2 class="view-title">Chat con Batman</h2>
            <p>Pregunta algo. Batman analizará la situación.</p>
          </div>

          <button id="clear-chat" class="secondary-btn" type="button">
            Nueva conversación
          </button>
        </div>

        <div id="messages" class="messages">
          <div id="empty-chat" class="empty-chat">
            <p>Comienza a chatear con Batman.</p>
          </div>
        </div>

        <p id="typing" class="typing hidden">
          Batman está escribiendo...
        </p>

        <div id="error-message" class="error-message hidden"></div>

        <form id="chat-form" class="chat-form">
          <input
            id="message-input"
            type="text"
            placeholder="Escribe tu mensaje..."
            autocomplete="off"
          />
          <button id="send-button" type="submit">Enviar</button>
        </form>
      </div>
    </section>
  `;
}
