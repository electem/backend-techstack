/* eslint-disable @typescript-eslint/no-unused-expressions */
import axios from "axios";
const userStr = localStorage.getItem("user");
let user = null;
if (userStr) user = JSON.parse(userStr);
export default axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer + ${user.access_token}`,
  },
});
