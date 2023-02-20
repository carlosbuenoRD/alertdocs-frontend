export interface Report {
  _id: string;
  activities: string[];
  activitiesTime: number;
  activitiesEficiencia: number;
  devoluciones: string[];
  devolucionesTime: number;
  user: any | string;
  areaId: any | string;
  direccionId: any | string;
  departmentId: any | string;
  goodActivities: string[];
  badActivities: string[];
  mediumActivities: string[];
}
