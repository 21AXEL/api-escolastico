from flask import Flask, request, jsonify
from pymongo import MongoClient
import os
from bson.objectid import ObjectId
from flasgger import Swagger

app = Flask(__name__)
app.config['SWAGGER'] = {
    'title': 'API Escolar - Módulo Cursos',
    'uiversion': 3
}
swagger = Swagger(app)

mongo_uri = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/escolastico_db')
client = MongoClient(mongo_uri)
db = client.get_default_database()
cursos_collection = db.cursos

@app.route('/')
def home():
    return jsonify({'message': 'Ir a /apidocs para ver la interfaz'})

@app.route('/api/cursos', methods=['POST'])
def crear_curso():
    '''
    Crear nuevo curso
    ---
    tags:
      - Cursos
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            nombre:
              type: string
            descripcion:
              type: string
            creditos:
              type: integer
    responses:
      201:
        description: Curso creado
    '''
    datos = request.json
    nuevo_curso = {
        'nombre': datos.get('nombre'),
        'descripcion': datos.get('descripcion'),
        'creditos': datos.get('creditos', 0)
    }
    resultado = cursos_collection.insert_one(nuevo_curso)
    return jsonify({'message': 'Curso creado', 'id': str(resultado.inserted_id)}), 201

@app.route('/api/cursos', methods=['GET'])
def listar_cursos():
    '''
    Listar cursos
    ---
    tags:
      - Cursos
    responses:
      200:
        description: Lista de cursos
    '''
    cursos = []
    for curso in cursos_collection.find():
        curso['_id'] = str(curso['_id'])
        cursos.append(curso)
    return jsonify(cursos)

@app.route('/api/cursos/<id>', methods=['PUT'])
def actualizar_curso(id):
    '''
    Actualizar un curso
    ---
    tags:
      - Cursos
    parameters:
      - name: id
        in: path
        type: string
        required: true
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            nombre:
              type: string
            descripcion:
              type: string
            creditos:
              type: integer
    responses:
      200:
        description: Curso actualizado
    '''
    datos = request.json
    cursos_collection.update_one({'_id': ObjectId(id)}, {'': datos})
    return jsonify({'message': 'Curso actualizado correctamente'})

@app.route('/api/cursos/<id>', methods=['DELETE'])
def eliminar_curso(id):
    '''
    Eliminar un curso
    ---
    tags:
      - Cursos
    parameters:
      - name: id
        in: path
        type: string
        required: true
    responses:
      200:
        description: Curso eliminado
    '''
    cursos_collection.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'Curso eliminado correctamente'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
