import axios from "axios";

export default function flujoService() {
  async function getFlujos() {
    const { data } = await axios.get("http://127.0.0.1:3000/api/flujos");
    return data;
  }

  async function getFlujosByArea(id: string) {
    const { data } = await axios.get(
      `http://127.0.0.1:3000/api/flujos/area/${id}`
    );
    return data;
  }

  async function getOneFlujo(id: string) {
    const { data } = await axios.get(`http://127.0.0.1:3000/api/flujos/${id}`);
    return data;
  }

  async function addFlujo(flujo: any) {
    const { data } = await axios.post(
      "http://127.0.0.1:3000/api/flujos",
      flujo
    );
    return data;
  }

  async function update(flujo: any, id: string) {
    const { data } = await axios.put(
      `http://127.0.0.1:3000/api/flujos/${id}`,
      flujo
    );
    return data;
  }

  async function removeFlujo(id: any) {
    const { data } = await axios.delete(
      `http://127.0.0.1:3000/api/flujos/${id}`
    );
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
