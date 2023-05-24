import pytest

from services.user import UserService


class TestUserService:
    @pytest.fixture(autouse=True)
    def user_service(self, user_dao):
        self.user_service = UserService(dao=user_dao)

    def test_get_one(self):
        user = self.user_service.get_one(1)

        assert user is not None
        assert user.id is not None

    def test_create(self):
        user = {
            'email': 'email1',
            'password': 'password1',
            'surname': 'surname1',
            'name': 'name1'
        }

        user = self.user_service.create(user)

        assert user is not None
        assert user.id is not None

    def test_patch(self):
        user = {
            'email': 'email1',
            'password': 'password2',
            'surname': 'surname2',
            'name': 'name1'
        }

        user = self.user_service.patch(user)

        assert user is not None
        assert user.id is not None

    def test_get_hash(self):
        hash = self.user_service.get_hash('password')

        assert hash is not None

    def test_get_by_email(self):
        user = self.user_service.get_by_email('email')

        assert user is not None
        assert user.id is not None

    def test_compare_passwords(self):
        assert self.user_service.compare_passwords(self.user_service.get_hash('password'), 'password')
