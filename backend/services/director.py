from dao.director import DirectorDAO
from config import Config


class DirectorService:
    def __init__(self, dao: DirectorDAO):
        self.dao = dao

    def get_one(self, did):
        return self.dao.get_one(did)

    def get_all(self, args):
        page = args.get('page')

        if page is not None:
            return self.dao.get_all_by_page((int(page) - 1) * Config.ITEMS_PER_PAGE)
        else:
            return self.dao.get_all()
