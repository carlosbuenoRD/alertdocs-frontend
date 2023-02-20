import activityService from "@/services/activity";
import devolucionesService from "@/services/devolucion";

const { getActivitiesByUser } = activityService();
const { getDevolucionesByActivity } = devolucionesService();

const getHours = (time: number) => {
  let seconds = Math.round(time / 1000);
  let minutes = Math.round(seconds / 60);
  let hours = Number(minutes / 60);

  return hours;
};

export const getEficiencia = (activities: any[]) => {
  let results: number[] = [];
  let resultado: number;
  activities?.forEach(async (i) => {
    if (i.startedAt) {
      if (!i.pauseByDevolucion) {
        let time = getHours((i.endedAt || Date.now()) - i.startedAt);
        let wanted = i.hours;
        let devolucion = getHours(i.devolucionTime);
        resultado = ((wanted - time - devolucion) / wanted + 1) * 100;
      } else {
        let time = getHours(
          (i.endedAt || Date.now()) -
            (i.startedAt + (i.continueByDevolucion - i.pauseByDevolucion))
        );
        let wanted = i.hours;
        let devolucion = getHours(i.devolucionTime);
        resultado = ((wanted - time - devolucion) / wanted + 1) * 100;
      }

      results.push(resultado);
    }
  });

  return results.reduce((acc, curr) => acc + curr, 0) / results.length;
};

export const getUserEficiencia = async (id: string) => {
  return getEficiencia(await getUserActivities(id));
};

const getUserActivities = async (id: string) => {
  const activities = await getActivitiesByUser(id);

  return activities;
};
