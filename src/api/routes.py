from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta

api = Blueprint('api', __name__)

jwt = JWTManager()  
bcrypt = Bcrypt() 
CORS(api)

@api.route('/users', methods=['POST'])
def create_user():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        name = request.json.get('name')

        if not email or not password or not name:
            return jsonify({"error": "Estos campos no pueden estar vacíos"}), 400

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"error": "El usuario ya existe"}), 409

        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

        new_user = User(email=email, password=password_hash, name=name, is_active=True)

        db.session.add(new_user)
        db.session.commit()

        new_user_info = {
            "email": new_user.email,
            "name": new_user.name,
            "id": new_user.id
        }

        return jsonify({
            "mensaje": "El usuario se guardó correctamente",
            "new_user_created": new_user_info
        }), 201

    except Exception as e:
        print("Error al crear usuario:", e)
        return jsonify({'error': 'Ocurrió un error al crear el usuario'}), 500

@api.route('/login', methods =['POST'])
def get_login():
    try:
        email = request.json.get('email')
        password = request.json.get('password')

        if not email or not password:
            return jsonify({'error': 'Se necesita ingresar un correo y un password'}), 400

        db_user = User.query.filter_by(email=email).first()

        if not db_user:
            return jsonify({'error': 'Email no válido'}), 404

        db_password = db_user.password
        if bcrypt.check_password_hash(db_password, password):
            expires = timedelta(hours=5)
            user_id = db_user.id
            access_token = create_access_token(identity=str(user_id), expires_delta=expires)
            return jsonify({'access_token': access_token}), 200
        else:
            return jsonify({"error": "Contraseña incorrecta"}), 404

    except Exception as e:
        print("Error al hacer login:", e)
        return jsonify({"error": "Ocurrió un error al hacer login"}), 500

@api.route('/users/me')
@jwt_required()
def get_my_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user:
        return jsonify({
            "id": user.id,
            "email": user.email,
            "name": user.name
        }), 200
    else:
        return jsonify({"error": "Usuario no encontrado"}), 404
