// productUtility.js

import httpService from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/allocation";

export function getAllocations() {
  return httpService.get(apiEndpoint);
}
