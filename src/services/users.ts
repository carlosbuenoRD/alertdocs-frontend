import axios from "../utils/axios";

export default function userService() {
  function usersByArea(id: string) {
    return axios.get(`api/users/area/${id}`).then((res: any) => res.data);
  }

  function usersByDireccion(id: string) {
    return axios.get(`api/users/direccion/${id}`).then((res: any) => res.data);
  }

  function usersByDepartment(id: string) {
    return axios.get(`api/users/department/${id}`).then((res: any) => res.data);
  }

  function findAllUsers() {
    return axios.get(`api/users`).then((res: any) => res.data);
  }

  function handleCreateUsers(data: any) {
    return axios.post(`api/users`, data).then((res: any) => res.data);
  }

  return {
    usersByArea,
    usersByDireccion,
    usersByDepartment,
    findAllUsers,
    handleCreateUsers,
  };
}
