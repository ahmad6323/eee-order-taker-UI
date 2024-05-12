import Axios from "axios";

function setJWT(jwt) {
  Axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: Axios.get,
  put: Axios.put,
  delete: Axios.delete,
  post: Axios.post,
  setJWT,
};
