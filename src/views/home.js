export function HomeView() {
  return `
    <section class="view">
      <div class="hero">
        <h2 class="hero-title">Chatea con Batman</h2>
        <p class="hero-text">
          Entra a la Baticueva digital y conversa con el Caballero de la Noche.
          Recibe respuestas con un tono serio, estratégico y directo.
        </p>

        <button class="primary-btn" data-route="/chat">
          Comenzar a chatear
        </button>
      </div>
    </section>
  `;
}
