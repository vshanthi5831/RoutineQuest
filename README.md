RoutineQuest is a productivity-focused web application that helps users build daily habits, track progress, and maintain consistency through visual streaks. Built using the **MERN stack** (MongoDB, Express, React, Node.js).

## Features

- Daily routine/streak tracker
- Visual indicators for habit consistency
- Mental focus and discipline support
- JWT-based authentication
- Separate folders for client (frontend) and server (backend)
- MongoDB database integration
- RESTful API support


## Tech Stack                          
- Frontend - React.js, HTML, CSS, JS
- Backend - Node.js, Express.js
- Database - MongoDB (Mongoose)
- Auth - JWT
- Versioning - Git + GitHub  



## Setup Instructions

1. Clone the Repository - 
git clone https://github.com/vshanthi5831/RoutineQuest.git
cd RoutineQuest

2. Install Dependencies - 
cd client
npm install

cd ../server
npm install

3. Environment Variables - 
Create .env in server/:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4. Run the Application
- In one terminal tab (frontend)
  cd client
  npm start
- In another tab (backend)
  cd server
  npm start


## Authentication

* Register and login endpoints
* JWT token stored in HTTP-only cookie or local storage
* Middleware protects routes for authenticated users only


## To Do

- Improve UI responsiveness
- Mobile support

---

Pull requests are welcome. For major changes, please open an issue first to discuss.

## 📬 Contact

**Shanthi V** – [GitHub](https://github.com/vshanthi5831)


