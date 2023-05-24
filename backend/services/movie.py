from config import Config
from dao.movie import MovieDAO


class MovieService:
    def __init__(self, dao: MovieDAO):
        self.dao = dao

    def get_one(self, mid):
        return self.dao.get_one(mid)

    def get_all(self, args):
        status = args.get('status')
        page = args.get('page')

        is_status_enter = status is not None and status == 'new'
        is_page_enter = page is not None

        if is_status_enter and is_page_enter:
            return self.dao.get_all_newest_by_page((int(page)-1)*Config.ITEMS_PER_PAGE)
        if is_status_enter:
            return self.dao.get_all_newest()
        if is_page_enter:
            return self.dao.get_all_by_page((int(page)-1)*Config.ITEMS_PER_PAGE)
        else:
            return self.dao.get_all()
