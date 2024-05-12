// productUtility.js

import httpService from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/allocation";
export function allocate(allocation) {
  return httpService.post(apiEndpoint, allocation);
}

export function getAllocations() {
  return httpService.get(apiEndpoint);
}

export function deleteAlloation(id) {
  return httpService.delete(`${apiEndpoint}/${id}`, id);
}
