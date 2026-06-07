🤖 **Smart Expense Tracker with Gemini AI**

An AI-powered full-stack expense management application built using the MERN Stack that helps users track, organize, and analyze their expenses effortlessly.

Unlike traditional expense trackers, this application allows users to upload receipt images and automatically extracts expense details using OCR and Google Gemini AI, eliminating the need for manual data entry.

---

## 🚀 Live Demo

Frontend: https://expense-tracker-frontend-qz53.onrender.com

Backend: https://expense-tracker-75q8.onrender.com

---

## ✨ Features

### 🔐 Authentication & Security

* User Registration & Login
* JWT-Based Authentication
* Protected Routes
* Secure Password Handling

### 💸 Expense Management

* Add Expenses Manually
* Delete Expenses
* View Expense History
* Dashboard-Based Expense Tracking

### 💰 Income Management

* Add Income Records
* View Income History
* Track Financial Flow

### 🤖 AI Receipt Scanner

Upload a receipt image and let the application automatically:

* Extract text from receipts using OCR
* Detect expense amount
* Detect purchase date
* Identify expense category
* Create expense records automatically

### 🧠 Google Gemini AI Integration

The application leverages Google's Gemini API to intelligently analyze extracted receipt text and generate structured expense data.

Gemini automatically extracts:

* Amount
* Category
* Date

from unstructured receipt content.

### 🖼️ Image Processing Pipeline

Before OCR execution, uploaded receipts are enhanced using Sharp:

* Resize
* Grayscale Conversion
* Image Normalization
* Sharpening
* Threshold Processing

This significantly improves OCR accuracy.

### 📊 Dashboard Analytics

* Total Income Overview
* Total Expense Overview
* Financial Summary
* Transaction Monitoring

### 📁 Excel Export

Users can download expense records in Excel format for reporting and analysis.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Axios
* React Router DOM
* CSS

### Backend

* Node.js
* Express.js
* JWT Authentication
* Multer
* Tesseract.js
* Sharp
* XLSX

### AI & OCR

* Google Gemini 2.5 Flash API
* Tesseract OCR

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Render

---

## ⚡ AI Workflow

1. User uploads receipt image.
2. Sharp preprocesses the image.
3. Tesseract OCR extracts text.
4. Extracted text is sent to Gemini AI.
5. Gemini returns structured JSON:

   * Amount
   * Category
   * Date
6. Expense is automatically saved to MongoDB.
7. User can review and manage the generated expense.

---

## 📂 Project Structure

Expense-Tracker

├── frontend

├── backend

│ ├── config

│ ├── controllers

│ ├── middleware

│ ├── models

│ ├── routes

│ ├── uploads

│ └── server.js

└── README.md

---

## 🎯 Key Learnings

Through this project I gained hands-on experience in:

* Full Stack MERN Development
* JWT Authentication
* MongoDB Database Management
* OCR Systems
* Image Processing
* AI Integration with Gemini
* File Upload Management
* Cloud Deployment using Render
* Frontend-Backend Integration

---

## 👩‍💻 Author

Kajal Pal

B.Tech – Electronics & Communication Engineering

Interests:

* Full Stack Development
* Data Structures & Algorithms
* Generative AI
