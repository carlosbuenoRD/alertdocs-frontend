import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import areaService from "@/services/area";

const service = areaService();

const initialState: InitialState = {
  areas: [],
  direcciones: [],
  departments: [],
  area: null,
  direccion: null,
  department: null,
};

export const getAreas = createAsyncThunk(
  "area/getAreas",
  async (_, thunkApi) => {
    const state: any = thunkApi.getState();
    if (state.areas) return;
    try {
      const data = await service.getAreas();

      thunkApi.dispatch(setAreas(data));
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const getDirecciones = createAsyncThunk(
  "area/getDirecciones",
  async (id: string, thunkApi) => {
    try {
      const data = await service.getDirecciones(id);

      thunkApi.dispatch(setDirecciones(data));
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const getDepartments = createAsyncThunk(
  "area/getDepartments",
  async (id: string, thunkApi) => {
    try {
      const data = await service.getDepartments(id);

      thunkApi.dispatch(setDepartments(data));
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const getArea = createAsyncThunk(
  "area/getArea",
  async (id: string, thunkApi) => {
    const state: any = thunkApi.getState();
    if (state.area._id === id) return;
    try {
      const data = await service.getArea(id);

      thunkApi.dispatch(setArea(data));
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const getDireccion = createAsyncThunk(
  "area/getDireccion",
  async (id: string, thunkApi) => {
    const state: any = thunkApi.getState();
    if (state.area._id === id) return;
    try {
      const data = await service.getDireccion(id);

      thunkApi.dispatch(setDireccion(data));
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);
export const getDepartment = createAsyncThunk(
  "area/getDepartment",
  async (id: string, thunkApi) => {
    const state: any = thunkApi.getState();
    if (state.area._id === id) return;
    try {
      const data = await service.getDeparment(id);

      thunkApi.dispatch(setDepartment(data));
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const areaSlice = createSlice({
  name: "area",
  initialState: initialState,
  reducers: {
    setAreas: (state, { payload }) => {
      state.areas = payload;
    },
    setDirecciones: (state, { payload }) => {
      state.direcciones = payload;
    },
    setDepartments: (state, { payload }) => {
      state.departments = payload;
    },
    setArea: (state, { payload }) => {
      state.area = payload;
    },
    setDireccion: (state, { payload }) => {
      state.direccion = payload;
    },
    setDepartment: (state, { payload }) => {
      state.department = payload;
    },
  },
  extraReducers: (builder) => {},
});

interface InitialState {
  areas: any[];
  direcciones: any[];
  departments: any[];
  area: any;
  direccion: any;
  department: any;
}
export const {
  setAreas,
  setDirecciones,
  setDepartments,
  setArea,
  setDepartment,
  setDireccion,
} = areaSlice.actions;

export default areaSlice.reducer;
