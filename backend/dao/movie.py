from sqlalchemy import desc

from dao.models.movie import Movie
from config import Config


class MovieDAO:
    def __init__(self, session):
        self.session = session

    def get_one(self, mid):
        return self.session.query(Movie).get(mid)

    def get_all(self):
        return self.session.query(Movie).all()

    def get_all_by_page(self, range):
        return self.session.query(Movie).offset(range).limit(Config.ITEMS_PER_PAGE).all()

    def get_all_newest(self):
        return self.session.query(Movie).order_by(desc(Movie.year)).all()

    def get_all_newest_by_page(self, range):
        return self.session.query(Movie).order_by(desc(Movie.year)).offset(range).limit(Config.ITEMS_PER_PAGE).all()
