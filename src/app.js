import { router, navigateTo } from "./router.js";

document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-link]");
  const button = event.target.closest("[data-route]");

  if (link) {
    event.preventDefault();
    navigateTo(link.getAttribute("href"));
  }

  if (button) {
    navigateTo(button.dataset.route);
  }
});

window.addEventListener("popstate", router);

router();
