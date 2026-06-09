const STATUS_STYLES = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  cancelled: "bg-slate-100 text-slate-600",
};

export default function ReservationCard(reservation, showActions, currentUserRole) {
  const { id, workspace, date, startHour, endHour, reason, status, userId } = reservation;

  const statusStyle = STATUS_STYLES[status] || "bg-slate-100 text-slate-600";

  const canEdit =
    showActions &&
    ((currentUserRole === "user" && status === "pending") ||
      currentUserRole === "admin");

  const canDelete = showActions && currentUserRole === "admin";

  const canCancel =
    showActions &&
    currentUserRole === "user" &&
    (status === "pending" || status === "approved");

  const canApproveReject = showActions && currentUserRole === "admin" && status === "pending";

  return `
    <article class="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">

      <div class="flex justify-between items-start mb-2">
        <h3 class="font-bold text-slate-800">${workspace}</h3>
        <span class="text-xs px-2 py-1 rounded-full font-medium ${statusStyle}">
          ${status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <p class="text-sm text-slate-600">Date: ${date}</p>
      <p class="text-sm text-slate-600">Time: ${startHour} - ${endHour}</p>
      <p class="text-sm text-slate-600">Reason: ${reason}</p>

      ${
        showActions
          ? `
        <div class="flex flex-wrap gap-2 mt-3">
          ${canEdit ? `<button data-action="edit" data-id="${id}" class="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Edit</button>` : ""}
          ${canDelete ? `<button data-action="delete" data-id="${id}" class="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>` : ""}
          ${canCancel ? `<button data-action="cancel" data-id="${id}" class="text-xs bg-slate-500 text-white px-3 py-1 rounded hover:bg-slate-600">Cancel</button>` : ""}
          ${canApproveReject ? `
            <button data-action="approve" data-id="${id}" class="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Approve</button>
            <button data-action="reject" data-id="${id}" class="text-xs bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500">Reject</button>
          ` : ""}
        </div>
      `
          : ""
      }

    </article>
  `;
}
