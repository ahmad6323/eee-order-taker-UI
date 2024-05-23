import httpService from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/orders";

export function saveOrder(category) {
  return httpService.post(apiEndpoint, category);
}

export function getOrders() {
  return httpService.get(apiEndpoint);
}

export function getOrdersSalesman(id) {
  return httpService.get(apiEndpoint + `/salesman_orders/${id}`);
}

export function getProfileScreenData() {
  return httpService.get(apiEndpoint+"/profile_screen");
}
