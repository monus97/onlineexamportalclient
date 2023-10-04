import axios from "axios";
import { errorAlert } from "../utils/swal";
const authInstance = axios.create({
  baseURL: "https://examapp-a4wo.onrender.com/api",
});

authInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = JSON.parse(localStorage.getItem("user_Token"));
  config.headers["Authorization"] = "Bearer " + token;
  return config;
});

authInstance.interceptors.response.use(
  (response) => {
    // console.log("hello ", response);
    // alert("hello ")
    return response;
  },
  (error) => {
    // console.log(error, "global");
    switch (error.response.status) {
      case 400:
        errorAlert(`Oops!`, "something went wrong");
        break;
      case 500:
        alert("global error 500 ");
        break;
    }

    if (error.response.status === 400) {
    }
    return Promise.reject(error);
  }
);

export default authInstance;
