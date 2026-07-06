@echo off
setlocal

REM Activate the virtual environment.
call venv\Scripts\activate

REM Navigate to your Django project directory.
cd tkdacceditationsrv

REM Start the Django development server in the background.
start /B py manage.py runserver 8888

REM Wait for a moment to ensure the server starts (adjust the delay if needed).
timeout /t 5 /nobreak

start http://localhost:8888

REM Deactivate the virtual environment when you're done.
call venv\Scripts\deactivate

endlocal
