@echo off
setlocal

:: Définir les variables de connexion
call .env.bat

:: Créer le tunnel SSH (en arrière-plan)
echo Création du tunnel SSH vers le serveur distant...
start /B ssh -L %LOCAL_PORT%:%URL%:5432 %SSH_USER%@%SSH_HOST% -p %REMOTE_PORT%


:: Vérifier si SSH a bien été lancé
if errorlevel 1 (
    echo Erreur : impossible de créer le tunnel SSH.
    exit /b 1
)

:: Attendre quelques secondes pour s'assurer que le tunnel est ouvert
timeout /t 35

:: Se connecter à la base de données PostgreSQL via le tunnel
echo Connexion à la base de données PostgreSQL via le tunnel SSH...
psql -h localhost -p %LOCAL_PORT% -U %DB_USER% -d %DB_NAME%

:: Fermer le tunnel SSH après la connexion à la base de données
echo Fermeture du tunnel SSH...
taskkill /F /IM ssh.exe

echo Connexion terminée.
endlocal
