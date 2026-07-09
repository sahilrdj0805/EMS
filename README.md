# Employee Management System

A full-stack web application for managing employees, attendance, leaves, and payroll built with the MERN stack.

## 🚀 Features

### Admin Features
- **Employee Management**: Add, edit, and manage employee records
- **Attendance Tracking**: View and monitor daily attendance of all employees
- **Leave Management**: Approve or reject employee leave applications
- **Payroll System**: Generate monthly payslips with salary calculations
- **Dashboard Analytics**: View total employees, departments, attendance stats, and pending leaves

### Employee Features
- **Attendance Marking**: Check-in and check-out with automatic working hours calculation
- **Leave Application**: Apply for sick, casual, or annual leave
- **Payslip Access**: View and download monthly salary slips
- **Profile Management**: Update personal information and change password
- **Dashboard**: View attendance summary, pending leaves, and latest payslip

### Automated Features
- **Auto Check-out**: Automatic check-out after 10 hours with email reminder at 9 hours
- **Leave Reminders**: Email notification to admin if leave pending for 24+ hours
- **Daily Attendance Cron**: Automated email to absent employees at 11:30 AM IST

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **date-fns** - Date formatting
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Nodemailer** - Email service
- **Inngest** - Background jobs & cron scheduling
- **Multer** - File uploads

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/employee-management-system.git
cd employee-management-system
```

### Backend Setup
```bash
cd server
npm install
```

Create `.env` file in server folder:
```env
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@example.com
MONGODB_URI=your_mongodb_connection_string
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SENDER_EMAIL=your_sender_email
```

Seed admin user:
```bash
npm run seed
```

Start server:
```bash
npm run dev
```
Server runs on `http://localhost:4000`

### Frontend Setup
```bash
cd client
npm install
```

Create `.env` file in client folder:
```env
VITE_BASE_URL=http://localhost:4000
```

Start frontend:
```bash
npm run dev
```
Frontend runs on `http://localhost:5173`

## 🔐 Default Credentials

**Admin Login:**
- Email: (as set in server/.env ADMIN_EMAIL)
- Password: `admin123`

**Note:** Change password after first login

## 📁 Project Structure

```
employee-management-system/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── api/           # API configuration
│   │   ├── components/    # React components
│   │   ├── context/       # Context API
│   │   ├── pages/         # Page components
│   │   └── App.jsx
│   └── package.json
│
├── server/                # Backend Node.js app
│   ├── config/           # Database & email config
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Auth middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── inngest/          # Background jobs
│   ├── server.js         # Entry point
│   └── package.json
│
└── README.md
```

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/session` - Get current user
- `POST /api/auth/change-password` - Change password

### Employees (Admin only)
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Attendance
- `POST /api/attendance` - Check-in/Check-out
- `GET /api/attendance` - Get attendance history

### Leaves
- `POST /api/leave` - Apply leave
- `GET /api/leave` - Get leaves
- `PUT /api/leave/:id` - Approve/Reject leave (Admin)

### Payslips
- `POST /api/payslips` - Generate payslip (Admin)
- `GET /api/payslips` - Get payslips
- `GET /api/payslips/:id` - Get single payslip

### Dashboard
- `GET /api/dashboard` - Get dashboard stats

## 🎯 Key Features Explained

### Attendance System
- Employees check-in at start of day
- Late detection: After 9:00 AM marked as "LATE"
- Working hours automatically calculated on check-out
- Day type classification:
  - Full Day: ≥8 hours
  - Three Quarter Day: 6-8 hours
  - Half Day: 4-6 hours
  - Short Day: <4 hours

### Leave Management
- Three types: Sick, Casual, Annual
- Future date validation
- Admin approval workflow
- Status tracking: Pending → Approved/Rejected

### Payroll System
- Monthly payslip generation
- Salary calculation: Basic + Allowances - Deductions
- Downloadable PDF format
- Historical payslip access

## 🤖 Background Jobs

### Auto Check-out Job
- Triggers on employee check-in
- Sends reminder email after 9 hours
- Auto check-out after 10 hours (marks as Half Day)

### Leave Reminder Job
- Triggers on leave application
- Sends reminder to admin after 24 hours if still pending

### Daily Attendance Cron
- Runs daily at 11:30 AM IST
- Identifies absent employees (not on leave, not checked-in)
- Sends reminder emails

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token authentication (7-day expiry)
- Role-based access control (Admin/Employee)
- Protected API routes
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## 🚀 Future Enhancements

- [ ] Performance review module
- [ ] Task management system
- [ ] Document management
- [ ] Analytics dashboard with charts
- [ ] Mobile app (React Native)
- [ ] Biometric attendance
- [ ] Multi-language support
- [ ] Export reports (PDF/Excel)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Your Name**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)

## 🙏 Acknowledgments

- MERN Stack Community
- Inngest for background job processing
- MongoDB Atlas for database hosting

---

⭐ If you found this project helpful, please give it a star!
