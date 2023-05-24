from dao.models.director import Director
from config import Config


class DirectorDAO:
    def __init__(self, session):
        self.session = session

    def get_one(self, did):
        return self.session.query(Director).get(did)

    def get_all(self):
        return self.session.query(Director).all()

    def get_all_by_page(self, range):
        return self.session.query(Director).offset(range).limit(Config.ITEMS_PER_PAGE).all()
