import axios from "axios";
import cookies from "js-cookie";

let user = cookies.get("auth") ? JSON.parse(String(cookies.get("auth"))) : null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.API_URL || "http://localhost:3000/",
  // baseURL: "https://alertdocs-backend-production-22ef.up.railway.app/",
});

axiosInstance.interceptors.request.use(
  function (config: any) {
    const token = user?.token;

    if (token) {
      if (config.headers) {
        config.headers["Authorization"] = "Bearer " + token;
      }
    }
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response: any) {
    return response;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
