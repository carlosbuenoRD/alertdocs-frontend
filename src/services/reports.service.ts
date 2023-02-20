import axios from "axios";

// Utils
import { API_URL } from "@/utils/constants";
// Models
import { Report } from "@/models/reports.model";

export async function getAllReports(): Promise<Report[]> {
  try {
    const { data } = await axios.get<Report[]>(`${API_URL}/reports`);
    return data;
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
}

export async function getOneReports(id: string): Promise<Report> {
  try {
    const { data } = await axios.get<Report>(`${API_URL}/reports/${id}`);
    return data;
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
}

export async function getReportByArea(id: string): Promise<Report> {
  try {
    const { data } = await axios.get<Report>(`${API_URL}/reports/area/${id}`);
    return data;
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
}

export async function getReportOfTheMonth(): Promise<Report> {
  try {
    const { data } = await axios.get<Report>(`${API_URL}/reports/month/top1`);
    return data;
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
}
