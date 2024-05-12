import httpService from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/colors";

function colorUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getColors() {
  return httpService.get(apiEndpoint);
}

export function deleteColor(id) {
  return httpService.delete(colorUrl(id));
}

export function saveColor(color) {
  return httpService.post(apiEndpoint, color);
}
