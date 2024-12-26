@echo off
setlocal

:: Définir les variables de connexion
set "SSH_USER=adminpolytech"
set "SSH_HOST=212.147.119.3"
set "LOCAL_HOST=127.0.0.1"
set "LOCAL_PORT=5433"
set "REMOTE_PORT=23022"
set "DB_USER=adminpolytech"
set "DB_NAME=rh_db"
set "PGPASSWORD=sae&GEP3@J8z&Fh"

:: Créer le tunnel SSH (en arrière-plan)
echo Création du tunnel SSH vers le serveur distant...
start /B ssh -L %LOCAL_PORT%:%URL%:5432 %SSH_USER%@%SSH_HOST% -p %REMOTE_PORT%

:: Vérifier si SSH a bien été lancé
if errorlevel 1 (
    echo Erreur : impossible de créer le tunnel SSH.
    exit /b 1
)

:: Attendre quelques secondes pour s'assurer que le tunnel est ouvert
timeout /t 2

:: Se connecter à la base de données PostgreSQL via le tunnel
echo Create tables
psql -U %DB_USER% -d %DB_NAME% -h %LOCAL_HOST% -p %LOCAL_PORT% -f ".\config\createTables.sql"

echo Insert data
psql -U %DB_USER% -d %DB_NAME% -h %LOCAL_HOST% -p %LOCAL_PORT% -f ".\config\remplissage.sql"

echo Connexion à la base de données 
psql -U %DB_USER% -d %DB_NAME% -h %LOCAL_HOST% -p %LOCAL_PORT%

echo Connexion réussie.



endlocal
