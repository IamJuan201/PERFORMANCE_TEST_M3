export default function notFoundView() {
  return `
    <div class="min-h-screen flex flex-col items-center justify-center bg-slate-100 px-4">

      <h1 class="text-8xl font-bold text-slate-800">404</h1>

      <h2 class="text-2xl font-semibold text-slate-700 mt-4">Page Not Found</h2>

      <p class="text-slate-500 mt-2 text-center max-w-md">
        The page you are looking for does not exist.
      </p>

      <button
        id="goHomeBtn"
        class="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
      >
        Back to Home
      </button>

    </div>
  `;
}
