import { getAllSpaces } from "@services/space.service";

export default async function ReservationModal(existingReservation) {
  const spaces = await getAllSpaces();

  const spaceOptions = spaces
    .filter((space) => space.status === "available")
    .map(
      (space) =>
        `<option value="${space.name}" data-space-id="${space.id}" ${
          existingReservation && existingReservation.workspace === space.name ? "selected" : ""
        }>${space.name} (${space.type})</option>`
    )
    .join("");

  const modalTitle = existingReservation ? "Edit Reservation" : "New Reservation";
  const submitLabel = existingReservation ? "Save Changes" : "Create Reservation";

  const modal = document.createElement("div");
  modal.id = "reservationModal";
  modal.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

  modal.innerHTML = `
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">

      <h2 class="text-xl font-bold text-slate-800 mb-4">${modalTitle}</h2>

      <form id="reservationForm">

        <label class="block text-sm font-medium text-slate-700 mb-1">Space</label>
        <select
          name="workspace"
          class="border w-full p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Select a space</option>
          ${spaceOptions}
        </select>

        <label class="block text-sm font-medium text-slate-700 mb-1">Date</label>
        <input
          type="date"
          name="date"
          value="${existingReservation?.date || ""}"
          class="border w-full p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >

        <label class="block text-sm font-medium text-slate-700 mb-1">Start Time</label>
        <input
          type="time"
          name="startHour"
          value="${existingReservation?.startHour || ""}"
          class="border w-full p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >

        <label class="block text-sm font-medium text-slate-700 mb-1">End Time</label>
        <input
          type="time"
          name="endHour"
          value="${existingReservation?.endHour || ""}"
          class="border w-full p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >

        <label class="block text-sm font-medium text-slate-700 mb-1">Reason</label>
        <input
          type="text"
          name="reason"
          value="${existingReservation?.reason || ""}"
          placeholder="Reason for booking"
          class="border w-full p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >

        <p id="modalErrorMessage" class="text-red-500 text-sm mb-3 hidden"></p>

        <div class="flex gap-3 justify-end">
          <button
            type="button"
            id="cancelModalBtn"
            class="px-4 py-2 rounded border text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            ${submitLabel}
          </button>
        </div>

      </form>

    </div>
  `;

  return modal;
}
