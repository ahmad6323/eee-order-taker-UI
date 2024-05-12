import httpService from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/departments";

function departmentUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function saveDepartment(department) {
  if (department._id) {
    const body = { ...department };
    delete body._id;
    return httpService.put(departmentUrl(department._id), body);
  }
  return httpService.post(apiEndpoint, department);
}

export function getDepartments() {
  return httpService.get(apiEndpoint);
}

export function deleteDepartment(id) {
  return httpService.delete(departmentUrl(id));
}

export function getDepartment(departmentId) {
  return httpService.get(apiEndpoint + `/${departmentId}`);
}
