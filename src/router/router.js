import loginView from "@views/loginView";
import homeView from "@views/homeView";
import adminView from "@views/adminView";
import notFoundView from "@views/notFound";
import { isAuthenticated, isAdmin } from "@/utils";

const routes = {
  "/": loginView,
  "/home": homeView,
  "/admin": adminView,
};

export const navigateTo = (path) => {
  history.pushState({}, "", path);
  router();
};

export const router = () => {
  const app = document.querySelector("#app");
  const currentPath = window.location.pathname;

  if (currentPath !== "/" && !isAuthenticated()) {
    history.replaceState({}, "", "/");
    app.innerHTML = loginView();
    return;
  }

  if (currentPath === "/" && isAuthenticated()) {
    const destination = isAdmin() ? "/admin" : "/home";
    history.replaceState({}, "", destination);
    app.innerHTML = routes[destination]();
    return;
  }

  if (currentPath === "/admin" && isAuthenticated() && !isAdmin()) {
    app.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center bg-slate-100">
        <h1 class="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p class="text-slate-600 mb-6">You do not have permission to access this page.</p>
        <button
          id="backToHomeBtn"
          class="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Back to Home
        </button>
      </div>
    `;
    setTimeout(() => {
      document.querySelector("#backToHomeBtn")?.addEventListener("click", () => {
        navigateTo("/home");
      });
    });
    return;
  }

  const view = routes[currentPath];

  if (!view) {
    app.innerHTML = notFoundView();
    setTimeout(() => {
      document.querySelector("#goHomeBtn")?.addEventListener("click", () => {
        navigateTo(isAuthenticated() ? "/home" : "/");
      });
    });
    return;
  }

  app.innerHTML = view();
};

window.addEventListener("popstate", router);
