import axios from "axios";
import { API_URL } from "@/utils/constants";

export default function flujoService() {
  async function getFlujos() {
    const { data } = await axios.get(`${API_URL}/flujos`);
    return data;
  }

  async function getFlujosByArea(id: string) {
    const { data } = await axios.get(`${API_URL}/flujos/area/${id}`);
    return data;
  }

  async function getOneFlujo(id: string) {
    const { data } = await axios.get(`${API_URL}/flujos/${id}`);
    return data;
  }

  async function addFlujo(flujo: any) {
    const { data } = await axios.post(`${API_URL}/flujos`, flujo);
    return data;
  }

  async function update(flujo: any, id: string) {
    const { data } = await axios.put(`${API_URL}/flujos/${id}`, flujo);
    return data;
  }

  async function removeFlujo(id: any) {
    const { data } = await axios.delete(`${API_URL}/flujos/${id}`);
    return data;
  }

  return {
    getFlujos,
    getOneFlujo,
    getFlujosByArea,
    addFlujo,
    update,
    removeFlujo,
  };
}

interface Flujo {
  id: number;
  description?: string;
  activities?: [
    {
      step: number;
      areaId: string;
      usersId: [string];
      description: string;
      hours: string;
    }
  ];
}
