export interface Activity {
  _id: string;

  areaId: string;

  direccionId: string;

  departmentId: string;

  description: string;

  hours: number;

  step: number;

  usersId: any;

  startedAt?: number;

  endedAt?: number;

  pauseByDevolucion?: number;

  continueByDevolucion?: number;

  devolucionTime?: number;

  documentId: string;

  flujoId: string;

  state: string;

  comments?: string[];

  files?: string[];
}
