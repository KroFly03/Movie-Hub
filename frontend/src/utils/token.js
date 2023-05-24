import { updateToken } from "../api/auth";
import { getCookie, setCookie } from "./cookies";

export const tokenChecker = (error) => {
  const accessToken = getCookie("AccessToken");
  const refreshToken = getCookie("RefreshToken");

  if (error?.response?.status === 401 && accessToken && refreshToken) {
    console.log("Trying to refresh token");
    updateToken({access_token: accessToken, refresh_token: refreshToken})
      .then(res => {
        setCookie("AccessToken", res.data.access_token, { 'max-age': 3600 * 24 * 7 });
        setCookie("RefreshToken", res.data.refresh_token, { 'max-age': 3600 * 24 * 7 });
        document.location.reload();
      })
      .catch(error => {
        console.error("Token refresh unsuccessful", error.response);
        window.location = "/login";
      })
  } else {
    console.error("No tokens were founded", error.response);
    window.location = "/login";
  }
};

export const isTokenExpired = () => {
  console.log(getJWTData().exp, new Date()/1000)
  return getJWTData().exp < new Date()/1000;
};

export const getJWTData = () => {
  const token = getCookie("AccessToken");
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};