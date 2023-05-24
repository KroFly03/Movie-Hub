import axios from 'axios';
import { getCookie } from "../utils/cookies";

export default axios.create({
  baseURL: `http://127.0.0.1:5000`,
  // withCredentials: true,
  headers: {
    Authorization: "Bearer " + getCookie("AccessToken")
  }
});
