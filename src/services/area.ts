import axios from "axios";

export default function areaService() {
  function getAreas() {
    return axios.get(`http://127.0.0.1:3000/api/areas`).then((res) => res.data);
  }

  function getArea(id: string) {
    return axios
      .get(`http://127.0.0.1:3000/api/areas/${id}`)
      .then((res) => res.data);
  }

  function getDirecciones(id: string) {
    return axios
      .get(`http://127.0.0.1:3000/api/areas/direcciones/${id}`)
      .then((res) => res.data);
  }

  function getDireccion(id: string) {
    return axios
      .get(`http://127.0.0.1:3000/api/areas/direccion/${id}`)
      .then((res) => res.data);
  }

  function getDepartments(id: string) {
    return axios
      .get(`http://127.0.0.1:3000/api/areas/departments/${id}`)
      .then((res) => res.data);
  }

  function getDeparment(id: string) {
    return axios
      .get(`http://127.0.0.1:3000/api/areas/department/${id}`)
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
