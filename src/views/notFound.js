export function NotFoundView() {
  return `
    <section class="view">
      <div class="about-card">

        <h1 class="view-title">404</h1>

        <h2>Página no encontrada</h2>

        <p>
          La ruta que intentas visitar no existe o fue movida.
        </p>

        <button class="primary-btn" data-route="/home">
          Volver al inicio
        </button>

      </div>
    </section>
  `;
}
