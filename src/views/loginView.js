import { loginController } from "@controllers/login.controller";

export default function loginView() {
  setTimeout(() => {
    loginController();
  });

  return `
    <div class="min-h-screen flex justify-center items-center bg-slate-100">

      <div class="bg-white p-8 rounded-lg shadow w-96">

        <h1 class="text-3xl font-bold mb-2 text-slate-800">
          SpaceBook
        </h1>

        <p class="text-slate-500 mb-6 text-sm">
          Workspace Reservation System
        </p>

        <form id="loginForm">

          <label class="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="email@example.com"
            class="border w-full p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >

          <label class="block text-sm font-medium text-slate-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            class="border w-full p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >

          <p
            id="loginErrorMessage"
            class="text-red-500 text-sm mb-3 hidden"
          >
          </p>

          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded font-medium transition"
          >
            Sign In
          </button>

        </form>

      </div>

    </div>
  `;
}
