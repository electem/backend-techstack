import axios from "axios";
import { TokenModel } from "../types/token.types";
const API_URL = "http://localhost:3000/auth/login";
var token: TokenModel;
class AuthService {
  async login(username: string, password: string) {
    const response = await axios.post(API_URL, {
      username,
      password,
    });

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data.access_token));
      console.log(response.data.access_token);
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return userStr;

    return null;
  }
}

export default new AuthService();
