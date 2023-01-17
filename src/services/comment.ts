import axios from "axios";

export default function commentService() {
  function createComment(info: any) {
    return axios
      .post(`http://127.0.0.1:3000/api/comments`, info)
      .then((res) => res.data.data);
  }

  function getCommentsByActivity(id: string) {
    return axios
      .get(`http://127.0.0.1:3000/api/comments/activity/${id}`)
      .then((res) => res.data);
  }

  function getCommentsByDocument(id: string) {
    return axios
      .get(`http://127.0.0.1:3000/api/comments/documents/${id}`)
      .then((res) => res.data);
  }

  function updateComment(id: string, text: string) {
    return axios
      .patch(`http://127.0.0.1:3000/api/comments/${id}`, { text })
      .then((res) => res.data.data);
  }

  function removeComment(id: string) {
    return axios
      .delete(`http://127.0.0.1:3000/api/comments/${id}`)
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
