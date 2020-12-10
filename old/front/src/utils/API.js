import axios from "axios";

const headers = {
  "Content-Type": "application/json"
};
const burl = "http://127.0.0.1:28000";

export default {
  login: function(email, password) {
    console.log("test");
    return axios.post(
      `${burl}/user/login`,
      {
        email,
        password
      },
      {
        headers: headers
      }
    );
  },
  signup: function(send) {
    return axios.post(`${burl}/user/register`, send, { headers: headers });
  },

  isAuth: function() {
    return localStorage.getItem("token") !== null;
  },
  logout: function() {
    localStorage.clear();
  }
};