from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
from bson import ObjectId
import os

app = FastAPI(
    title="API de Cursos (Microservicio Python)",
    description="Gestiona el catálogo de cursos usando FastAPI y MongoDB",
    version="1.0.0"
)

# --- Configuración de MongoDB ---
MONGO_URI = os.getenv("MONGO_URI", "mongodb://mongodb:27017/escolastico_db")
client = MongoClient(MONGO_URI)
db = client.get_database()
cursos_collection = db.cursos

# --- Modelos de Datos (Pydantic) ---
class Curso(BaseModel):
    nombre: str
    descripcion: str
    creditos: int

# --- Helper para convertir ObjectId a String ---
def curso_helper(curso) -> dict:
    return {
        "id": str(curso["_id"]),
        "nombre": curso["nombre"],
        "descripcion": curso["descripcion"],
        "creditos": curso["creditos"]
    }

# --- Rutas (Endpoints) ---

@app.get("/", tags=["General"])
def read_root():
    return {"message": "Microservicio de Cursos (FastAPI) funcionando "}

@app.get("/api/cursos", tags=["Cursos"])
def listar_cursos():
    cursos = []
    for curso in cursos_collection.find():
        cursos.append(curso_helper(curso))
    return {"data": cursos}

@app.post("/api/cursos", tags=["Cursos"], status_code=201)
def crear_curso(curso: Curso):
    nuevo_curso = curso.dict()
    resultado = cursos_collection.insert_one(nuevo_curso)
    creado = cursos_collection.find_one({"_id": resultado.inserted_id})
    return {"message": "Curso creado", "data": curso_helper(creado)}

@app.put("/api/cursos/{id}", tags=["Cursos"])
def actualizar_curso(id: str, curso: Curso):
    try:
        oid = ObjectId(id)
        resultado = cursos_collection.update_one(
            {"_id": oid}, 
            {"$set": curso.dict()}
        )
        if resultado.matched_count == 0:
            raise HTTPException(status_code=404, detail="Curso no encontrado")
        
        actualizado = cursos_collection.find_one({"_id": oid})
        return {"message": "Curso actualizado", "data": curso_helper(actualizado)}
    except Exception:
        raise HTTPException(status_code=400, detail="ID inválido")

@app.delete("/api/cursos/{id}", tags=["Cursos"])
def eliminar_curso(id: str):
    try:
        oid = ObjectId(id)
        resultado = cursos_collection.delete_one({"_id": oid})
        if resultado.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Curso no encontrado")
        return {"message": "Curso eliminado correctamente"}
    except Exception:
        raise HTTPException(status_code=400, detail="ID inválido")
