AdoptMe Backend API
Proyecto backend para la plataforma AdoptMe, desarrollado en Node.js con conexión a MongoDB Atlas y empaquetado en Docker.

🚀 Imagen Docker
La imagen del proyecto está disponible públicamente en DockerHub:

👉 https://hub.docker.com/r/cooper80/backend3-adoptme-cooper80

🧱 Cómo construir la imagen

docker build -t adoptme-app .
▶️ Cómo ejecutar el contenedor

docker run -p 8080:8080 --env-file .env adoptme-app
📌 Asegurate de tener un archivo .env con las siguientes variables:

env
PORT=8080
DB_URI=mongodb+srv://estudiocarorosas_db_user:cooper80@adoptme.mfeciti.mongodb.net/?retryWrites=true&w=majority&appName=adoptme
JWT_SECRET=changeme
🧪 Tests funcionales
El proyecto incluye tests funcionales para todos los endpoints del router adoption.router.js, cubriendo:

✅ Casos de éxito

❌ Casos de error

🔁 Comportamiento esperado en cada ruta

Para ejecutarlos:
npm test
📂 Estructura del proyecto
Código
src/

├── app.js
├── routes/
│   └── adoption.router.js
├── controllers/
├── models/
tests/
├── adoption.test.js
.env
Dockerfile
README.md
🛠️ Tecnologías utilizadas
Node.js

Express

MongoDB Atlas

Docker

Mocha-Chai/ Supertest (para testing)

Dotenv

Autor Carolina  Rosas (cooper80)