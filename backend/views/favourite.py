from flask_restx import Resource, Namespace

from dao.models.favourite import FavouriteSchema
from flask import request

from implemented import user_service, favourite_service
from views.movie import movies_schema

favourite_ns = Namespace('favourites/movies')

favourite_schema = FavouriteSchema()
favourites_schema = FavouriteSchema(many=True)


@favourite_ns.route('/')
class FavouritesView(Resource):
    def get(self):
        try:
            data = request.headers['Authorization']
            token = data.split('Bearer ')[-1]

            uid = user_service.get_current_user_id(token)

            favourite = favourite_service.get_all(uid)
            return movies_schema.dump(favourite), 200
        except Exception:
            return 'Not found', 404


@favourite_ns.route('/<int:mid>')
class GenresView(Resource):
    def post(self, mid):
        try:
            data = request.headers['Authorization']
            token = data.split('Bearer ')[-1]

            uid = user_service.get_current_user_id(token)

            favourite = favourite_service.add(uid, mid)
            return favourite_schema.dump(favourite), 201
        except Exception:
            return 'Not found', 404

    def delete(self, mid):
        try:
            data = request.headers['Authorization']
            token = data.split('Bearer ')[-1]

            uid = user_service.get_current_user_id(token)

            favourite_service.delete(uid, mid)
            return 204
        except Exception:
            return 'Not found', 404
