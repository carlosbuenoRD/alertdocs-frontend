import axios from "axios";
import { API_URL } from "@/utils/constants";

export default function commentService() {
  function createComment(info: any) {
    return axios.post(`${API_URL}/comments`, info).then((res) => res.data.data);
  }

  function getCommentsByActivity(id: string) {
    return axios
      .get(`${API_URL}/comments/activity/${id}`)
      .then((res) => res.data);
  }

  function getCommentsByDocument(id: string) {
    return axios
      .get(`${API_URL}/comments/documents/${id}`)
      .then((res) => res.data);
  }

  function updateComment(id: string, text: string) {
    return axios
      .patch(`${API_URL}/comments/${id}`, { text })
      .then((res) => res.data.data);
  }

  function removeComment(id: string) {
    return axios
      .delete(`${API_URL}/comments/${id}`)
      .then((res) => res.data.data);
  }

  return {
    createComment,
    getCommentsByActivity,
    getCommentsByDocument,
    removeComment,
    updateComment,
  };
}
