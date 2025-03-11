# Task Management App

## Overview
A task management platform for organizing personal and team tasks with features for task creation, assignment, and progress tracking.

## Features
- **Authentication**: Secure JWT-based login and registration.
- **Task Management**: Create, edit, assign, and delete tasks with properties like priority, categories, and due dates.
- **Status Tracking**: Tasks can be moved across backlog, to-do, in-progress, and done.
- **Due Date Indicators**: Overdue tasks are marked red; completed tasks turn green.
- **Task Sharing**: Share read-only links for public access.
- **Analytics**: Visual data insights for task progress.
- **Notifications**: Toast messages for key actions and alerts.
- **User Settings**: Update name, email, and password with logout enforced after changes.

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
## Installation Instructions

### Step 1: Clone the Repository
```bash
git clone <repo_link>
cd <repo_name>
```

### Step 2: Install Dependencies
For Server:
```bash
cd server
npm install
```

For Client:
```bash
cd client
npm install
```

### Step 3: Environment Variables

#### Server `.env` Sample
```
PORT=8000
MONGO_URI=<your_mongodb_connection_string>
TOKEN_SECRET_KEY=<your_jwt_secret>
```

#### Client `.env.local` Sample
```
VITE_BASE_URL=<your_backend_url>
```

### Step 4: Run Locally
For the client:
```bash
cd client
npm start
```

For the server:
```bash
cd server
node index.js
```

---

## Project UI

### Auth Page
![Auth Page](https://res.cloudinary.com/dv4re7bf8/image/upload/v1741669964/Form_mgunbg.png)

### Dashboard Page
![Dashboard Page](https://res.cloudinary.com/dv4re7bf8/image/upload/v1741669975/Dashboard_4_duglhe.png)

### Colaboration
![Colaboration](https://res.cloudinary.com/dv4re7bf8/image/upload/v1741669975/Dashboard_3_j7ozvs.png)

### Task Creation
![Task Creation](https://res.cloudinary.com/dv4re7bf8/image/upload/v1741670059/Dashboard_5_wv0mlq.png)

### Analytics
![Analytics](https://res.cloudinary.com/dv4re7bf8/image/upload/v1741670059/Dashboard_2_ywsruw.png)



### View Task (Public Url)
![View Task](https://res.cloudinary.com/dv4re7bf8/image/upload/v1741669975/Dashboard_6_mu5rov.png)


### Settings
![Settings](https://res.cloudinary.com/dv4re7bf8/image/upload/v1741670443/Dashboard_7_rmjbsw.png)
