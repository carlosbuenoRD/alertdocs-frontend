import axios from "axios";
import { API_URL } from "@/utils/constants";

export default function activityService() {
  async function getActivitiesByUser(id: any) {
    const { data } = await axios.get(`${API_URL}/activities/myactivity/${id}`);
    return data;
  }

  async function getActivityById(id: any) {
    const { data } = await axios.get(`${API_URL}/activities/${id}`);
    return data;
  }

  async function getActivitiesByDocument(id: any) {
    const { data } = await axios.get(`${API_URL}/activities/document/${id}`);
    return data;
  }

  async function getActivitiesByArea(id: any) {
    const { data } = await axios.get(`${API_URL}/activities/area/${id}`);
    return data;
  }

  async function getActivitiesByDireccion(id: any) {
    const { data } = await axios.get(`${API_URL}/activities/direccion/${id}`);
    return data;
  }

  async function getActivitiesByDepartment(id: any) {
    const { data } = await axios.get(`${API_URL}/activities/department/${id}`);
    return data;
  }

  async function getActivitiesByDocumentAndArea(
    area: string,
    document: string
  ) {
    const { data } = await axios.get(
      `${API_URL}/activities/${area}/${document}`
    );
    return data;
  }

  async function changeState(id: any, state: string) {
    const { data } = await axios.patch(
      `${API_URL}/activities/changestate/${id}`,
      state
    );
    return data;
  }

  async function getCompletedStatus(id: any) {
    const { data } = await axios.get(
      `${API_URL}/activities/completed/document/${id}`
    );
    return data;
  }

  async function getCompletedByArea(id: any) {
    const { data } = await axios.get(
      `${API_URL}/activities/completed/area/${id}`
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
    getActivityById,
    getActivitiesByUser,
    getActivitiesByDocument,
    getActivitiesByArea,
    getActivitiesByDireccion,
    getActivitiesByDepartment,
    getActivitiesByDocumentAndArea,
    changeState,
    addHistory,
    getCompletedStatus,
    getCompletedByArea,
  };
}
