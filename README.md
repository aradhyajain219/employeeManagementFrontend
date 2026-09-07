# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
# Employee Management System

A responsive React application for managing employee records. The application provides a dashboard for viewing employees and forms for adding, updating, and deleting employee information.

## Live Demo

Visit the deployed application:

https://aradhyajain219.github.io/employeeManagementFrontend/

> The frontend currently connects to `http://localhost:8081`. The live GitHub Pages site needs a publicly hosted backend URL to load employee data outside the local development environment.

## Features

- View all employees in a responsive directory
- Add a new employee
- Update existing employee information
- Delete employees with a confirmation modal
- Form validation for names and email addresses
- Dashboard summary cards and responsive layout
- GitHub Pages deployment through GitHub Actions

## Built With

- React 19
- Vite
- React Router
- Axios
- Bootstrap
- Oxlint

## Project Structure

```text
src/
├── Components/
│   ├── EmployeeComponent.jsx
│   ├── FooterComponent.jsx
│   ├── HeaderComponent.jsx
│   └── ListEmployeeComponent.jsx
├── Services/
│   └── EmployeeService.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- A running employee-management backend API

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/aradhyajain219/employeeManagementFrontend.git
cd employeeManagementFrontend
npm install
```

### Start the development server

```bash
npm run dev
```

The application will be available at the local URL shown by Vite, usually:

http://localhost:5173

### Build for production

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Run linting

```bash
npm run lint
```

## Backend API

The frontend currently expects the backend at:

```text
http://localhost:8081/api/employees
```

Expected endpoints:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/employees/all` | List all employees |
| `GET` | `/api/employees/{id}` | Get one employee |
| `POST` | `/api/employees` | Create an employee |
| `PUT` | `/api/employees/update/{id}` | Update an employee |
| `DELETE` | `/api/employees/delete/{id}` | Delete an employee |

For production deployment, update `src/Services/EmployeeService.js` to use the public backend URL and configure the backend to allow requests from the GitHub Pages domain.

## Deployment

The project is configured to deploy automatically to GitHub Pages when changes are pushed to the `main` branch.

The workflow is located at:

```text
.github/workflows/deploy.yml
```

The Vite base path is configured for this repository in `vite.config.js`:

```js
base: '/employeeManagementFrontend/'
```

To deploy a new version:

```bash
git add .
git commit -m "Update application"
git push origin main
```

GitHub Actions will build the `dist` folder and publish it to GitHub Pages.

## License

This project is available for personal and educational use.
