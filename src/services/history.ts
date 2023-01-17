import axios from "axios";

export default function HistoryService() {
  function createHistory(data: any) {
    return axios
      .post(`http://127.0.0.1:3000/api/history`, data)
      .then((res) => res.data);
  }

  function getHistoryByDocument(id: string) {
    return axios
      .get(`http://127.0.0.1:3000/api/history/document/${id}`)
      .then((res) => res.data);
  }

  function getHistoryByActivity(id: string) {
    return axios
      .get(`http://127.0.0.1:3000/api/history/activity/${id}`)
      .then((res) => res.data);
  }

  return {
    getHistoryByDocument,
    getHistoryByActivity,
    createHistory,
  };
}
