# 🚀 Employee Management System (EMS)

A modern, AI-powered full-stack Employee Management System built with the **MERN** (MongoDB, Express, React, Node.js) stack. It streamlines HR operations including attendance tracking, leave management, and payroll processing, wrapped in a highly premium, responsive UI.

## ✨ Key Features

* **🤖 AI HR Assistant:** A context-aware chatbot powered by OpenRouter API (GPT-4o-mini). It answers employee queries based on their personal real-time HR data and company policies.
* **🔐 Role-Based Access Control (RBAC):** Secure, isolated portals for **Administrators** and **Employees** using JWT authentication.
* **📊 Dashboard & Analytics:** Real-time metrics for admins (total employees, today's attendance, pending leaves) and personal summaries for employees.
* **⏱️ Attendance Tracking:** Automated check-in/check-out system with total working hours calculation and late/absent tracking.
* **🏖️ Leave Management:** Employees can apply for different types of leaves (Sick, Casual, Annual), and admins can approve or reject them dynamically.
* **💰 Payroll & Payslips:** Detailed monthly salary breakdowns including basic pay, allowances, and deductions, with the ability to generate and print payslips.
* **🏢 Dynamic Departments:** Admins can add, edit, or remove company departments dynamically from the dashboard.
* **💎 Premium UI:** Built with **Tailwind CSS**, featuring a modern dark-mode glassmorphism design, micro-animations, and a highly responsive layout.

## 🛠️ Tech Stack

* **Frontend:** React.js, Vite, Tailwind CSS, React Router, Lucide Icons, Axios.
* **Backend:** Node.js, Express.js, Mongoose.
* **Database:** MongoDB.
* **Authentication:** JSON Web Tokens (JWT) & bcrypt for password hashing.
* **AI Integration:** OpenRouter API.

## ⚙️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [Git](https://git-scm.com/) installed on your machine. You will also need a MongoDB URI and an OpenRouter API key.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/EMS.git
cd EMS
```

### 2. Setup Backend (Server)
```bash
cd server
npm install
```
Create a `.env` file inside the `server` directory and add the following:
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
OPENROUTER_API_KEY=your_openrouter_api_key
```
Start the backend server:
```bash
npm start
```

### 3. Setup Frontend (Client)
Open a new terminal and navigate to the client folder:
```bash
cd client
npm install
```
Create a `.env` file inside the `client` directory:
```env
VITE_BASE_URL=http://localhost:4000
```
Start the frontend development server:
```bash
npm run dev
```

### 4. Admin Setup (Database Seeding)
To create your first Admin account, run the seed script from the `server` folder:
```bash
# In the server folder:
node seed.js
```
*Make sure you provide an `ADMIN_EMAIL` inside your server `.env` before running this, or modify the script to hardcode the email.*

## 🚀 Deployment
This project is fully configured to be deployed on platforms like **Render**, **Vercel**, or **Heroku**.
* **Frontend:** Deploy as a Static Site (Build command: `npm run build`, Output dir: `dist`).
* **Backend:** Deploy as a Web Service (Start command: `node server.js`).

## 📄 License
This project is for educational and portfolio purposes.
