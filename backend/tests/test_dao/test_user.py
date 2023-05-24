import pytest


class TestUserDAO:
    @pytest.fixture(autouse=True)
    def user_service(self, user_dao):
        self.user_dao = user_dao

    def test_get_one(self):
        user = self.user_dao.get_one(1)

        assert user is not None
        assert user.id is not None

    def test_create(self):
        user = {
            'email': 'email1',
            'password': 'password1',
            'surname': 'surname1',
            'name': 'name1'
        }

        user = self.user_dao.create(user)

        assert user is not None
        assert user.id is not None

    def test_get_password(self):
        password = self.user_dao.get_password(3)

        assert password is not None

    def test_get_by_email(self):
        user = self.user_dao.get_by_email('email1')

        assert user is not None
        assert user.id is not None

    def test_reset_password(self):
        user = self.user_dao.reset_password(3, 'password1')

        assert user is not None
        assert user.id is not None
