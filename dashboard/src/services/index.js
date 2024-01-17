import axios from "axios";
import AuthServices from "./auth";
import UsersServices from "./users";
import { setGlobalLoading } from "../store/global";
import router from "../router";

const API_ENVS = {
  local: "http://localhost:3000",
  production: "",
};

const httpClient = axios.create({
  baseURL: API_ENVS.local,
});

httpClient.interceptors.request.use((config) => {
  setGlobalLoading(true);
  const token = window.localStorage.getItem("token");
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use((response) => {
  setGlobalLoading(false);
  return response;
}, (error) => {
  const canThrowAnError = error.request.status === 0 || error.request.status === 500;

  if (canThrowAnError) {
    setGlobalLoading(false);
    throw new Error(error.message);
  }

  if (error.response.status === 401) {
    router.push({ name: "Home" });
  }

  setGlobalLoading(false);
  return error;
});

export default {
  auth: AuthServices(httpClient),
  users: UsersServices(httpClient),
};
