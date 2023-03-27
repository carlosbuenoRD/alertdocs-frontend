import axios from "axios";
import { API_URL } from "@/utils/constants";

export default function filesService() {
  function getFilesByDocument(id: string) {
    return axios.get(`${API_URL}/files/document/${id}`).then((res) => res.data);
  }

  function getFilesByActivity(id: string) {
    return axios.get(`${API_URL}/files/activity/${id}`).then((res) => res.data);
  }

  function removeFile(id: string) {
    return axios.delete(`${API_URL}/files/${id}`).then((res) => res.data);
  }

  return {
    getFilesByDocument,
    getFilesByActivity,
    removeFile,
  };
}
