import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://swellrail-us.backendless.app/api",
});

export const axiosInstance2 = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
});
