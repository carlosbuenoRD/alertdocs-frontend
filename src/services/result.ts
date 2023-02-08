import { getEficiencia } from "@/utils/formula";
import activityService from "@/services/activity";

const {
  getActivitiesByArea,
  getActivitiesByDireccion,
  getActivitiesByDepartment,
  getActivitiesByUser,
  getActivitiesByUserAndFlujo,
  getActivitiesByAreaAndFlujo,
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

export const getResultByUserAndFlujo = async (flujo: any, user: any) => {
  try {
    const activities = await getActivitiesByUserAndFlujo(flujo, user);
    return getEficiencia(activities);
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getResultByAreaAndFlujo = async (flujo: any, area: any) => {
  try {
    const activities = await getActivitiesByAreaAndFlujo(flujo, area);
    return getEficiencia(activities);
  } catch (error: any) {
    console.log(error.message);
  }
};
