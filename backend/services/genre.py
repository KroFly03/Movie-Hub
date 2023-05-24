from config import Config
from dao.genre import GenreDAO


class GenreService:
    def __init__(self, dao: GenreDAO):
        self.dao = dao

    def get_one(self, gid):
        return self.dao.get_one(gid)

    def get_all(self, args):
        page = args.get('page')

        if page is not None:
            return self.dao.get_all_by_page((int(page)-1)*Config.ITEMS_PER_PAGE)
        else:
            return self.dao.get_all()
