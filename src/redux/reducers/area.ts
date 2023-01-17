import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import areaService from "@/services/area";

const service = areaService();

const initialState: InitialState = {
  areas: [],
};

export const getAreas = createAsyncThunk(
  "area/getAreas",
  async (_, thunkApi) => {
    const state: any = thunkApi.getState();
    if (state.areas) return;
    try {
      const data = await service.getAreas();
      console.log(data);

      thunkApi.dispatch(setAreas(data));
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
  },
  extraReducers: (builder) => {},
});

interface InitialState {
  areas: any[];
}

export const { setAreas } = areaSlice.actions;

export default areaSlice.reducer;
