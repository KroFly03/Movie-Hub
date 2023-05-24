from dao.models.genre import Genre
from config import Config


class GenreDAO:
    def __init__(self, session):
        self.session = session

    def get_one(self, gid):
        return self.session.query(Genre).get(gid)

    def get_all(self):
        return self.session.query(Genre).all()

    def get_all_by_page(self, range):
        return self.session.query(Genre).offset(range).limit(Config.ITEMS_PER_PAGE).all()
