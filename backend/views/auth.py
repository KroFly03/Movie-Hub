from flask_restx import Resource, Namespace
from flask import request

from dao.models.user import UserSchema
from implemented import auth_service, user_service

auth_ns = Namespace('auth')

user_schema = UserSchema()
users_schema = UserSchema(many=True)


@auth_ns.route('/register')
class AuthRegisterView(Resource):
    def post(self):
        data = request.json
        return user_schema.dump(user_service.create(data))


@auth_ns.route('/login')
class AuthLoginView(Resource):
    def post(self):
        data = request.json
        email = data.get('email', None)
        password = data.get('password', None)

        return auth_service.generate_tokens(email, password)

    def put(self):
        try:
            refresh_token = request.json.get('refresh_token')

            return auth_service.approve_refresh_token(refresh_token)
        except Exception:
            return 401
