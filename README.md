# AI_FitTracker
# 🏋️ AI_FitTracker

<div align="center">

### Accelerate Your Fitness Journey with AI-Powered Insights

Track workouts, monitor progress, analyze performance, and get personalized fitness recommendations powered by Gemini AI.

![React](https://img.shields.io/badge/React-Frontend-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express.js-API-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![Google OAuth](https://img.shields.io/badge/Google-OAuth2-red)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-purple)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black)
![Render](https://img.shields.io/badge/Render-Backend-blue)

</div>

---

# 📖 Overview

**AI_FitTracker** is a modern full-stack fitness analytics platform designed to help users monitor, manage, and improve their fitness journey.

Users can log various fitness activities such as:

- 🏃 Running
- 🏊 Swimming
- 🔥 HIIT Workouts
- 🚴 Cycling
- 🏋️ Strength Training
- And more...

The platform automatically tracks workout duration, calories burned, weekly activity statistics, and fitness goals while providing **AI-powered fitness and nutrition recommendations** using **Google Gemini AI**.

---

# ✨ Features

## 👤 User Authentication

- Secure JWT Authentication
- Google OAuth 2.0 Login
- Protected Routes
- Session Management

---

## 🏃 Activity Tracking

Users can log:

- Activity Type
- Workout Duration
- Calories Burned
- Workout Date

Supported activities include:

- Running
- Swimming
- HIIT
- Cycling
- Walking
- Gym Workouts
- Custom Activities

---

## 📊 Fitness Analytics Dashboard

Comprehensive dashboard displaying:

- Total Workouts
- Total Duration
- Total Calories Burned
- Weekly Activity Summary
- Fitness Progress Metrics

---

## 🎯 Weekly Goal Tracking

Users can:

- Set Weekly Fitness Goals
- Monitor Goal Completion
- Track Progress Visually
- Stay Consistent with Workout Plans

---

## 📈 Interactive Weekly Analytics

Visual insights through charts and graphs:

- Weekly Workout Trends
- Calories Burned Analysis
- Duration Tracking
- Performance Monitoring

---

## 🤖 AI-Powered Fitness Insights

Integrated with **Google Gemini AI** to provide:

### Personalized Workout Suggestions

- Activity Recommendations
- Weekly Planning Assistance
- Fitness Improvement Strategies

### Nutrition Guidance

- Healthy Eating Suggestions
- Diet Recommendations
- Calorie Management Tips

### Performance Insights

- Activity Analysis
- Fitness Improvement Recommendations
- Consistency Tracking Suggestions

---

# 🏗️ System Architecture

```text
┌─────────────────────┐
│     React Client    │
│    + Tailwind CSS   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Express API       │
│     Node.js         │
└──────────┬──────────┘
           │
 ┌─────────┴─────────┐
 │                   │
 ▼                   ▼
MongoDB Atlas     Gemini AI
(Database)       (Insights)
```

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Tailwind CSS
- React Router
- Axios

## Backend

- Node.js
- Express.js

## Database

- MongoDB Atlas
- Mongoose ODM

## Authentication

- JWT Authentication
- Google OAuth 2.0

## AI Integration

- Google Gemini API

## Deployment

### Frontend

- Vercel

### Backend

- Render

### Database

- MongoDB Atlas

---

<!-- # 📸 Screenshots

> Add your screenshots here

## Dashboard

```md
![Dashboard](./screenshots/dashboard.png)
```

## Activity Tracking

```md
![Activity Tracking](./screenshots/activity.png)
```

## AI Insights

```md
![AI Insights](./screenshots/ai-insights.png)
``` -->

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/AI_FitTracker.git

cd AI_FitTracker
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

GEMINI_API_KEY=your_gemini_api_key
```

---

# 📡 API Modules

### Authentication

- Register User
- Login User
- Google OAuth Login
- JWT Verification

### Activity Management

- Create Activity
- Update Activity
- Delete Activity
- Fetch Activities

### Analytics

- Weekly Summary
- Calories Tracking
- Workout Duration Analysis
- Goal Tracking

### AI Insights

- Fitness Recommendations
- Nutrition Guidance
- Workout Planning

---

# 🎯 Future Enhancements

- 📱 Mobile Application
- 🧠 Advanced AI Fitness Coach
- 📷 Exercise Form Detection using Computer Vision
- ⌚ Smartwatch Integration
- 🥗 Personalized Meal Planner
- 🏆 Achievement & Reward System
- 👥 Community Challenges
- 📈 Advanced Health Analytics

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing
- Protected API Routes
- OAuth 2.0 Authentication
- Secure Environment Variables
- Input Validation

---

# 🌟 Why AI_FitTracker?

Unlike traditional fitness trackers, AI_FitTracker combines:

✅ Fitness Tracking  
✅ Progress Analytics  
✅ Goal Management  
✅ AI-Powered Recommendations  
✅ Nutrition Guidance  

into a single intelligent platform that helps users make data-driven decisions about their health and fitness.

---

# 👨‍💻 Developer

**Ashutosh Kumar**

Computer Science Student | Full Stack Developer | AI Enthusiast

Passionate about building intelligent applications that solve real-world problems through modern web technologies and artificial intelligence.

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# ⭐ Support

If you found this project useful:

⭐ Star the repository

🍴 Fork the repository

📢 Share it with others

---

# 📄 License

This project is licensed under the MIT License.

---

<div align="center">

### Built with ❤️ using React, Node.js, MongoDB and Gemini AI

**Transforming fitness tracking into an intelligent experience.**

</div>
