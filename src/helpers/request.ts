import axios from "axios";

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-apikey": import.meta.env.VITE_API_KEY,
  },
});

request.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return false;
  },
  (_err) => {
    return false;
  }
);

export default request;
