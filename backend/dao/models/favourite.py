from marshmallow import Schema, fields
from sqlalchemy import UniqueConstraint

from database import db


class Favourite(db.Model):
    __tablename__ = 'favorite'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'))

    user = db.relationship('User')
    movie = db.relationship('Movie')


class FavouriteSchema(Schema):
    id = fields.Int()
    user_id = fields.Int()
    movie_id = fields.Int()
