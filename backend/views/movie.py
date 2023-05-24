from flask_restx import Resource, Namespace
from flask import request

from dao.models.movie import MovieSchema
from implemented import movie_service

movie_ns = Namespace('movies')

movie_schema = MovieSchema()
movies_schema = MovieSchema(many=True)


@movie_ns.route('/')
class MoviesView(Resource):
    def get(self):
        try:
            args = request.args
            all_movies = movie_service.get_all(args)
            return movies_schema.dump(all_movies), 200
        except Exception:
            return 'Not found', 404


@movie_ns.route('/<int:mid>')
class MovieView(Resource):
    def get(self, mid):
        try:
            movie = movie_service.get_one(mid)
            return movie_schema.dump(movie), 200
        except Exception:
            return 'Not found', 404
