import axios from "axios";

const api = axios.create({
  baseURL: "https://shopify-wzcc.onrender.com",
  withCredentials: true,
});

export default api;
