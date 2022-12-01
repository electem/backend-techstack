/* eslint-disable prettier/prettier */
import axios from "axios";

const API_URL = "http://localhost:3000/auth/login";

class AuthService {
  login(username: string, password: string) {
    return axios
      .post(API_URL, {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
