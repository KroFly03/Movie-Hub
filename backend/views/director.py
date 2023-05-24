from flask_restx import Resource, Namespace
from dao.models.director import DirectorSchema
from implemented import director_service
from flask import request

director_ns = Namespace('directors')

director_schema = DirectorSchema()
directors_schema = DirectorSchema(many=True)


@director_ns.route('/')
class DirectorsView(Resource):
    def get(self):
        try:
            args = request.args
            all_directors = director_service.get_all(args)
            return directors_schema.dump(all_directors), 200
        except Exception:
            return 'Not found', 404


@director_ns.route('/<int:did>')
class DirectorView(Resource):
    def get(self, did):
        try:
            director = director_service.get_one(did)
            return director_schema.dump(director), 200
        except Exception:
            return 'Not found', 404
