import axios from "axios";

const baseURL = "/api/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const create = (data) => {
  const request = axios.post(baseURL, data);
  return request.then((response) => response.data);
};

const update = (id, data) => {
  const request = axios.put(`${baseURL}/${id}`, data);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
  remove,
};
