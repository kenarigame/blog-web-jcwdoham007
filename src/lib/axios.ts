import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://swellrail-us.backendless.app/api",
});