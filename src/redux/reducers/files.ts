import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Services
import filesService from "@/services/files";

const initialState: InitialState = {
  files: [],
  loading: false,
};

const { getFilesByActivity, getFilesByDocument, removeFile } = filesService();

export const fetchFilesByActivities = createAsyncThunk(
  "files/getByActivity",
  async (_, thunkApi) => {
    try {
      const state: any = thunkApi.getState();
      const data = await getFilesByActivity(state.activity.activity._id);
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchFilesByDocuments = createAsyncThunk(
  "files/getByDocument",
  async (_, thunkApi) => {
    try {
      const state: any = thunkApi.getState();

      const data = await getFilesByDocument(state.document.document._id);
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const removeFileAction = createAsyncThunk(
  "files/remove",
  async (id: string, thunkApi) => {
    try {
      const data = await removeFile(id);
      thunkApi.dispatch(fetchFilesByActivities());
      thunkApi.dispatch(fetchFilesByDocuments());
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const fileslice = createSlice({
  name: "files",
  initialState: initialState,
  reducers: {
    setfiles: (state, action) => {
      state.files = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilesByActivities.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFilesByActivities.fulfilled, (state, action) => {
      state.loading = false;
      state.files = action.payload;
    });
    builder.addCase(fetchFilesByActivities.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(fetchFilesByDocuments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFilesByDocuments.fulfilled, (state, action) => {
      state.loading = false;
      state.files = action.payload;
    });
    builder.addCase(fetchFilesByDocuments.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

interface InitialState {
  files: any[];
  loading: boolean;
}

export default fileslice.reducer;
