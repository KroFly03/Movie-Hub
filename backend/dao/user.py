from dao.models.user import User


class UserDAO:
    def __init__(self, session):
        self.session = session

    def get_one(self, uid):
        return self.session.query(User).get(uid)

    def create(self, user):
        self.session.add(user)
        self.session.commit()
        return user

    def get_password(self, uid):
        user = self.get_one(uid)
        return user.password

    def get_by_email(self, email):
        return self.session.query(User).filter(User.email == email).first()

    def reset_password(self, uid, new_password):
        user = self.get_one(uid)

        user.password = new_password

        self.session.add(user)
        self.session.commit()

        return user
