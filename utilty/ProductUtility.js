// productUtility.js

import httpService from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/products";

export function getProduct(productId) {
  return httpService.get(apiEndpoint + `/${productId}`);
}

export function getProducts() {
  return httpService.get(apiEndpoint);
}

export function saveProduct(product) {
  return httpService.post(apiEndpoint,product,{
    headers:{
      Accept : "application/json",
      'Content-Type': 'multipart/form-data',
    }
  });
}

export function deleteProduct(productId) {
  return httpService.delete(apiEndpoint + `/${productId}`);
}

export function getdProducts(did) {
  return httpService.get(`${apiEndpoint}/department/${did}`);
}
