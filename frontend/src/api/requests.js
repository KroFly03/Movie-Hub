import { authUser } from "./auth";
import { setCookie } from "../utils/cookies";

export const authorization = (login, password, onError) => {
  authUser({email: login, password: password})
    .then(res => {
      setCookie("AccessToken", res.data.access_token, { 'max-age': 3600 * 24 * 7 });
      setCookie("RefreshToken", res.data.refresh_token, { 'max-age': 3600 * 24 * 7 });
      window.location = "/";
    })
    .catch(error => {
      console.error(error.response?.data?.message);
      onError(error.response?.data?.message);
    });
}