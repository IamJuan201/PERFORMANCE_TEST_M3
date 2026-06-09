import { http } from "@api/http";

export const getAllSpaces = () =>
  http.get("/spaces");

export const createSpace = (data) =>
  http.post("/spaces", data);

export const updateSpace = (id, data) =>
  http.patch(`/spaces/${id}`, data);

export const deleteSpace = (id) =>
  http.delete(`/spaces/${id}`);
