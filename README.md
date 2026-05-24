# Taskify - Full Stack MERN Application

A full-stack task management application built using the MERN stack (MongoDB, Express, React, Node.js) with TypeScript. It allows users to register, log in, and manage their tasks efficiently with a clean and modern user interface.

## 🔗 Live Preview

**[View the Live Application](https://taskify-full-stack-mern-project.vercel.app/login)**

## ✨ Features

- **User Authentication:** Secure registration and login using JWT (JSON Web Tokens) and bcrypt for password hashing.
- **Task Management:** Create, read, update (toggle completion), and delete tasks.
- **Private Routes:** Protected API endpoints and frontend routes ensuring users can only access their own tasks.
- **Modern UI:** Built with React, Vite, and styled using Tailwind CSS v4.
- **TypeScript:** Strongly typed code across both frontend and backend for better developer experience and reliability.
- **Responsive Design:** Works seamlessly across mobile, tablet, and desktop devices.

## 🛠️ Tech Stack

### Frontend
- **React 19**
- **Vite**
- **TypeScript**
- **Tailwind CSS v4**
- **Axios**
- **React Router DOM**

### Backend
- **Node.js**
- **Express**
- **MongoDB & Mongoose**
- **TypeScript**
- **JWT (JSON Web Tokens)**
- **bcryptjs**

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) installed and running (or a MongoDB Atlas URI)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd Task-Manager
   ```

2. **Setup Backend:**
   ```bash
   cd Backend
   npm install
   ```

3. **Setup Frontend:**
   ```bash
   cd ../Frontend
   npm install
   ```

### Environment Variables

Create a `.env` file in the `Backend` directory and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Running Locally

You will need to start both the backend and frontend servers.

**Terminal 1 (Backend):**
```bash
cd Backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd Frontend
npm run dev
```

The frontend will run on `http://localhost:5173` and the backend on `http://localhost:5000`.

## 📡 API Endpoints

### Auth Routes (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - Login and receive JWT token

### Task Routes (`/api/task`) - *Requires Auth Token*
- `GET /` - Get all tasks for the logged-in user
- `POST /` - Create a new task
- `PUT /:id` - Update a task (e.g., mark as completed)
- `DELETE /:id` - Delete a task

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is open-source.
