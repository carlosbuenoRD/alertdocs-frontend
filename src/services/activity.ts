import axios from "axios";

export default function activityService() {
  async function getActivitiesByUser(id: any) {
    const { data } = await axios.get(
      `http://127.0.0.1:3000/api/activities/myactivity/${id}`
    );
    return data;
  }

  async function getActivitiesByDocument(id: any) {
    const { data } = await axios.get(
      `http://127.0.0.1:3000/api/activities/document/${id}`
    );
    return data;
  }

  async function getActivitiesByArea(id: any) {
    const { data } = await axios.get(
      `http://127.0.0.1:3000/api/activities/area/${id}`
    );
    return data;
  }

  async function getActivitiesByDireccion(id: any) {
    const { data } = await axios.get(
      `http://127.0.0.1:3000/api/activities/direccion/${id}`
    );
    return data;
  }

  async function getActivitiesByDepartment(id: any) {
    const { data } = await axios.get(
      `http://127.0.0.1:3000/api/activities/department/${id}`
    );
    return data;
  }

  async function getActivitiesByDocumentAndArea(
    area: string,
    document: string
  ) {
    const { data } = await axios.get(
      `http://127.0.0.1:3000/api/activities/${area}/${document}`
    );
    return data;
  }

  async function changeState(id: any, state: string) {
    const { data } = await axios.patch(
      `http://127.0.0.1:3000/api/activities/changestate/${id}`,
      state
    );
    return data;
  }

  async function getCompletedStatus(id: any) {
    const { data } = await axios.get(
      `http://127.0.0.1:3000/api/activities/completed/document/${id}`
    );
    return data;
  }

  async function addHistory(info: any) {
    const { data } = await axios.post(
      `http://127.0.0.1:3000/activities/add-history`,
      info
    );
    return data;
  }

  return {
    getActivitiesByUser,
    getActivitiesByDocument,
    getActivitiesByArea,
    getActivitiesByDireccion,
    getActivitiesByDepartment,
    getActivitiesByDocumentAndArea,
    changeState,
    addHistory,
    getCompletedStatus,
  };
}
