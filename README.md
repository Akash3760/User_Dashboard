# User-dashboard

[![Python](https://img.shields.io/badge/Python-3.9+-blue)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-4.2.25-green)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Full-stack dashboard project with **Django backend** and **React + Vite + TailwindCSS frontend**. Uses **MySQL** database.


## Project Structure
Billing Dashboard Project/
├─ BACKEND/
│ ├─ dashboard/
│ ├─ venv/
│ ├─ manage.py
│ └─ requirements.txt
├─ FRONTEND/
│ └─ dashboard_ui/
├─ .gitignore
└─ .env


## Quick Start

### Backend
cd BACKEND
.\venv\Scripts\activate      # Windows
### OR
source venv/bin/activate     # Mac/Linux
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


### Frontend
cd FRONTEND/dashboard_ui
npm install
npm run dev


### Environment Variables (.env)
SECRET_KEY=<your_django_secret_key>
DEBUG=True

DB_NAME=<your_db_name>
DB_USER=root
DB_PASSWORD=<your_db_password>
DB_HOST=localhost
DB_PORT=3306


## License

This project is licensed under the MIT License. See LICENSE
 for details.


## Author

Akash
