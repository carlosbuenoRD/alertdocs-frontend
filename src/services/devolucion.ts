import { API_URL } from "@/utils/constants";
import axios from "axios";

export default function devolucionService() {
  function getDevolucionesByActivity(id: string) {
    return axios
      .get(`${API_URL}/devoluciones/activity/${id}`)
      .then((res) => res.data);
  }
  function getDevolucionesByUser(id: string) {
    return axios
      .get(`${API_URL}/devoluciones/user/${id}`)
      .then((res) => res.data);
  }
  function getDevolucionesByArea(id: string) {
    return axios
      .get(`${API_URL}/devoluciones/area/${id}`)
      .then((res) => res.data);
  }

  function getDevolucionesByDireccion(id: string) {
    return axios
      .get(`${API_URL}/devoluciones/direccion/${id}`)
      .then((res) => res.data);
  }

  function getDevolucionesByDepartment(id: string) {
    return axios
      .get(`${API_URL}/devoluciones/department/${id}`)
      .then((res) => res.data);
  }

  function getActiveDevolucionesByActivity(id: string) {
    return axios
      .get(`${API_URL}/devoluciones/active/activity/${id}`)
      .then((res) => res.data);
  }

  function createDevolucion(info: any) {
    return axios.post(`${API_URL}/devoluciones`, info).then((res) => res.data);
  }

  function endDevolucion(id: string) {
    return axios
      .patch(`${API_URL}/devoluciones/end/${id}`)
      .then((res) => res.data.data);
  }

  return {
    getDevolucionesByUser,
    getDevolucionesByActivity,
    getDevolucionesByArea,
    getDevolucionesByDireccion,
    getDevolucionesByDepartment,
    getActiveDevolucionesByActivity,
    createDevolucion,
    endDevolucion,
  };
}
