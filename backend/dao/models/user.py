from marshmallow import Schema, fields

from database import db


class User(db.Model):
        __tablename__ = 'user'
        id = db.Column(db.Integer, primary_key=True)
        email = db.Column(db.String(255), unique=True, nullable=False)
        password = db.Column(db.String(255), nullable=False)
        name = db.Column(db.String(255))
        surname = db.Column(db.String(255))


class UserSchema(Schema):
    id = fields.Int()
    email = fields.Str()
    password = fields.Str()
    name = fields.Str()
    surname = fields.Str()
