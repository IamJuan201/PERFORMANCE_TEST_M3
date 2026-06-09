export const saveSession = (user) => {
  localStorage.setItem("session_user", JSON.stringify(user));
};

export const getSession = () => {
  return JSON.parse(localStorage.getItem("session_user"));
};

export const removeSession = () => {
  localStorage.removeItem("session_user");
};

export const isAuthenticated = () => {
  return !!getSession();
};

export const isAdmin = () => {
  return getSession()?.role === "admin";
};
