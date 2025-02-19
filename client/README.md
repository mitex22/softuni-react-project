# SoftUni React Project

This project is a React application built with Vite. It includes various features such as authentication, NFT management, and user portfolio management. The project uses several libraries and tools to enhance development and user experience.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
- [Dependencies](#dependencies)
- [License](#license)

## Features

- User Authentication (Register, Login, Logout)
- NFT Management (Create, Edit, View, List)
- User Portfolio Management
- Protected Routes for authenticated and unauthenticated users
- Error Handling with a custom 404 Not Found page
- Toast notifications for user feedback
- Scroll to top functionality on route change

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed Node.js and npm. You can download them from [nodejs.org](https://nodejs.org/).
- You have a basic understanding of JavaScript, React, and web development.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/softuni-react-project.git
    ```

2. Navigate to the project directory:
    ```bash
    cd softuni-react-project/client
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the development server:
    ```bash
    npm run dev
    ```

2. Open your browser and navigate to `http://localhost:5173`

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
├── .eslintrc.js                        # ESLint configuration
├── .gitignore                          # Git ignore file
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
