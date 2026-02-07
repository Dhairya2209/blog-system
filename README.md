# 📝 Blog / Article System 

A simple Blog / Article platform built using **Node.js, Express, MongoDB**, with a **basic React frontend** 

---

## 🚀 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

### Frontend

* React (Vite)
* Axios

### Deployment

* Backend: Render
* Frontend: Vercel

---

## 📂 Project Structure

```
Blog-system/
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── BlogList.jsx
│   │   ├── api.js
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## ✨ Features

### Authentication

* User registration & login
* JWT-based authentication

### User Roles

* **Writer** – Create, update, delete own blog posts
* **Reader** – View published blogs only
* **Admin** – Manage all posts and comments

### Blog Posts

* Fields: title, content, tags, status (draft / published)
* Writers can modify only their own posts
* Pagination & search (title, content, tags)

### Comments

* Authenticated users can comment on published posts
* Users can delete only their own comments

### Frontend

* Displays published blog posts
* Search bar
* Pagination
* Simple UI to prove backend APIs are working

---

## ⚙️ Backend Setup

### 1️⃣ Navigate to backend

```bash
cd backend
npm install
```

### 2️⃣ Create `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 3️⃣ Run backend

```bash
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

---

## 🎨 Frontend Setup

### 1️⃣ Navigate to frontend

```bash
cd frontend
npm install
```

### 2️⃣ Run frontend

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```
---

## 🔑 API Testing (Postman)

### Authorization:

```
Authorization: Bearer <JWT_TOKEN>
```

### Sample Endpoints

* `POST /api/auth/register`
* `POST /api/auth/login`
* `GET /api/posts`
* `POST /api/posts` (Writer/Admin)
* `PUT /api/posts/:id` (Writer – own posts)
* `DELETE /api/posts/:id`
* `POST /api/comments/:postId`
* `DELETE /api/comments/:id`

---

## 🌍 Deployment Notes

### Backend (Render)

* Add environment variables in Render dashboard
* Allow MongoDB Atlas IP: `0.0.0.0/0`

### Frontend (Vercel)

* Set backend API URL if required
* Redeploy after env changes

---

