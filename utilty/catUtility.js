import httpService from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/categories";

function categoryUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function saveCategory(category) {
  return httpService.post(apiEndpoint, category);
}

export function getCategories() {
  return httpService.get(apiEndpoint);
}

export function getAllSubCategories() {
  return httpService.get(categoryUrl("sub_cats"));
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

export function getSubCategories(categoryId) {
  return httpService.get(apiEndpoint + `/get_subs/${categoryId}`);
}

export function updateCategory(categoryId,data) {
  return httpService.put(categoryUrl(categoryId), data);
}
