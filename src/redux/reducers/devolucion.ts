import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import cookies from "js-cookie";
import devolucionService from "@/services/devolucion";
import { toastConfig } from "@/utils/data";
import { fetchActivityById, fetchDocumentActivities } from "./activity";

const {
  createDevolucion,
  getDevolucionesByActivity,
  endDevolucion,
  getDevolucionesByArea,
  getDevolucionesByDepartment,
  getDevolucionesByDireccion,
} = devolucionService();

const initialState: InitialState = {
  devoluciones: [],
  devolucion: {},
  loading: false,
};

export const postDevolucion = createAsyncThunk(
  "devolucion/create",
  async (info: any, thunkApi) => {
    const state: any = thunkApi.getState();

    try {
      await createDevolucion(info);
      thunkApi.dispatch(fetchActivityById(state.activity.activity._id));
      thunkApi.dispatch(
        fetchDocumentActivities(state.activity.activity.documentId)
      );
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const endDevoluciones = createAsyncThunk(
  "devolucion/end",
  async (id: string, thunkApi) => {
    const state: any = thunkApi.getState();

    try {
      await endDevolucion(id);
      thunkApi.dispatch(fetchActivityById(state.activity.activity._id));
      thunkApi.dispatch(
        fetchDocumentActivities(state.activity.activity.documentId)
      );
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchDevolucionByActivity = createAsyncThunk(
  "devolucion/byActivity",
  async (_, thunkApi) => {
    const state: any = thunkApi.getState();
    try {
      const data = await getDevolucionesByActivity(state.activity.activity._id);
      thunkApi.dispatch(setDevoluciones(data));
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchDevolucionByArea = createAsyncThunk(
  "devolucion/byActivity",
  async (id: string, thunkApi) => {
    const state: any = thunkApi.getState();
    try {
      const data = await getDevolucionesByArea(id);
      thunkApi.dispatch(setDevoluciones(data));
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchDevolucionByDireccion = createAsyncThunk(
  "devolucion/byActivity",
  async (id: string, thunkApi) => {
    const state: any = thunkApi.getState();
    try {
      const data = await getDevolucionesByDireccion(id);
      thunkApi.dispatch(setDevoluciones(data));
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchDevolucionByDepartment = createAsyncThunk(
  "devolucion/byActivity",
  async (id: string, thunkApi) => {
    const state: any = thunkApi.getState();
    try {
      const data = await getDevolucionesByDepartment(id);
      thunkApi.dispatch(setDevoluciones(data));
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const devolucionSlice = createSlice({
  name: "devolucion",
  initialState: initialState,
  reducers: {
    setDevoluciones: (state, action) => {
      state.devoluciones = action.payload;
    },
  },
  extraReducers: (builder) => {
    // // BY ACTIVITY
    // builder.addCase(fetchDevolucionByActivity.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(fetchDevolucionByActivity.fulfilled, (state, action) => {
    //   state.loading = false;
    //   console.log(action.payload);
    //   state.devoluciones = action.payload;
    // });
    // builder.addCase(fetchDevolucionByActivity.rejected, (state, action) => {
    //   state.loading = false;
    // });
  },
});

interface InitialState {
  devoluciones: any[];
  devolucion: {};
  loading: boolean;
}

export const { setDevoluciones } = devolucionSlice.actions;

export default devolucionSlice.reducer;