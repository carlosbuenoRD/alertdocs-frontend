import devolucionService from "@/services/devolucion";
import { notifySocket } from "@/sockets";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
      console.log(devolucion)
      thunkApi.dispatch(fetchActivityById(state.activity.activity._id));
      thunkApi.dispatch(
        fetchDocumentActivities(state.activity.activity.documentId)
      );
      console.log(devolucion.userTo)
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
    console.log(state)

    try {
      await endDevolucion(id);
      thunkApi.dispatch(fetchActivityById(state.activity.activity._id));
      thunkApi.dispatch(fetchDevolucionByActivity());
      thunkApi.dispatch(
        fetchDocumentActivities(state.activity.activity.documentId)
      );


      notifySocket.emit("notify devolucion ended", state.devolucion.devoluciones.find((i: any) => i._id === id).userFrom._id);
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
      console.log(data)
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
    setDevolucionesModal: (state, action) => {
      state.devolucionesModal = action.payload;
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
  devolucionesModal: [];
  devolucion: {};
  loading: boolean;
}

export const { setDevoluciones, setDevolucionesModal } =
  devolucionSlice.actions;

export default devolucionSlice.reducer;
