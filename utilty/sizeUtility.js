import httpService from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/sizes";

function sizeUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getSizes() {
  return httpService.get(apiEndpoint);
}

export function deleteSize(id) {
  return httpService.delete(sizeUrl(id));
}

export function saveSize(size) {
  return httpService.post(apiEndpoint, size);
}
