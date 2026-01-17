# 🏫 Sistema de Gestión Escolar (Microservicios)

Sistema distribuido basado en **Microservicios** para la gestión académica. Implementa una arquitectura contenerizada con **Docker**, separando la lógica de alumnos y cursos en servicios independientes que comparten una base de datos **MongoDB**.

---

## 🚀 Tecnologías Utilizadas

* **Orquestación:** Docker & Docker Compose
* **Base de Datos:** MongoDB (v5.0)
* **Microservicio 1 (Alumnos):** Node.js + Express + Mongoose
* **Microservicio 2 (Cursos):** Python + Flask + PyMongo
* **Documentación API:** Swagger UI (OpenAPI 3.0)

---

## 📁 Nueva Estructura del Proyecto

```text
api-escolastico/
 ├── docker-compose.yml       # Orquestador de todos los servicios
 ├── node-api/                # Microservicio de Alumnos (Node.js)
 │    ├── src/
 │    ├── package.json
 │    └── Dockerfile
 └── python-api/              # Microservicio de Cursos (Python)
      ├── app.py
      ├── requirements.txt
      └── Dockerfile

      ⚡ Guía de Instalación y Ejecución
Como el proyecto está dockerizado, no necesitas instalar Node ni Python en tu máquina local. Solo requieres Docker Desktop.

1. Iniciar el sistema
Abre una terminal en la carpeta raíz del proyecto y ejecuta:

docker-compose up --build

Espera unos instantes hasta ver el mensaje "MongoDB Conectado" en la terminal.

2. Apagar el sistema
Para detener los servicios presiona Ctrl + C o ejecuta:

docker-compose down

🔗 Accesos y Documentación (Swagger)
El sistema incluye una interfaz gráfica interactiva (Swagger) para probar todos los endpoints sin necesidad de escribir código.

🎓 Microservicio de Alumnos (Node.js)
Gestión completa de estudiantes (Matrículas, Búsquedas).

URL Base: http://localhost:4000

Documentación Interactiva: 👉 http://localhost:4000/api-docs

Endpoints disponibles:

GET /api/alumnos - Listar todos los alumnos (con filtros).

POST /api/alumnos - Registrar un nuevo alumno.

GET /api/alumnos/{id} - Obtener detalle de un alumno.

PUT /api/alumnos/{id} - Actualizar datos de un alumno.

DELETE /api/alumnos/{id} - Eliminar un alumno.

🐍 Microservicio de Cursos (Python)
Gestión del catálogo académico.

URL Base: http://localhost:5000

Documentación Interactiva: 👉 http://localhost:5000/apidocs

Endpoints disponibles:

GET /api/cursos - Ver lista de cursos disponibles.

POST /api/cursos - Crear un nuevo curso.

PUT /api/cursos/{id} - Editar información de un curso.

DELETE /api/cursos/{id} - Eliminar un curso del sistema.

🔍 Ejemplos de Uso Manual (Opcional)
Si prefieres no usar Swagger, puedes probar la API directamente:

Ejemplo: Crear un Curso (Python)

POST http://localhost:5000/api/cursos
Content-Type: application/json

{
  "nombre": "Desarrollo Web Full Stack",
  "descripcion": "Curso intensivo con Docker y Microservicios",
  "creditos": 5
}

Ejemplo: Crear un Alumno (Node.js)

POST http://localhost:4000/api/alumnos
Content-Type: application/json

{
  "nombres": "Axel Ismael",
  "apellidos": "Angulo Hurtado",
  "email": "axel@example.com",
  "grado": "5to Semestre"
}