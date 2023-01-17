import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Services
import commentService from "@/services/comment";
import { createHistoryAction } from "@/redux/reducers/history";

const {
  getCommentsByActivity,
  getCommentsByDocument,
  createComment,
  updateComment,
  removeComment,
} = commentService();

const initialState: InitialState = {
  comments: [],
  loading: false,
};

export const fetchCommentsByActivities = createAsyncThunk(
  "comments/getByActivity",
  async (_, thunkApi) => {
    try {
      const state: any = thunkApi.getState();
      const data = await getCommentsByActivity(state.activity.activity._id);
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchCommentsByDocuments = createAsyncThunk(
  "comments/getByDocument",
  async (_, thunkApi) => {
    try {
      const state: any = thunkApi.getState();
      console.log(state);

      const data = await getCommentsByDocument(state.document.document._id);
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const commentActivity = createAsyncThunk(
  "comments/create",
  async (text: string, thunkApi) => {
    try {
      const state: any = thunkApi.getState();
      await createComment({
        userId: state.auth.user._id,
        text,
        activityId: state.activity.activity._id,
        documentId: state.document.document._id,
      });
      thunkApi.dispatch(createHistoryAction("Comentario creado"));
      thunkApi.dispatch(fetchCommentsByActivities());
      return;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const updateCommentAction = createAsyncThunk(
  "comments/updateDocument",
  async (info: any, thunkApi) => {
    try {
      const data = await updateComment(info.id, info.text);
      thunkApi.dispatch(fetchCommentsByActivities());
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const removeCommentAction = createAsyncThunk(
  "comments/updateDocument",
  async (id: string, thunkApi) => {
    try {
      const data = await removeComment(id);
      thunkApi.dispatch(fetchCommentsByActivities());
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const commentSlice = createSlice({
  name: "comments",
  initialState: initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCommentsByActivities.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCommentsByActivities.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    });
    builder.addCase(fetchCommentsByActivities.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(fetchCommentsByDocuments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCommentsByDocuments.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    });
    builder.addCase(fetchCommentsByDocuments.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

interface InitialState {
  comments: any[];
  loading: boolean;
}

// export const { finddocuments } = documentslice.actions;

export default commentSlice.reducer;
