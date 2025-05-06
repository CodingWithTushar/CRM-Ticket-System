If Signup will not Work Log In Credentails are :-
Tushar7531@gmail.com
Tushar7531

🛠️ Resolve360 – MERN Stack Support Ticket System
Welcome to Resolve360, a full-stack MERN application built as a learning project to explore core web development concepts including authentication, RESTful APIs, state management, and real-world CRUD operations.

🚀 Check out the live project here: https://resolve360.onrender.com

With Resolve360, users can:

✅ Sign up and log in (with secure JWT authentication via cookies)

🎫 Create support tickets for issues

📬 Receive email notifications for created tickets (sent to the user and support team)

📝 Respond to tickets as the support team

🔄 Update ticket status/details

❌ Delete tickets

🧱 Tech Stack
Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT (stored in cookies)

Email: Gmailjs (for ticket notifications)

🚀 Features
🔐 Secure authentication with JWT (stored in HTTP-only cookies)

🧾 Full ticket management (Create, View, Update, Delete)

📤 Automatic email notifications on ticket creation

👨‍💻 Simulated support team replies to tickets

🖥️ clean UI built with React

📁 Folder Structure (Simplified)
bash
Copy
Edit
resolve360/
├── client/              # React frontend
│   ├── src/
│   └── public/
├── server/              # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
├── .env
├── package.json
└── README.md
🛠️ Getting Started Locally
Prerequisites
Node.js & npm

MongoDB instance (local or cloud)

Gmail account for sending emails

Installation
bash
Copy
Edit
# Clone the repo
git clone (https://github.com/CodingWithTushar/CRM-Ticket-System)

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
Running the App
Backend (Express Server)
bash
Copy
Edit
cd server
npm start
Frontend (React App)
bash
Copy
Edit
cd client
npm start
Environment Variables
Create a .env file in the server/ directory and configure the following:

env
Copy
Edit
PORT=3001
MONGO_URI=mongodb+srv://Tushar7531:Tushar7531@cluster0.kjqfb.mongodb.net/CRM-Ticket-System
JWT_SECRET=App_Used

✨ Future Improvements
Role-based access control (Admin vs. User)

Pagination for ticket lists

File attachments with tickets

Email templates with rich HTML

🙋‍♂️ Why I Built This
This project was created to consolidate my learning of the MERN stack and to build something functional from scratch using real-world tools and workflows. It showcases full CRUD, secure authentication, and integration with third-party services like email – all in one app!

📬 Contact
Feel free to reach out for suggestions or collaborations!

📧 Email: tushard3998@gmail.com

📄 License
This project is open-source and available under the MIT License.

Let me know if you want me to help you generate a badge section, add screenshots, or create a short video demo section too!
