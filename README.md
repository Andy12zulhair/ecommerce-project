# MAROS TECH - SCIFI E-COMMERCE PLATFORM 🚀

**Maros Tech** is a modern, high-performance e-commerce application featuring a premium "Tech Dark" aesthetic. Built with a robust **Django** backend and a dynamic **React** frontend, it offers a seamless shopping experience with cyberpunk-inspired UI elements.

![Maros Tech Banner](https://placehold.co/1200x300/0a0a0a/00f3ff?text=MAROS+TECH+ECOMMERCE)

## ⚡ Tech Stack

### **Backend (API)**
*   **Framework**: Django 5.x & Django REST Framework (DRF)
*   **Authentication**: JWT (JSON Web Tokens) via `djangorestframework-simplejwt`
*   **Database**: SQLite (Dev) / PostgreSQL (Ready for Prod)
*   **Media**: Pillow for image processing

### **Frontend (Client)**
*   **Core**: React 18 + Vite
*   **Styling**: React Bootstrap + Custom CSS (Glassmorphism & Neon Effects)
*   **Routing**: React Router DOM v6
*   **State Management**: React Hooks (Context API for Cart)

---

## 🛠️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone Repository
```bash
git clone https://github.com/Andy12zulhair/ecommerce-project.git
cd ecommerce-project
```

### 2. Backend Setup (Django)
Open a terminal for the backend:

```bash
# Navigate to backend folder
cd backend_project

# Create Virtual Environment (Optional but Recommended)
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

# Install Dependencies
pip install -r requirements.txt

# Run Migrations
python manage.py migrate

# Create Superuser (Admin)
python manage.py createsuperuser

# Start Server
python manage.py runserver
```
*Backend runs on: `http://localhost:8000`*

### 3. Frontend Setup (React)
Open a **new terminal** for the frontend:

```bash
# Navigate to frontend folder
cd ecommerce-frontend

# Install Node Modules
npm install

# Start Development Server
npm run dev
```
*Frontend runs on: `http://localhost:5173`*

---

## 🌟 Key Features

### 🔐 Authentication & Security
*   **Secure Sign Up/Login**: JWT-based stateless authentication.
*   **Session Management**: Auto-refresh tokens and session expiry handling.
*   **Protected Routes**: Checkout and Account pages require login.

### 🛒 Shopping Experience
*   **Dynamic Shop Page**: Filter products by Category and Search by keywords.
*   **Server-Side Pagination**: Efficiently handles large product catalogs (12 items/page).
*   **Live Cart**: Add/Remove items with real-time total calculation.
*   **Product Details**: High-quality image rendering with "Cyberpunk" fallbacks.

### 📦 Order Management
*   **Checkout Flow**: Address input and order summary.
*   **Order History**: Users can view their past orders and status.

### 🎨 UI/UX Design
*   **Tech Dark Theme**: Deep black backgrounds with Cyan (`#00f3ff`) accents.
*   **Responsive**: Fully optimized for Desktop, Tablet, and Mobile.
*   **Interactive**: Hover effects, glassmorphism cards, and animated transitions.

---

## 📂 Project Structure

```
ecommerce-project/
├── backend_project/        # Django Project Root
│   ├── api/                # API App (Views, Models, Serializers)
│   ├── media/              # User Uploaded Images
│   └── manage.py
├── ecommerce-frontend/     # React Application
│   ├── src/
│   │   ├── components/     # Reusable UI Components
│   │   ├── pages/          # Main Page Views
│   │   └── services/       # API Integration (Axios)
│   └── vite.config.js
└── README.md
```

## 📝 License
This project is open-source and available under the MIT License.

---
*Built with ❤️ by Andy zulhair
