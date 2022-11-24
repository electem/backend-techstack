import axios from "axios";
import authHeader from "./services/auth-headers";

export default axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-type": "application/json",
  },
});
const instance = axios.create();
instance.interceptors.request.use(function () {
  "hello";
});
