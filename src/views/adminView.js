import Sidebar from "@components/Sidebar";
import { getSession } from "@/utils";
import { adminController } from "@controllers/admin.controller";

export default function adminView() {
  const activeUser = getSession();

  setTimeout(() => {
    adminController();
  });

  return `
    <div class="flex">

      ${Sidebar()}

      <main class="flex-1 bg-slate-100 min-h-screen p-6">

        <div class="mb-6">
          <h1 class="text-2xl font-bold text-slate-800">
            Admin Panel
          </h1>
          <p class="text-slate-500 text-sm">
            Logged in as: ${activeUser?.name}
          </p>
        </div>

        <div class="flex gap-3 mb-6">
          <button
            id="showReservationsTab"
            class="tab-btn px-4 py-2 rounded bg-blue-600 text-white text-sm"
            data-tab="reservations"
          >
            All Reservations
          </button>
          <button
            id="showSpacesTab"
            class="tab-btn px-4 py-2 rounded bg-slate-300 text-slate-700 text-sm"
            data-tab="spaces"
          >
            Manage Spaces
          </button>
          <button
            id="newReservationBtn"
            class="ml-auto px-4 py-2 rounded bg-green-600 text-white text-sm hover:bg-green-700"
          >
            New Reservation
          </button>
        </div>

        <section id="tabReservations" class="bg-white p-5 rounded-lg shadow mb-6">
          <h2 class="font-bold text-xl text-slate-800 mb-4">All Reservations</h2>
          <div id="reservationsContainer" class="grid gap-4 md:grid-cols-2">
            <div class="w-full text-center py-8 col-span-2">
              <p class="text-slate-400">Loading reservations...</p>
            </div>
          </div>
        </section>

        <section id="tabSpaces" class="bg-white p-5 rounded-lg shadow hidden">
          <div class="flex justify-between items-center mb-4">
            <h2 class="font-bold text-xl text-slate-800">Spaces</h2>
            <button
              id="newSpaceBtn"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
            >
              New Space
            </button>
          </div>
          <div id="spacesContainer" class="grid gap-4 md:grid-cols-2">
            <div class="w-full text-center py-8 col-span-2">
              <p class="text-slate-400">Loading spaces...</p>
            </div>
          </div>
        </section>

      </main>

    </div>
  `;
}
