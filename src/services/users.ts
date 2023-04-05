import axios from "../utils/axios";

export default function userService() {
  function usersById(id: string) {
    return axios.get(`api/users/${id}`).then((res: any) => res.data);
  }

  function userBySearch(search: string) {
    return axios
      .get(`api/users/find/search?search=${search}`)
      .then((res: any) => res.data);
  }

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

  function handleGetNotifications(id: string) {
    return axios
      .get(`api/users/notifications/${id}`)
      .then((res: any) => res.data.notifications);
  }

  return {
    userBySearch,
    usersByArea,
    usersByDireccion,
    usersByDepartment,
    findAllUsers,
    handleCreateUsers,
    usersById,
    handleGetNotifications,
  };
}
