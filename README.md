# NFT Zoo
## SoftUni React Project

This project is a React application built with Vite. It includes various features such as authentication, NFT management, user portfolio management, and end-to-end testing with Cypress. The project uses several libraries and tools to enhance development and user experience.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Server](#server)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
- [Dependencies](#dependencies)
- [Testing](#testing)

## Features

- User Authentication (Register, Login, Logout)
- NFT Management (Create, Edit, View, List, Delete)
- User Portfolio Management
- Protected Routes for authenticated and unauthenticated users
- Error Handling with a custom 404 Not Found page
- Toast notifications for user feedback
- Scroll to top functionality on route change
- Dynamic button states for operations like "Buy NFT," "Edit NFT," and "Delete NFT"
- End-to-End Testing with Cypress for robust application testing

## Prerequisites

Before you begin, ensure you have installed *Node.js* and *npm*. You can download them from [nodejs.org](https://nodejs.org/).

## Server
The server used in the project is SoftUni Practice Server.
It was slightly modified and pre-seeded with data.

## Installation

1. Clone the repository:
    ```
    git clone https://github.com/your-username/softuni-react-project.git
    ```

2. Navigate to the project directory:
    ```
    cd softuni-react-project/client
    ```

3. Install the dependencies:
    ```
    npm install
    ```

## Usage

1. In a terminal:
    - navigate to *server* folder
    - run 
    ```
    node .\server.js
    ```

2. In another terminal:
    - navigate to *client* folder
    - run 
    ```
    npm run dev
    ```

3. Open your browser and navigate to `http://localhost:5173`.

## Folder Structure

```
client/
├── public/                             # Public assets
├── src/                                # Source files
│   ├── api/                            # API calls
│   ├── components/                     # React components
│   │   ├── common/                     # Common reusable components
│   │   ├── footer/                     # Footer component
│   │   ├── header/                     # Header component
│   │   ├── home/                       # Home page component
│   │   ├── login/                      # Login page component
│   │   ├── logout/                     # Logout component
│   │   ├── nft-create/                 # NFT creation component
│   │   ├── nft-details/                # NFT details component
│   │   ├── nft-edit/                   # NFT edit component
│   │   ├── nft-list/                   # NFT list component
│   │   ├── not-found/                  # 404 Not Found component
│   │   ├── register/                   # Register page component
│   │   ├── users-list/                 # Users list component
│   │   └── users-list/user-portfolio/  # User portfolio component
│   ├── contexts/                       # Context providers
│   ├── hooks/                          # Custom hooks
│   ├── paths/                          # Path constants
│   ├── App.jsx                         # Main App component
│   ├── index.jsx                       # Entry point for React
│   └── main.jsx                        # Main entry point
├── cypress/                            # Cypress E2E testing files
│   ├── e2e/                            # Test cases
│   ├── fixtures/                       # Test data
│   ├── support/                        # Cypress support files
├── .eslintrc.js                        # ESLint configuration
├── .gitignore                          # Git ignore file
├── cypress.config.js                   # Cypress configuration
├── package.json                        # Project dependencies and scripts
├── README.md                           # Project documentation
└── vite.config.js                      # Vite configuration
```

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run serve`: Serves the production build.
- `npm run lint`: Runs ESLint to check for linting errors.

## Dependencies

- **React**: A JavaScript library for building user interfaces.
- **React Router**: A library for routing in React applications.
- **Vite**: A build tool that provides a fast development server and optimized builds.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **React Toastify**: A library for displaying toast notifications.
- **ESLint**: A tool for identifying and fixing linting errors in JavaScript code.
- **Cypress**: A testing framework for end-to-end testing.

## Testing

This project uses Cypress for end-to-end testing. Cypress is a powerful testing framework that allows you to write and run tests for your application in a real browser environment.

### Running Tests

1. In a terminal:
    - navigate to *server* folder
    - run 
    ```
    node .\server.js
    ```

2. In second terminal:
    - navigate to *client* folder
    - run 
    ```
    npm run dev
    ```

3. In third terminal
    - navigate to *client* folder
    - to execute a specific suite you can run e.g.
    ```
    npx cypress run --spec ".\cypress\e2e\11-NFT-actions.spec.js" --browser chrome --headed
    ```
*NOTE: All http requests are going to be executed using the data stored in the server whether that be a POST/PUT/DELETE request this will actually change the data on the server so you might need to restart it before actually executing a test suite just to revert the initial state of the server data*

*TODO: Try to mock (stubs/fixtures) the data used in the tests so it will not require restariting of the server in between suites execution*