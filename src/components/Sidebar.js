import { removeSession, isAdmin } from "@/utils";
import { navigateTo } from "@router/router";

export default function Sidebar() {
  setTimeout(() => {
    document.querySelector("#logoutBtn")?.addEventListener("click", () => {
      removeSession();
      navigateTo("/");
    });

    document.querySelectorAll("[data-link]").forEach((anchor) => {
      anchor.addEventListener("click", (event) => {
        event.preventDefault();
        navigateTo(anchor.getAttribute("href"));
      });
    });
  });

  const adminLinks = isAdmin()
    ? `
      <a href="/admin" class="px-3 py-2 rounded hover:bg-slate-700 transition" data-link>
        All Reservations
      </a>
      <a href="/admin#spaces" class="px-3 py-2 rounded hover:bg-slate-700 transition" data-link>
        Manage Spaces
      </a>
    `
    : "";

  return `
    <aside class="w-64 bg-slate-900 text-white h-screen p-5 flex flex-col">

      <h2 class="text-2xl font-bold mb-2">SpaceBook</h2>

      <p class="text-slate-400 text-xs mb-8">Workspace Reservation</p>

      <nav class="flex flex-col gap-2 flex-1">

        <a href="/home" class="px-3 py-2 rounded hover:bg-slate-700 transition" data-link>
          My Reservations
        </a>

        ${adminLinks}

      </nav>

      <button
        id="logoutBtn"
        class="text-left cursor-pointer text-red-400 hover:text-white hover:bg-red-500 px-3 py-2 rounded transition"
      >
        Sign Out
      </button>

    </aside>
  `;
}
