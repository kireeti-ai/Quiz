
# Quizora – AI-Assisted Online Quiz Platform

Quizora is a **full-stack, AI-augmented academic quiz platform** designed for modern classrooms and online evaluations.
It enables **faculty to create, control, and publish quizzes efficiently**, while allowing **students to securely access and attempt quizzes using a unique quiz code**.

The platform integrates **Large Language Models (LLMs)** with **Retrieval-Augmented Generation (RAG)** to generate **syllabus-aligned, academically grounded questions**, while preserving **full faculty control** over final quiz content.

---

## 1. Project Overview

Quizora addresses limitations in traditional quiz systems such as manual question creation, unsecured access, and lack of scalability.
Faculty can either:
- Automatically generate questions from a topic using AI (grounded via RAG)
- Manually create and edit questions with complete academic control

Once a quiz is published, a **unique quiz code** is generated. Students enter this code to access the quiz directly.

The system follows a strict **role-based architecture**:
- **Faculty:** Quiz creation, AI generation, publishing, analytics
- **Students:** Quiz access, attempts, results

---

## 2. Key Features

- Role-based access control (Faculty / Student)
- AI-assisted question generation using LLMs
- RAG-based syllabus-grounded question creation
- Manual question creation and editing
- Faculty review before publishing AI-generated questions
- Quiz access via unique faculty-generated codes
- Timed quizzes with automated evaluation
- Student score tracking and analytics dashboard
- RESTful and scalable backend architecture

---

## 3. Technology Stack

### Backend
- Java 17
- Spring Boot
- Maven
- PostgreSQL
- Spring Data JPA
- JWT-based Authentication

### Frontend
- React
- Axios
- React Router DOM
- Context API

---

## 4. Getting Started

### Prerequisites
- Java 17+
- Maven
- PostgreSQL
- Node.js (npm)

---

## 5. Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs on:
```
http://localhost:8081
```

---

## 6. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

---

## 7. Project Structure

```
Quizora/
├── frontend/
├── backend/
└── README.md
```


---

## 8. Author

**Kireeti**  
GitHub: https://github.com/kireeti-ai

---

## 9. Conclusion

Quizora represents a modern AI-augmented academic assessment platform combining automation, control, security, and scalability—ideal for both real-world deployment and B.Tech final-year evaluation.
