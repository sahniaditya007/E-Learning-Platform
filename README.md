# E-Learning Platform
## Overview
The E-Learning Platform is a comprehensive web application designed to provide high-quality online courses. It includes both a frontend and a backend, allowing users to register, log in, enroll in courses, and track their progress. Administrators can manage courses, lectures, and users.
## Features
### User Features
- User registration and login
- Email verification with OTP
- Password reset functionality
- Browse and enroll in courses
- View course details and lectures
- Track course progress
### Admin Features
- Create, update, and delete courses
- Add and manage lectures for courses
- View platform statistics (total courses, lectures, users)
- Manage user roles (admin/user)
## Technologies Used
### Frontend
- React
- Vite
- React Router
- Axios
- React Hot Toast
- React Icons
- CSS Modules
### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- Bcrypt
- Nodemailer
- Multer
- Razorpay

## Setup Instructions
### Prerequisites
- Node.js
- MongoDB
- NPM or Yarn
### Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd elearning-server-master

2. Install dependencies:
    ```sh
    npm install

3. Create a .env file and add the following environment variables:
   ```sh
   DB=<your_mongodb_connection_string>
   Jwt_Sec=<your_jwt_secret>
   Activation_Secret=<your_activation_secret>
   Forgot_Secret=<your_forgot_secret>
   Gmail=<your_gmail_address>
   Password=<your_gmail_password>
   Razorpay_key=<your_razorpay_key>
   Razorpay_Secret=<your_razorpay_secret>
   frontendurl=<your_frontend_url>
   PORT=5000
   ```

4. Start the backend server:
    ```sh
    npm start

### Frontend Setup
1. Navigate to the frontend directory:
    ```sh
    cd elearning-frontend-master

2. Install dependencies:
    ```sh
    npm install

3. Start the frontend development server:
    ```sh
    npm run dev

### Usage
1. Open your browser and navigate to the frontend URL (usually http://localhost:3000).
2. Register a new user or log in with an existing account.
3. Browse available courses, enroll in a course, and start learning.
4. Admin users can access the admin dashboard to manage courses and users.

### Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.