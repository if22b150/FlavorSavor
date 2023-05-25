# FlavorSavor

## Backend
### Setup
#### Datenbank
XAMPP MySQL starten \
Über Console/Shell eine neue DB anlegen:
```
mysql -u root -p
CREATE DATABASE flavorsavor;
```
#### Laravel Environment
Im "backend"-Ordner:
- .env.example kopieren und zu .env umbenennen, falls noch nicht vorhanden
- Bei DB_DATABASE "flavorsavor" eintragen (oder wie die DB oben eben genannt wurde)
- Evtl. die Credentials für MySQL bei DB_USERNAME (default "root") und DB_PASSWORD (normalerweise nichts) eintragen
- Bei MAIL_USERNAME die eigene FH Mail-Adresse eintragen und bei MAIL_PASSWORD das dazugehörige Passwort
#### Laravel aufsetzen
Im "backend"-Ordner eine Console/Terminal öffnen:

```
composer install
php artisan key:generate
php artisan migrate:fresh --seed
php artisan storage:link
```
#### Laravel-Backend starten
`php artisan serve`

Die Backend-Anwendung sollte nun [hier](http://127.0.0.1:8000/) aufrufbar sein.


## Frontend
### Setup
```
cd frontend
npm install
ng serve
```