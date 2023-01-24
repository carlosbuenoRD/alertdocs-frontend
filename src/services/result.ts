import { getEficiencia } from "@/utils/formula";
import activityService from "@/services/activity";

const {
  getActivitiesByArea,
  getActivitiesByDireccion,
  getActivitiesByDepartment,
  getActivitiesByUser,
} = activityService();

export const getResultByArea = async (id: any): Promise<number> => {
  try {
    const activities = await getActivitiesByArea(id);
    return getEficiencia(activities);
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
};

export const getResultByDireccion = async (id: any): Promise<number> => {
  try {
    const activities = await getActivitiesByDireccion(id);
    return getEficiencia(activities);
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
};

export const getResultByDepartment = async (id: any): Promise<number> => {
  try {
    const activities = await getActivitiesByDepartment(id);
    return getEficiencia(activities);
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
};

export const getResultByUser = async (id: any) => {
  try {
    const activities = await getActivitiesByUser(id);
    return getEficiencia(activities);
  } catch (error: any) {
    console.log(error.message);
  }
};
