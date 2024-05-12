import httpService from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/categories";

function categoryUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function saveCategory(category) {
  if (category._id) {
    const body = { ...category };
    delete body._id;
    return httpService.put(categoryUrl(category._id), body);
  }
  return httpService.post(apiEndpoint, category);
}

export function getCategories() {
  return httpService.get(apiEndpoint);
}

export function deleteCategory(id) {
  return httpService.delete(categoryUrl(id));
}

export function getCat(id) {
  return httpService.get(categoryUrl(id));
}

export function getCategory(categoryId) {
  return httpService.get(apiEndpoint + `/${categoryId}`);
}
