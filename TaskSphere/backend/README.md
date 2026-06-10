# TaskSphere Backend

This is the backend API for TaskSphere, built with Django REST Framework.

## Requirements
To run this project, you need to have Python 3 installed on your system.

## Setup Instructions

### 1. Create a Virtual Environment
A virtual environment keeps the dependencies for this project separate from your global Python installation.

Run the following command inside the `backend` folder:
* **Windows/Mac/Linux:**
  ```bash
  python -m venv venv
  ```

### 2. Activate the Virtual Environment
Before installing packages or running commands, you must activate the virtual environment.

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

### 3. Install Dependencies
Install Django and Django REST Framework by running:
```bash
pip install -r requirements.txt
```

### 4. Run Migrations
Run the initial migrations to set up the SQLite database:
```bash
python manage.py migrate
```

### 5. Start the Server
Start the Django development server:
```bash
python manage.py runserver
```
The server will start at `http://127.0.0.1:8000/`. You can visit it in your browser to see the default API root response.
