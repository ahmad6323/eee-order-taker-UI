import httpService from "./httpService";
import config from "../config.json";

const apiEnd = config.apiUrl + "/admins";

export const forgotPassword = async (email) => {
  return httpService.post(`${apiEnd}/forgot`, { email });
};

export const verifyForgotPassword = async (code) => {
  return httpService.post(`${apiEnd}/code`, { forgotPassword: true, code });
};

export const updatePassword = async (email, password) => {
  return httpService.put(`${apiEnd}/updatePass`, { email, password });
};
