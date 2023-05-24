import pytest

from main import create_app
from config import Config
from services.auth import AuthService
from services.user import UserService


class TestUserView:
    @pytest.fixture(autouse=True)
    def auth_service(self, user_dao):
        self.auth_service = AuthService(UserService(dao=user_dao))

    @pytest.fixture()
    def app(self):
        app = create_app(Config)
        app.config.update({
            'TESTING': True,
        })
        return app

    @pytest.fixture()
    def client(self, app):
        return app.test_client()

    def test_get_user(self, client):
        tokens = self.auth_service.generate_tokens('email1', 'password', True)
        assert tokens.get('access_token') is not None
        assert tokens.get('refresh_token') is not None
