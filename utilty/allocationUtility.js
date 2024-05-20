// productUtility.js

import httpService from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/allocation";
export function allocate(allocation) {
  return httpService.post(apiEndpoint, allocation);
}

export function getAllocations(salesmanId) {
  const endPoint = apiEndpoint + `/${salesmanId}`
  return httpService.get(endPoint);
}

export function getProductsForSalesman(salesmanId) {
  const apiEnd = `${apiEndpoint}/variations/${salesmanId}`;
  return httpService.get(apiEnd);
}

export function deleteAlloation(id) {
  return httpService.delete(`${apiEndpoint}/${id}`, id);
}
