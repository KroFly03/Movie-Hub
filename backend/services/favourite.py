from dao.favourite import FavouriteDAO
from dao.models.favourite import Favourite
from dao.user import UserDAO
from dao.movie import MovieDAO


class FavouriteService:
    def __init__(self, favourite_dao: FavouriteDAO, user_dao: UserDAO, movie_dao: MovieDAO):
        self.favourite_dao = favourite_dao
        self.user_dao = user_dao
        self.movie_dao = movie_dao

    def get_all(self, uid):
        movies = []

        for movie in self.favourite_dao.get_all(uid):
            movies.append(self.movie_dao.get_one(movie.movie_id))

        return movies

    def add(self, uid, mid):
        if not self.favourite_dao.get_one(uid, mid):
            favourite = Favourite(user_id=uid, movie_id=mid)
            return self.favourite_dao.add(favourite)

        raise Exception('This movie has already added')

    def delete(self, uid, mid):
        if self.favourite_dao.get_one(uid, mid):
            return self.favourite_dao.delete(uid, mid)

        raise Exception('This movie has already deleted')
