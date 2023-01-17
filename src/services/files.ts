import axios from "axios";

export default function filesService() {
  function getFilesByDocument(id: string) {
    return axios
      .get(`http://127.0.0.1:3000/api/files/document/${id}`)
      .then((res) => res.data);
  }

  function getFilesByActivity(id: string) {
    return axios
      .get(`http://127.0.0.1:3000/api/files/activity/${id}`)
      .then((res) => res.data);
  }

  function removeFile(id: string) {
    return axios
      .delete(`http://127.0.0.1:3000/api/files/${id}`)
      .then((res) => res.data);
  }

  return {
    getFilesByDocument,
    getFilesByActivity,
    removeFile,
  };
}
