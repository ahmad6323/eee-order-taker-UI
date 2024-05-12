import httpService from "./httpService";
import config from "../config.json";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const apiEnd = config.apiUrl + "/auth";
const key = "authToken";

const login = async (email, password) => {
  return httpService.post(apiEnd, { email, password });
};

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log("error storing auth token", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("error getting auth token", error);
  }
};

const getUser = async () => {
  const token = await getToken();
  if (token) return jwtDecode(token);
  return null;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("error deleting auth token", error);
  }
};

export default {
  login,
  removeToken,
  storeToken,
  getUser,
  // getToken,
};
