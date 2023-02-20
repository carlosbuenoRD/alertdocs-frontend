import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Models
import { Report } from "@/models/reports.model";
import {
  getAllReports,
  getOneReports,
  getReportByArea,
} from "@/services/reports.service";

const initialState: InitialState = {
  reports: [],
  report: {
    _id: "",
    activities: [""],
    activitiesTime: 0,
    activitiesEficiencia: 0,
    devoluciones: [""],
    devolucionesTime: 0,
    user: "",
    areaId: "",
    direccionId: "",
    departmentId: "",
    goodActivities: [""],
    badActivities: [""],
    mediumActivities: [""],
  },
};

export const fetchReports = createAsyncThunk(
  "reports/all",
  async (_, thunkApi) => {
    try {
      const data = await getAllReports();
      thunkApi.dispatch(setReports(data));
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchOneReport = createAsyncThunk(
  "reports/one",
  async (id: string, thunkApi) => {
    try {
      const data = await getOneReports(id);
      thunkApi.dispatch(setReport(data));
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchReportByArea = createAsyncThunk(
  "reports/area",
  async (id: string, thunkApi) => {
    try {
      const data = await getReportByArea(id);
      thunkApi.dispatch(setReport(data));
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const reportslice = createSlice({
  name: "reports",
  initialState: initialState,
  reducers: {
    setReports: (state, action) => {
      state.reports = action.payload;
    },

    setReport: (state, action) => {
      state.report = action.payload;
    },
  },
});

export const { setReports, setReport } = reportslice.actions;

interface InitialState {
  reports: Report[];
  report: Report;
}

export default reportslice.reducer;
