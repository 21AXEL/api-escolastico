# API Escolástica 📚

API REST construida con **Node.js, Express y MongoDB** para la gestión de alumnos de una institución educativa.

Permite realizar operaciones **CRUD completas**, además de **búsqueda y filtros avanzados** sobre los alumnos.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- Docker (para levantar MongoDB en local)
- Nodemon (desarrollo)

---

## 📁 Estructura del proyecto

```text
api-escolastico/
  ├─ src/
  │  ├─ config/
  │  │  └─ db.js
  │  ├─ controllers/
  │  │  └─ alumno.controller.js
  │  ├─ models/
  │  │  └─ Alumno.js
  │  ├─ routes/
  │  │  └─ alumno.routes.js
  │  ├─ app.js
  │  └─ server.js
  ├─ .env
  ├─ .gitignore
  ├─ package.json
  └─ package-lock.json

Endpoint de prueba:
GET /
→ { "message": "API Escolástica funcionando 🚀" }

Cómo probar la API con Postman / Thunder Client
1. Crear un alumno (CREATE – POST)

Método: POST

URL: http://localhost:4000/api/alumnos

Body → raw → JSON:
{
  "nombres": "Axel Ismael",
  "apellidos": "Angulo Hurtado",
  "email": "axel@example.com",
  "grado": "3er año",
  "seccion": "A",
  "promedio": 17,
  "estado": "activo"
}
  Respuesta esperada (201 Created):
  {
  "message": "Alumno creado correctamente",
  "data": {
    "_id": "....",
    "nombres": "Axel Ismael",
    "apellidos": "Angulo Hurtado",
    "email": "axel@example.com",
    "grado": "3er año",
    "seccion": "A",
    "promedio": 17,
    "estado": "activo",
    "createdAt": "....",
    "updatedAt": "....",
    "__v": 0
  }
}

2. Listar alumnos (READ – GET)

Método: GET

URL: http://localhost:4000/api/alumnos

Respuesta (ejemplo):

{
  "data": [
    {
      "_id": "....",
      "nombres": "Axel Ismael",
      "apellidos": "Angulo Hurtado",
      "email": "axel@example.com",
      "grado": "3er año",
      "seccion": "A",
      "promedio": 17,
      "estado": "activo",
      "createdAt": "....",
      "updatedAt": "....",
      "__v": 0
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}

3. Obtener un alumno por ID (READ – GET)

Primero copia el _id de un alumno creado.

Método: GET

URL: http://localhost:4000/api/alumnos/:id

Ejemplo:

http://localhost:4000/api/alumnos/6789abc1234567890abcd123

4. Actualizar un alumno (UPDATE – PUT)

Método: PUT

URL: http://localhost:4000/api/alumnos/:id

Body → raw → JSON:

{
  "promedio": 19,
  "estado": "egresado"
}


Respuesta:

{
  "message": "Alumno actualizado correctamente",
  "data": {
    "_id": "....",
    "nombres": "Axel Ismael",
    "apellidos": "Angulo Hurtado",
    "email": "axel@example.com",
    "grado": "3er año",
    "seccion": "A",
    "promedio": 19,
    "estado": "egresado",
    "createdAt": "....",
    "updatedAt": "....",
    "__v": 0
  }
}

5. Eliminar un alumno (DELETE – DELETE)

Método: DELETE

URL: http://localhost:4000/api/alumnos/:id

Ejemplo:

http://localhost:4000/api/alumnos/6789abc1234567890abcd123


Respuesta:

{
  "message": "Alumno eliminado correctamente"
}

🔍 Búsqueda y filtros avanzados

Todo se hace desde el mismo endpoint:

GET /api/alumnos