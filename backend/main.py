from flask import Flask
from flask_restx import Api
from flask_cors import CORS
from config import Config
from database import db
from views.auth import auth_ns
from views.director import director_ns
from views.favourite import favourite_ns
from views.genre import genre_ns
from views.movie import movie_ns
from views.user import user_ns


def create_app(config):
    application = Flask(__name__)
    application.config.from_object(config)
    CORS(app=application, supports_credentials=True)
    configure_app(application)

    return application


def configure_app(application):
    db.init_app(application)
    with application.app_context():
        db.create_all()
    api = Api(doc='/docs')
    api.init_app(application)
    api.add_namespace(genre_ns)
    api.add_namespace(director_ns)
    api.add_namespace(movie_ns)
    api.add_namespace(auth_ns)
    api.add_namespace(user_ns)
    api.add_namespace(favourite_ns)


app = create_app(Config())
