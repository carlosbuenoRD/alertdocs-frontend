import axios from "axios";
import { API_URL } from "@/utils/constants";

export default function HistoryService() {
  function createHistory(data: any) {
    return axios.post(`${API_URL}/history`, data).then((res) => res.data);
  }

  function getHistoryByDocument(id: string) {
    return axios
      .get(`${API_URL}/history/document/${id}`)
      .then((res) => res.data);
  }

  function getHistoryByActivity(id: string) {
    return axios
      .get(`${API_URL}/history/activity/${id}`)
      .then((res) => res.data);
  }

  return {
    getHistoryByDocument,
    getHistoryByActivity,
    createHistory,
  };
}
