import ReservationCard from "@components/ReservationCard";
import ReservationModal from "@components/ReservationModal";
import { getAllReservations, createReservation, updateReservation, deleteReservation } from "@services/reservation.service";
import { getAllSpaces, createSpace, updateSpace, deleteSpace } from "@services/space.service";
import { getSession } from "@/utils";

let allReservations = [];
let allSpaces = [];

const renderAllReservations = async () => {
  const container = document.querySelector("#reservationsContainer");

  allReservations = await getAllReservations();

  container.innerHTML = allReservations.length
    ? allReservations
        .map((reservation) => ReservationCard(reservation, true, "admin"))
        .join("")
    : `<div class="w-full text-center py-8 col-span-2"><p class="text-slate-400">No reservations found.</p></div>`;

  container.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.getAttribute("data-action");
      const reservationId = Number(button.getAttribute("data-id"));
      const targetReservation = allReservations.find((r) => r.id === reservationId);

      if (action === "delete") handleDeleteReservation(reservationId);
      if (action === "approve") handleUpdateStatus(reservationId, "approved");
      if (action === "reject") handleUpdateStatus(reservationId, "rejected");
      if (action === "edit" && targetReservation) openReservationModal(targetReservation);
    });
  });
};

const handleDeleteReservation = async (reservationId) => {
  const confirmed = confirm("Delete this reservation? This action cannot be undone.");
  if (!confirmed) return;

  await deleteReservation(reservationId);
  renderAllReservations();
};

const handleUpdateStatus = async (reservationId, newStatus) => {
  await updateReservation(reservationId, { status: newStatus });
  renderAllReservations();
};

const openReservationModal = async (existingReservation) => {
  const modal = await ReservationModal(existingReservation);
  document.body.appendChild(modal);

  document.querySelector("#cancelModalBtn").addEventListener("click", () => {
    modal.remove();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.remove();
  });

  document.querySelector("#reservationForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const errorMessage = document.querySelector("#modalErrorMessage");
    const activeUser = getSession();

    const selectedStartHour = form.startHour.value;
    const selectedEndHour = form.endHour.value;

    if (selectedStartHour >= selectedEndHour) {
      errorMessage.textContent = "End time must be after start time.";
      errorMessage.classList.remove("hidden");
      return;
    }

    const reservationData = {
      userId: activeUser.id,
      workspace: form.workspace.value,
      date: form.date.value,
      startHour: selectedStartHour,
      endHour: selectedEndHour,
      reason: form.reason.value.trim(),
    };

    if (existingReservation) {
      await updateReservation(existingReservation.id, reservationData);
    } else {
      reservationData.status = "pending";
      await createReservation(reservationData);
    }

    modal.remove();
    renderAllReservations();
  });
};

const renderSpaces = async () => {
  const container = document.querySelector("#spacesContainer");

  allSpaces = await getAllSpaces();

  container.innerHTML = allSpaces.length
    ? allSpaces
        .map(
          (space) => `
        <article class="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <div class="flex justify-between items-start mb-2">
            <h3 class="font-bold text-slate-800">${space.name}</h3>
            <span class="text-xs px-2 py-1 rounded-full font-medium ${
              space.status === "available"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }">
              ${space.status}
            </span>
          </div>
          <p class="text-sm text-slate-600">Type: ${space.type}</p>
          <p class="text-sm text-slate-600">Capacity: ${space.capacity}</p>
          <p class="text-sm text-slate-600">Location: ${space.location}</p>
          <div class="flex gap-2 mt-3">
            <button data-space-action="edit" data-id="${space.id}" class="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Edit</button>
            <button data-space-action="delete" data-id="${space.id}" class="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
          </div>
        </article>
      `
        )
        .join("")
    : `<div class="w-full text-center py-8 col-span-2"><p class="text-slate-400">No spaces found.</p></div>`;

  container.querySelectorAll("[data-space-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.getAttribute("data-space-action");
      const spaceId = Number(button.getAttribute("data-id"));
      const targetSpace = allSpaces.find((s) => s.id === spaceId);

      if (action === "delete") handleDeleteSpace(spaceId);
      if (action === "edit" && targetSpace) openSpaceModal(targetSpace);
    });
  });
};

