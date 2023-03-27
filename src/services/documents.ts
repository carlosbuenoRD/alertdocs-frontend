import axios from "axios";
import { API_URL } from "@/utils/constants";

export default function documentService() {
  async function getDocuments() {
    const { data } = await axios.get(`${API_URL}/documents`);
    return data;
  }

  async function getOneDocument(id: string) {
    const { data } = await axios.get(`${API_URL}/documents/${id}`);
    return data;
  }

  async function getCompletedDocumentsByArea(id: string) {
    const { data } = await axios.get(
      `${API_URL}/documents/completed/area/${id}`
    );
    return data;
  }

  async function getCompletedDocumentsByDireccion(id: string) {
    const { data } = await axios.get(
      `${API_URL}/documents/completed/direccion/${id}`
    );
    return data;
  }

  async function getCompletedDocumentsByDepartment(id: string) {
    const { data } = await axios.get(
      `${API_URL}/documents/completed/department/${id}`
    );
    return data;
  }

  async function getDocumentsByArea(id: string) {
    const { data } = await axios.get(`${API_URL}/documents/area/${id}`);
    return data;
  }

  async function getDocumentsByDireccion(id: string) {
    const { data } = await axios.get(`${API_URL}/documents/direccion/${id}`);
    return data;
  }

  async function getDocumentsByDepartment(id: string) {
    const { data } = await axios.get(`${API_URL}/documents/department/${id}`);
    return data;
  }

  async function addDocument(document: any) {
    console.log(document);
    const { data } = await axios.post(`${API_URL}/documents`, document);
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
