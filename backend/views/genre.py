from flask_restx import Resource, Namespace
from dao.models.genre import GenreSchema
from implemented import genre_service
from flask import request

genre_ns = Namespace('genres')

genre_schema = GenreSchema()
genres_schema = GenreSchema(many=True)


@genre_ns.route('/')
class GenresView(Resource):
    def get(self):
        try:
            args = request.args
            all_genres = genre_service.get_all(args)
            return genres_schema.dump(all_genres), 200
        except Exception:
            return 'Not found', 404


@genre_ns.route('/<int:gid>')
class GenreView(Resource):
    def get(self, gid):
        try:
            genre = genre_service.get_one(gid)
            return genre_schema.dump(genre), 200
        except Exception:
            return 'Not found', 404