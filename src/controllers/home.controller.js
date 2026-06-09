import ReservationCard from "@components/ReservationCard";
import ReservationModal from "@components/ReservationModal";
import { getReservationsByUser, createReservation, updateReservation } from "@services/reservation.service";
import { getSession } from "@/utils";

const renderUserReservations = async () => {
  const container = document.querySelector("#reservationsContainer");
  const activeUser = getSession();

  const userReservations = await getReservationsByUser(activeUser.id);

  container.innerHTML = userReservations.length
    ? userReservations
        .map((reservation) => ReservationCard(reservation, true, "user"))
        .join("")
    : `<div class="w-full text-center py-8 col-span-2"><p class="text-slate-400">No reservations found.</p></div>`;

  container.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.getAttribute("data-action");
      const reservationId = Number(button.getAttribute("data-id"));
      const targetReservation = userReservations.find((r) => r.id === reservationId);

      if (action === "cancel") {
        handleCancelReservation(reservationId);
      }

      if (action === "edit" && targetReservation) {
        openReservationModal(targetReservation);
      }
    });
  });
};

const handleCancelReservation = async (reservationId) => {
  const confirmed = confirm("Are you sure you want to cancel this reservation?");
  if (!confirmed) return;

  await updateReservation(reservationId, { status: "cancelled" });
  renderUserReservations();
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

    const selectedWorkspace = form.workspace.value;
    const selectedDate = form.date.value;
    const selectedStartHour = form.startHour.value;
    const selectedEndHour = form.endHour.value;

    if (selectedStartHour >= selectedEndHour) {
      errorMessage.textContent = "End time must be after start time.";
      errorMessage.classList.remove("hidden");
      return;
    }

    const reservationData = {
      userId: activeUser.id,
      workspace: selectedWorkspace,
      date: selectedDate,
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
    renderUserReservations();
  });
};

export const homeController = () => {
  renderUserReservations();

  document.querySelector("#newReservationBtn").addEventListener("click", () => {
    openReservationModal(null);
  });
};
