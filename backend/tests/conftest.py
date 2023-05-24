from unittest.mock import MagicMock

import pytest
import main
from config import Config

from dao.user import UserDAO
from dao.models.user import User


@pytest.fixture()
def user_dao():
    user_dao = UserDAO(None)

    user_1 = User(id=1, email='email1', password='password1', surname='surname1', name='name1')
    user_2 = User(id=2, email='email2', password='password2', surname='surname2', name='name2')
    user_3 = User(id=3, email='email3', password='password3', surname='surname3', name='name3')

    user_dao.get_one = MagicMock(return_value=user_1)
    user_dao.create = MagicMock(return_value=user_2)
    user_dao.get_password = MagicMock(return_value=user_3.password)
    user_dao.get_by_email = MagicMock(return_value=user_1)
    user_dao.reset_password = MagicMock(return_value=user_3)

    return user_dao

