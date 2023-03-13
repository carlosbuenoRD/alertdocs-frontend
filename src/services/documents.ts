import axios from "axios";

export default function documentService() {
  async function getDocuments() {
    const { data } = await axios.get("http://127.0.0.1:3000/api/documents");
    return data;
  }

  async function getOneDocument(id: string) {
    const { data } = await axios.get(
      `http://127.0.0.1:3000/api/documents/${id}`
    );
    return data;
  }

  async function getCompletedDocumentsByArea(id: string) {
    const { data } = await axios.get(
      `http://127.0.0.1:3000/api/documents/completed/area/${id}`
    );
    return data;
  }

  async function getCompletedDocumentsByDireccion(id: string) {
    const { data } = await axios.get(
      `http://127.0.0.1:3000/api/documents/completed/direccion/${id}`
    );
    return data;
  }

  async function getCompletedDocumentsByDepartment(id: string) {
    const { data } = await axios.get(
      `http://127.0.0.1:3000/api/documents/completed/department/${id}`
    );
    return data;
  }

  async function getDocumentsByArea(id: string) {
    const { data } = await axios.get(
      `http://127.0.0.1:3000/api/documents/area/${id}`
    );
    return data;
  }

  async function getDocumentsByDireccion(id: string) {
    const { data } = await axios.get(
      `http://127.0.0.1:3000/api/documents/direccion/${id}`
    );
    return data;
  }

  async function getDocumentsByDepartment(id: string) {
    const { data } = await axios.get(
      `http://127.0.0.1:3000/api/documents/department/${id}`
    );
    return data;
  }

  async function addDocument(document: any) {
    console.log(document);
    const { data } = await axios.post(
      "http://127.0.0.1:3000/api/documents",
      document
    );
    return data;
  }

  return {
    getDocuments,
    getOneDocument,
    getDocumentsByArea,
    getDocumentsByDireccion,
    getDocumentsByDepartment,
    getCompletedDocumentsByArea,
    getCompletedDocumentsByDireccion,
    getCompletedDocumentsByDepartment,
    addDocument,
  };
}
