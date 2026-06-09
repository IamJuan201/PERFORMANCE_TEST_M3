import { http } from "@api/http";

export const getAllReservations = () =>
  http.get("/reservations");

export const getReservationsByUser = (userId) =>
  http.get(`/reservations?userId=${userId}`);

export const createReservation = (data) =>
  http.post("/reservations", data);

export const updateReservation = (id, data) =>
  http.patch(`/reservations/${id}`, data);

export const deleteReservation = (id) =>
  http.delete(`/reservations/${id}`);
