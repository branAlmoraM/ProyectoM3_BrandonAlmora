import { HomeView } from "./views/home.js";
import { ChatView } from "./views/chat.js";
import { AboutView } from "./views/about.js";
import { NotFoundView } from "./views/notFound.js";
import { initChat } from "./chat.js";

const routes = {
  "/": HomeView,
  "/home": HomeView,
  "/chat": ChatView,
  "/about": AboutView,
};

export function router() {
  const app = document.querySelector("#app");
  const path = window.location.pathname;

  const view = routes[path];

  if (view) {
    app.innerHTML = view();
  } else {
    app.innerHTML = NotFoundView();
  }

  if (path === "/chat") {
    initChat();
  }
}

export function navigateTo(path) {
  window.history.pushState({}, "", path);
  router();
}
