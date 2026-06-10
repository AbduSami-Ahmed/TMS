# TaskSphere

TaskSphere is a simple task management web application. It has a React frontend and a Django REST Framework backend.

## Tech Stack
* **Backend:** Django REST Framework (Python)
* **Frontend:** React.js (Vite, JavaScript)
* **Database:** SQLite (Default Django database)

## Project Structure
```
TaskSphere/
├── backend/                  # Django backend folder
│   ├── backend/              # Django configuration files
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   ├── manage.py
│   └── requirements.txt      # Backend dependencies
├── frontend/                 # React frontend folder
│   ├── src/                  # React source files (App.jsx, main.jsx, etc.)
│   ├── index.html
│   ├── package.json          # Frontend dependencies
│   └── vite.config.js
├── docs/                     # Documentation folder
└── README.md                 # Project README file
```

## Setup Instructions

### Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   * **On Windows (PowerShell):**
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   * **On Windows (Command Prompt):**
     ```cmd
     venv\Scripts\activate.bat
     ```
   * **On macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```
4. Install the backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Run the migrations:
   ```bash
   python manage.py migrate
   ```
6. Start the development server:
   ```bash
   python manage.py runserver
   ```
   The backend will run on `http://127.0.0.1:8000/`.

### Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install the node modules:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173/`.
