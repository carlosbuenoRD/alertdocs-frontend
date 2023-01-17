import axios from "axios";

export default function areaService() {
  function getAreas() {
    return axios.get(`http://127.0.0.1:3000/api/areas`).then((res) => res.data);
  }

  return {
    getAreas,
  };
}