const handleDeleteSpace = async (spaceId) => {
  const confirmed = confirm("Delete this space? This action cannot be undone.");
  if (!confirmed) return;

  await deleteSpace(spaceId);
  renderSpaces();
};

const openSpaceModal = (existingSpace) => {
  const modal = document.createElement("div");
  modal.id = "spaceModal";
  modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

  modal.innerHTML = `
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-bold text-slate-800 mb-4">${existingSpace ? "Edit Space" : "New Space"}</h2>
      <form id="spaceForm">
        <label class="block text-sm font-medium text-slate-700 mb-1">Name</label>
        <input type="text" name="name" value="${existingSpace?.name || ""}" class="border w-full p-2 rounded mb-3" required>

        <label class="block text-sm font-medium text-slate-700 mb-1">Type</label>
        <select name="type" class="border w-full p-2 rounded mb-3" required>
          <option value="meeting_room" ${existingSpace?.type === "meeting_room" ? "selected" : ""}>Meeting Room</option>
          <option value="private_office" ${existingSpace?.type === "private_office" ? "selected" : ""}>Private Office</option>
          <option value="coworking" ${existingSpace?.type === "coworking" ? "selected" : ""}>Coworking</option>
          <option value="auditorium" ${existingSpace?.type === "auditorium" ? "selected" : ""}>Auditorium</option>
        </select>

        <label class="block text-sm font-medium text-slate-700 mb-1">Capacity</label>
        <input type="number" name="capacity" value="${existingSpace?.capacity || ""}" class="border w-full p-2 rounded mb-3" min="1" required>

        <label class="block text-sm font-medium text-slate-700 mb-1">Location</label>
        <input type="text" name="location" value="${existingSpace?.location || ""}" class="border w-full p-2 rounded mb-3" required>

        <label class="block text-sm font-medium text-slate-700 mb-1">Status</label>
        <select name="status" class="border w-full p-2 rounded mb-4">
          <option value="available" ${existingSpace?.status === "available" ? "selected" : ""}>Available</option>
          <option value="unavailable" ${existingSpace?.status === "unavailable" ? "selected" : ""}>Unavailable</option>
        </select>

        <div class="flex gap-3 justify-end">
          <button type="button" id="cancelSpaceModalBtn" class="px-4 py-2 rounded border text-slate-600 hover:bg-slate-100">Cancel</button>
          <button type="submit" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">${existingSpace ? "Save Changes" : "Create Space"}</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  document.querySelector("#cancelSpaceModalBtn").addEventListener("click", () => {
    modal.remove();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.remove();
  });

  document.querySelector("#spaceForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target;

    const spaceData = {
      name: form.name.value.trim(),
      type: form.type.value,
      capacity: Number(form.capacity.value),
      location: form.location.value.trim(),
      status: form.status.value,
    };

    if (existingSpace) {
      await updateSpace(existingSpace.id, spaceData);
    } else {
      await createSpace(spaceData);
    }

    modal.remove();
    renderSpaces();
  });
};

const handleTabSwitch = () => {
  const tabReservations = document.querySelector("#tabReservations");
  const tabSpaces = document.querySelector("#tabSpaces");

  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab");

      document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.className = "tab-btn px-4 py-2 rounded bg-slate-300 text-slate-700 text-sm";
      });
      button.className = "tab-btn px-4 py-2 rounded bg-blue-600 text-white text-sm";

      if (targetTab === "reservations") {
        tabReservations.classList.remove("hidden");
        tabSpaces.classList.add("hidden");
      } else {
        tabReservations.classList.add("hidden");
        tabSpaces.classList.remove("hidden");
        renderSpaces();
      }
    });
  });
};

export const adminController = () => {
  renderAllReservations();
  handleTabSwitch();

  document.querySelector("#newReservationBtn").addEventListener("click", () => {
    openReservationModal(null);
  });

  document.querySelector("#newSpaceBtn").addEventListener("click", () => {
    openSpaceModal(null);
  });
};
