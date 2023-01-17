import axios from "../utils/axios";

export default function authService() {
  function signin(data: any) {
    return axios
      .post(`api/auth/login`, data)
      .then((res: any) => res.data)
      .catch((error: Error) => error.message);
  }

  function usersByArea(id: string) {
    return axios.get(`api/users/area/${id}`).then((res: any) => res.data);
  }

  function findAllUsers() {
    return axios.get(`api/users`).then((res: any) => res.data);
  }

  function handleCreateUsers(data: any) {
    return axios.post(`api/users`, data).then((res: any) => res.data);
  }

  return {
    signin,
    usersByArea,
    findAllUsers,
    handleCreateUsers,
  };
}
