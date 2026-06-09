import { saveSession } from "@/utils";
import { navigateTo } from "@router/router";
import { loginUser } from "@services/auth.service";
import { isAdmin } from "@/utils";

export const loginController = () => {
  const form = document.querySelector("#loginForm");
  const errorMessage = document.querySelector("#loginErrorMessage");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const emailValue = form.email.value.trim();
    const passwordValue = form.password.value.trim();

    errorMessage.classList.add("hidden");
    errorMessage.textContent = "";

    try {
      const matchedUsers = await loginUser(emailValue, passwordValue);

      if (!matchedUsers.length) {
        errorMessage.textContent = "Incorrect email or password.";
        errorMessage.classList.remove("hidden");
        return;
      }

      const loggedUser = matchedUsers[0];

      saveSession({
        id: loggedUser.id,
        name: loggedUser.name,
        role: loggedUser.role,
        email: loggedUser.email,
      });

      navigateTo(loggedUser.role === "admin" ? "/admin" : "/home");
    } catch (error) {
      console.error(error);
      errorMessage.textContent = "Could not connect to the server. Is json-server running?";
      errorMessage.classList.remove("hidden");
    }
  });
};
