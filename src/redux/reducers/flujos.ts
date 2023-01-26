import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import flujoService from "../../services/flujo";
import { toastConfig } from "@/utils/data";

// SERVICES
const { addFlujo, getOneFlujo, getFlujos, removeFlujo, update } =
  flujoService();

const initialState: InitialState = {
  flujos: [],
  flujo: {},
  loading: false,
  loadingFlujo: false,
  errors: null,
};

export const fetchAllFlujos = createAsyncThunk(
  "flujos/getAll",
  async (_, thunkApi) => {
    try {
      const data = await getFlujos();
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchOneFlujo = createAsyncThunk(
  "flujos/getOne",
  async (id: any, thunkApi) => {
    console.log(id, "IDIDIDID");
    try {
      const data = await getOneFlujo(id);
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const createFlujo = createAsyncThunk(
  "flujos/createOne",
  async (flujo: any, thunkApi) => {
    try {
      await addFlujo(flujo);
      toast.success("Has agregado un flujo!", toastConfig);
      thunkApi.dispatch(fetchAllFlujos());
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const updateFlujo = createAsyncThunk(
  "flujos/updateFlujo",
  async (flujo: any, thunkApi) => {
    try {
      await update(flujo, flujo.id);
      toast.success("Has actulizado un flujo!", toastConfig);
      thunkApi.dispatch(fetchAllFlujos());
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteFlujo = createAsyncThunk(
  "flujos/deleteOne",
  async (id: any, thunkApi) => {
    try {
      await removeFlujo(id);
      toast.success("Has borrado un flujo!", toastConfig);
      thunkApi.dispatch(fetchAllFlujos());
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const flujoSlice = createSlice({
  name: "flujos",
  initialState: initialState,
  reducers: {
    setFlujosList: (state, action) => {
      state.flujos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllFlujos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllFlujos.fulfilled, (state, action) => {
      state.loading = false;
      state.flujos = action.payload;
    });
    builder.addCase(fetchAllFlujos.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });

    // Get One
    builder.addCase(fetchOneFlujo.pending, (state) => {
      state.loadingFlujo = true;
    });
    builder.addCase(fetchOneFlujo.fulfilled, (state, action) => {
      state.loadingFlujo = false;
      state.flujo = action.payload;
    });
    builder.addCase(fetchOneFlujo.rejected, (state, action) => {
      state.loadingFlujo = false;
      state.errors = action.payload;
    });

    // ADD FLUJO
    builder.addCase(createFlujo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createFlujo.fulfilled, (state, action) => {
      state.loading = false;
    });
  },
});

const { setFlujosList } = flujoSlice.actions;

interface InitialState {
  flujos: any[];
  flujo: {
    _id?: string;
    activitiesSchema?: [];
    description?: string;
    participants?: [];
    areas?: [];
  };
  loading: boolean;
  loadingFlujo: boolean;
  errors: any;
}

// export const { findFlujos } = flujoSlice.actions;

export default flujoSlice.reducer;
