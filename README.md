# CinemaHub

## Description

CinemaHub is a React project that uses Vite as the build tool and ESLint to maintain code quality. This repository provides a minimal setup to start developing React applications with Hot Module Replacement (HMR).

## Technologies

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast and lightweight development environment that provides an optimized development experience.
- **ESLint**: A tool for identifying and reporting patterns in JavaScript code, helping to maintain code quality and consistency.

## Features

- Basic structure of a React project.
- ESLint configuration to ensure best practices in the code.
- Support for Fast Refresh using two Vite plugins:
  - @vitejs/plugin-react: Uses Babel for Fast Refresh.
  - @vitejs/plugin-react-swc: Uses SWC for Fast Refresh.

## Installation

To get started with CinemaHub, follow these steps:

1. **Clone the repository**:

   
```bash
   git clone https://github.com/Ypz22/CinemaHub.git
```

2. **Navigate to the project directory**:

   
```bash
   cd CinemaHub
```

3. **Install the dependencies**:

   
```bash
   npm install
```

## Usage

##  Quick Start

###  Frontend

Run the frontend development server:

```bash
npm run dev
```

This command is run in the root of the project where the frontend is located.

---

### 🛠 Backend

To start the backend server with nodemon:

```bash
cd backend
nodemon server.js
```

Make sure you have the necessary dependencies installed in the backend folder.

---

## ✅ Requirements

- Node.js and npm installed
- Nodemon installed globally (you can do this with npm install -g nodemon)

## 🧪 Notes

- The frontend usually runs on http://localhost:3000
- The backend can run on http://localhost:5000 or another port defined in server.js
This will start the application in development mode and automatically open your browser at http://localhost:3000.

## How It Works

CinemaHub is designed to provide a seamless user experience for browsing movies. The application fetches data from a movie API and displays it in an organized manner. Users can view details about different movies, including titles, descriptions, and images.

### Screenshots
<img width="1862" height="933" alt="image" src="https://github.com/user-attachments/assets/75e4de19-ee0f-4f3d-bc88-2bedcd9b7c9a" /> 

**Main page with featured movies.**

The homepage displays a curated selection of popular and recent movies, organized into sections such as Trending, Top Rated, and Upcoming. It offers an engaging UI with large visuals and smooth navigation for content discovery.


<img width="1847" height="933" alt="image" src="https://github.com/user-attachments/assets/3bec1108-a9fd-4b14-83b4-f96ad24f1394" />

**Section dedicated to TV series.**

This view lets users explore TV shows grouped by category. Each card includes the show's image, name, and rating — perfect for binge-watchers looking for something new.


<img width="1823" height="928" alt="image" src="https://github.com/user-attachments/assets/2c7f86f8-4e7c-4656-a837-fd8ad59207f7" />

**Login form to access personalized features.**

The authentication system allows users to sign in and unlock features like saving favorites, receiving personalized recommendations, and syncing their watch history across devices.


<img width="1767" height="934" alt="image" src="https://github.com/user-attachments/assets/e4504b97-c5bd-41fc-a89d-b07047bf321e" /> 

**User's custom saved list.**

This section enables users to save their favorite movies and shows into a personal list. It's ideal for planning what to watch next or keeping track of watched content.


## Linting

To check the code quality, you can run ESLint with the following command:

```bash
npm run lint
```

This will allow you to identify and fix issues in your code according to the rules defined in the ESLint configuration.

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/new-feature).
3. Make your changes and commit them (git commit -m 'Adding new feature').
4. Push your changes (git push origin feature/new-feature).
5. Create a Pull Request.

## License

This project does not specify a license, so the default copyright applies.

---

Thank you for visiting CinemaHub! If you have any questions or suggestions, feel free to open an issue. porque no se pone en negrita lo de la imagen el subtitulo?
