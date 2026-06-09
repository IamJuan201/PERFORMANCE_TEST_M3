import { http } from "@api/http";

export const loginUser = (email, password) =>
  http.get(`/users?email=${email}&password=${password}`);
