import axios from "axios";
import AuthServices from "./auth";

const API_ENVS = {
  local: "http://localhost:3000",
  production: "",
};

const httpClient = axios.create({
  baseURL: API_ENVS.local,
});

httpClient.interceptors.response.use((response) => response, (error) => {
  const canThrowAnError = error.request.status === 0 || error.request.status === 500;

  if (canThrowAnError) {
    throw new Error(error.message);
  }

  return error;
});

export default {
  auth: AuthServices(httpClient),
};
