# SpaceBook - Workspace Reservation System

## Description

SpaceBook is a Single Page Application (SPA) for managing workspace reservations. Employees can book shared spaces such as meeting rooms, private offices, coworking areas, and auditoriums. Administrators can manage all reservations and spaces.

## Technologies Used

- Vite
- Vanilla JavaScript (ES Modules)
- Tailwind CSS v4
- json-server (mock REST API)
- concurrently

## Installation

```bash
npm install
```

## Running the Project

```bash
npm run dev
```

This command runs Vite and json-server at the same time using concurrently.

- Frontend: http://localhost:5173
- API: http://localhost:3001

## Running json-server Only

```bash
npx json-server --watch db.json --port 3001
```

## Test Users

| Name           | Email           | Password  | Role  |
|----------------|-----------------|-----------|-------|
| Administrador  | admin@test.com  | Admin123* | admin |
| Usuario One    | user@test.com   | User123*  | user  |
| Usuario Two    | user2@test.com  | User123*  | user  |

## Project Structure

```
src/
  api/
    http.js               - Base fetch wrapper for HTTP requests
  components/
    ReservationCard.js    - Card component for a single reservation
    ReservationModal.js   - Modal form to create or edit a reservation
    Sidebar.js            - Navigation sidebar with logout
  controllers/
    admin.controller.js   - Logic for the admin panel
    home.controller.js    - Logic for the user dashboard
    login.controller.js   - Logic for the login form
  router/
    router.js             - SPA routing with authentication and role guards
  services/
    auth.service.js       - API calls for authentication
    reservation.service.js - API calls for reservations (CRUD)
    space.service.js      - API calls for spaces (CRUD)
  utils.js                - Session helpers (save, get, remove, isAuthenticated, isAdmin)
  views/
    adminView.js          - Admin dashboard view
    homeView.js           - User dashboard view
    loginView.js          - Login page view
    notFound.js           - 404 page view
  main.js                 - App entry point
  style.css               - Tailwind CSS import
db.json                   - json-server database
```

## Role Permissions

### Admin
- View all reservations
- Create, edit, and delete any reservation
- Approve or reject pending reservations
- Create, edit, and delete spaces

### User
- View only their own reservations
- Create new reservations
- Edit their own pending reservations
- Cancel their own reservations (pending or approved)

## Technical Decisions

- **Hash-free routing**: Uses the History API (`pushState`) for clean URLs. Route guards redirect unauthenticated users to `/` and unauthorized users to an access denied screen.
- **Session storage**: User data is stored in `localStorage` under the key `session_user`. This keeps the session alive on page refresh and is cleared on logout.
- **Modular architecture**: Each concern (view, controller, service, component) lives in its own file. Views return HTML strings. Controllers attach event listeners after the DOM is ready using `setTimeout`.
- **Role-based rendering**: The router checks the user role before rendering protected routes. The sidebar and reservation cards also adapt their content based on the role.
- **No duplicate reservations**: Validation prevents booking the same space in an overlapping time slot on the same date (basic check on end time vs start time).
