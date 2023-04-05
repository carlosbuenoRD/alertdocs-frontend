import devolucionService from "@/services/devolucion";
import { notifySocket } from "@/sockets";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchActivityById, fetchDocumentActivities } from "./activity";

const {
  createDevolucion,
  getDevolucionesByActivity,
  getDevolucionesByUser,
  endDevolucion,
  getDevolucionesByArea,
  getDevolucionesByDepartment,
  getDevolucionesByDireccion,
} = devolucionService();

const initialState: InitialState = {
  devoluciones: [],
  userDevoluciones: [],
  devolucionesModal: [],
  devolucion: {},
  loading: false,
};

export const postDevolucion = createAsyncThunk(
  "devolucion/create",
  async (info: any, thunkApi) => {
    const state: any = thunkApi.getState();

    try {
      let devolucion = await createDevolucion(info);
      console.log(devolucion);
      thunkApi.dispatch(fetchActivityById(state.activity.activity._id));
      thunkApi.dispatch(
        fetchDocumentActivities(state.activity.activity.documentId)
      );
      console.log(devolucion.userTo);
      notifySocket.emit("notify devolucion created", devolucion.userTo);
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
      thunkApi.dispatch(fetchDevolucionByActivity());
      thunkApi.dispatch(
        fetchDocumentActivities(state.activity.activity.documentId)
      );

      notifySocket.emit(
        "notify devolucion ended",
        state.devolucion.devoluciones.find((i: any) => i._id === id).userFrom
          ._id
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

export const fetchDevolucionByUser = createAsyncThunk(
  "devolucion/byUser",
  async (_, thunkApi) => {
    const state: any = thunkApi.getState();
    try {
      const data = await getDevolucionesByUser(state.auth.user._id);
      thunkApi.dispatch(setUserDevoluciones(data));
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
      thunkApi.dispatch(setDevolucionesModal(data));
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
      thunkApi.dispatch(setDevolucionesModal(data));
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
      thunkApi.dispatch(setDevolucionesModal(data));
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
    setUserDevoluciones: (state, action) => {
      state.userDevoluciones = action.payload;
    },
    setDevolucionesModal: (state, action) => {
      state.devolucionesModal = action.payload;
    },
  },
});

interface InitialState {
  devoluciones: any[];
  userDevoluciones: any[];
  devolucionesModal: [];
  devolucion: {};
  loading: boolean;
}

export const { setDevoluciones, setDevolucionesModal, setUserDevoluciones } =
  devolucionSlice.actions;

export default devolucionSlice.reducer;
