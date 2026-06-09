import Sidebar from "@components/Sidebar";
import { getSession } from "@/utils";
import { homeController } from "@controllers/home.controller";

export default function homeView() {
  const activeUser = getSession();

  setTimeout(() => {
    homeController();
  });

  return `
    <div class="flex">

      ${Sidebar()}

      <main class="flex-1 bg-slate-100 min-h-screen p-6">

        <div class="mb-6">
          <h1 class="text-2xl font-bold text-slate-800">
            Welcome, ${activeUser?.name}
          </h1>
          <p class="text-slate-500 text-sm">
            Role: ${activeUser?.role}
          </p>
        </div>

        <section class="bg-white p-5 rounded-lg shadow mb-6">

          <div class="flex justify-between items-center mb-4">
            <h2 class="font-bold text-xl text-slate-800">My Reservations</h2>
            <button
              id="newReservationBtn"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition"
            >
              New Reservation
            </button>
          </div>

          <div
            id="reservationsContainer"
            class="grid gap-4 md:grid-cols-2"
          >
            <div class="w-full text-center py-8 col-span-2">
              <p class="text-slate-400">Loading reservations...</p>
            </div>
          </div>

        </section>

      </main>

    </div>
  `;
}
