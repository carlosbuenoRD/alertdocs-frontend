import axios from "axios";
import { API_URL } from "@/utils/constants";

export default function areaService() {
  function getAreas() {
    return axios.get(`${API_URL}/areas`).then((res) => res.data);
  }

  function getArea(id: string) {
    return axios.get(`${API_URL}/areas/${id}`).then((res) => res.data);
  }

  function getDirecciones(id: string) {
    return axios
      .get(`${API_URL}/areas/direcciones/${id}`)
      .then((res) => res.data);
  }

  function getDireccion(id: string) {
    return axios
      .get(`${API_URL}/areas/direccion/${id}`)
      .then((res) => res.data);
  }

  function getDepartments(id: string) {
    return axios
      .get(`${API_URL}/areas/departments/${id}`)
      .then((res) => res.data);
  }

  function getDeparment(id: string) {
    return axios
      .get(`${API_URL}/areas/department/${id}`)
      .then((res) => res.data);
  }

  return {
    getAreas,
    getArea,
    getDirecciones,
    getDireccion,
    getDepartments,
    getDeparment,
  };
}
