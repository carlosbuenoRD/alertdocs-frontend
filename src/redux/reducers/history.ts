import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Services
import historyService from "@/services/history";

const initialState: InitialState = {
  histories: [],
  loading: false,
};

const { getHistoryByActivity, getHistoryByDocument, createHistory } =
  historyService();

export const fetchHistoryByActivities = createAsyncThunk(
  "history/getByActivity",
  async (_, thunkApi) => {
    try {
      const state: any = thunkApi.getState();
      if (state.activity.activity._id) {
        const data = await getHistoryByActivity(state.activity.activity._id);
        return data;
      }
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchHistoryByDocuments = createAsyncThunk(
  "history/getByDocument",
  async (_, thunkApi) => {
    try {
      const state: any = thunkApi.getState();

      const data = await getHistoryByDocument(state.document.document._id);
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const createHistoryAction = createAsyncThunk(
  "history/create",
  async (action: string, thunkApi) => {
    try {
      const state: any = thunkApi.getState();

      const res = await createHistory({
        action,
        userId: state.auth.user._id,
        activityId: state.activity.activity._id,
        documentId: state.document.document._id,
        step: state.activity.activity.step,
      });

      thunkApi.dispatch(fetchHistoryByActivities());
      thunkApi.dispatch(fetchHistoryByDocuments());
      return res;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const historyslice = createSlice({
  name: "History",
  initialState: initialState,
  reducers: {
    setHistory: (state, action) => {
      state.histories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHistoryByActivities.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchHistoryByActivities.fulfilled, (state, action) => {
      state.loading = false;
      state.histories = action.payload;
    });
    builder.addCase(fetchHistoryByActivities.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(fetchHistoryByDocuments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchHistoryByDocuments.fulfilled, (state, action) => {
      state.loading = false;
      state.histories = action.payload;
    });
    builder.addCase(fetchHistoryByDocuments.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

interface InitialState {
  histories: any;
  loading: boolean;
}

export default historyslice.reducer;
