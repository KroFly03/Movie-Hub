from dao.models.favourite import Favourite


class FavouriteDAO:
    def __init__(self, session):
        self.session = session

    def get_all(self, uid):
        return self.session.query(Favourite).filter_by(user_id=uid).all()

    def get_one(self, uid, mid):
        return self.session.query(Favourite).filter_by(user_id=uid, movie_id=mid).first()

    def add(self, favourite):
        self.session.add(favourite)
        self.session.commit()
        return favourite

    def delete(self, uid, mid):
        Favourite.query.filter_by(user_id=uid, movie_id=mid).delete()
        self.session.commit()
