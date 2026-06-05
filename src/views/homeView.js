import Sidebar from "@/components/Sidebar";
import { getSession } from "@/utils";
import { homeController } from "@/controllers/home.controller";

export default function homeView() {
  const user = getSession();

  setTimeout(() => {
    homeController();
  });

  return `
    <div class="flex">

      ${Sidebar()}

      <main class="flex-1 p bg-slate-100 min-h-screen">

        <div class="">

          <h1 class="text-sm font-bold">
            Bienvenido ${user?.name}
          </h1>

          <p class="text-orange-900">
            Rol: ${user?.role}
          </p>

        </div>

        ${
          user?.role === "admin"
            ? `
              <section
                class="bg-white p-5 rounded-lg shadow mb-6"
              >
                <h2 class="font-bold text-xl mb-2">
                  Panel Administrador
                </h2>

                <p>
                  Puedes visualizar todas las reservas.
                </p>

                <button id="btn-booking" 
                  class="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Gestionar Reservas
                </button>

              </section>
              
            `
            : `
              <section
                class="bg-white p-5"
              >
                <h2 class="font-bold text-xl mb-2">
                  Panel Usuario
                </h2>

                <p>
                  Puedes visualizar únicamente tus reservas.
                </p>

                <button
                  class="mt-3 bg-green-600 text-white px-4 py-2 rounded"
                >
                  Nueva Reserva
                </button>

              </section>
            `
        }
        <!-- MODAL CREAR -->
        ${
          user?.role === "admin"
            ? `
              <div id="bookModal" class="modal-overlay hidden">
                  <div class="modal-box">
                    <div class="flex items-center justify-between mb-lg">
                      <h2 id="modalTitle" class="font-headline-md text-headline-md text-on-surface">Create Task</h2>
                      <button id="closeModal" class="material-symbols-outlined text-outline hover:text-on-surface transition-colors">close</button>
                    </div>
                    <form id="bookForm" class="space-y-lg">
                      <!-- Campo oculto para guardar el id cuando editamos -->
                      <input type="hidden" id="taskId" />

                      <div class="space-y-sm">
                        <label class="font-label-md text-label-md text-on-surface" for="taskTitle">Title</label>
                        <input id="taskTitle" type="text" placeholder="Workspace" class="w-full px-md py-md bg-white border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface input-focus-ring transition-all placeholder:text-outline" required />
                      </div>

                      <div class="space-y-sm">
                        <label class="font-label-md text-label-md text-on-surface" for="taskDescription">Description</label>
                        <textarea id="bookDescription" placeholder="Describe your reason..." rows="3" class="w-full px-md py-md bg-white border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface input-focus-ring transition-all placeholder:text-outline resize-none"></textarea>
                      </div>

                      <div class="space-y-sm">
                        <label class="font-label-md text-label-md text-on-surface" for="status">Status</label>
                        <select id="status" class="w-full px-md py-md bg-white border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface input-focus-ring transition-all">
                          <option value="to do">Approved</option>
                          <option value="in progress">Pending</option>
                        </select>
                      </div>

                      <div class="space-y-sm">
                        <label class="font-label-md text-label-md text-on-surface" for="taskUserId">Assign to</label>
                        <select id="bookUserId" class="w-full px-md py-md bg-white border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface input-focus-ring transition-all">
                          <option value="">-- Select a date --</option>
                        </select>
                      </div>

                      <div id="nookError" class="text-error font-body-sm text-body-sm hidden">Please fill in all required fields.</div>

                      <button type="submit" class="w-full bg-primary text-on-primary py-md px-lg rounded-lg font-label-md text-label-md flex items-center justify-center gap-sm hover:opacity-90 transition-opacity active:scale-[0.98]">
                        <span class="material-symbols-outlined text-[18px]">save</span>
                        Save workspace
                      </button>
                    </form>
                  </div>
                </div>
            `
            : `
              <div id="bookModal" class="modal-overlay hidden">
                  <div class="modal-box">
                    <div class="flex items-center justify-between mb-lg">
                      <h2 id="modalTitle" class="font-headline-md text-headline-md text-on-surface">Create Task</h2>
                      <button id="closeModal" class="material-symbols-outlined text-outline hover:text-on-surface transition-colors">close</button>
                    </div>
                    <form id="bookForm" class="space-y-lg">
                      <!-- Campo oculto para guardar el id cuando editamos -->
                      <input type="hidden" id="taskId" />

                      <div class="space-y-sm">
                        <label class="font-label-md text-label-md text-on-surface" for="taskTitle">Title</label>
                        <input id="taskTitle" type="text" placeholder="Workspace" class="w-full px-md py-md bg-white border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface input-focus-ring transition-all placeholder:text-outline" required />
                      </div>

                      <div class="space-y-sm">
                        <label class="font-label-md text-label-md text-on-surface" for="taskDescription">Description</label>
                        <textarea id="bookDescription" placeholder="Describe your reason..." rows="3" class="w-full px-md py-md bg-white border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface input-focus-ring transition-all placeholder:text-outline resize-none"></textarea>
                      </div>

                      <div class="space-y-sm">
                        <label class="font-label-md text-label-md text-on-surface" for="status">Status</label>
                        <select id="status" class="w-full px-md py-md bg-white border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface input-focus-ring transition-all">
                          <option value="to do">Approved</option>
                          <option value="in progress">Pending</option>
                        </select>
                      </div>

                      <div class="space-y-sm">
                        <label class="font-label-md text-label-md text-on-surface" for="taskUserId">Assign to</label>
                        <select id="bookUserId" class="w-full px-md py-md bg-white border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface input-focus-ring transition-all">
                          <option value="">-- Select a date --</option>
                        </select>
                      </div>

                      <div id="nookError" class="text-error font-body-sm text-body-sm hidden">Please fill in all required fields.</div>

                      <button type="submit" class="w-full bg-primary text-on-primary py-md px-lg rounded-lg font-label-md text-label-md flex items-center justify-center gap-sm hover:opacity-90 transition-opacity active:scale-[0.98]">
                        <span class="material-symbols-outlined text-[18px]">save</span>
                        Save workspace
                      </button>
                    </form>
                  </div>
                </div>
            `
        }

        <section
          class="bg-white p-5 rounded-lg shadow"
        >

          <div
            class="flex justify-between items-center mb-4"
          >
            <h2 class="font-bold text-xl">
              Reservas
            </h2>

            <span
              class="text-sm text-slate-500"
            >
              ${
                user?.role === "admin"
                  ? "Mostrando todas las reservas"
                  : "Mostrando únicamente tus reservas"
              }
            </span>
          </div>

          <div
            id="reservationsContainer"
            class="grid gap-4 md:grid-cols-2"
          >
            <div class="w-full text-center py-8 col-span-2">
              <p class="text-emerald-800">
                Cargando reservas ...
              </p>
            </div>
          </div>

        </section>

      </main>

    </div>
  `;
}