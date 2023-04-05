import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Services
import { Activity } from "@/models";
import activityService from "@/services/activity";
import { kanbaSocket, notifySocket } from "@/sockets";
import { emptyActivity } from "@/utils/data";

const {
  getActivityById,
  getActivitiesByUser,
  changeState,
  getActivitiesByArea,
  getActivitiesByDocument,
  getActivitiesByDocumentAndArea,
  addHistory,
} = activityService();

const initialState: InitialState = {
  activities: [],
  activity: emptyActivity,
  loading: false,
};

export const fetchMyActivities = createAsyncThunk(
  "activities/myActivities",
  async (id: any, thunkApi) => {
    try {
      const data = await getActivitiesByUser(id);
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchActivityById = createAsyncThunk(
  "activities/byId",
  async (id: any, thunkApi) => {
    try {
      const data = await getActivityById(id);
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchDocumentActivities = createAsyncThunk(
  "activities/getAllByDocument",
  async (id: any, thunkApi) => {
    try {
      const data = await getActivitiesByDocument(id);
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchAreaActivities = createAsyncThunk(
  "activities/getAllByArea",
  async (id: any, thunkApi) => {
    try {
      const data = await getActivitiesByArea(id);
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchDocumentAndAreaActivities = createAsyncThunk(
  "activities/getAllByAreaAndDocument",
  async (info: any, thunkApi) => {
    try {
      const data = await getActivitiesByDocumentAndArea(
        info.document,
        info.area
      );
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const changeActivity = createAsyncThunk(
  "activities/changeState",
  async (info: any, thunkApi) => {
    try {
      const state: any = thunkApi.getState();
      await changeState(info.id, info.state);
      thunkApi.dispatch(updateActivityState(info.state));
      thunkApi.dispatch(
        fetchDocumentActivities(state.activity.activity.documentId)
      );
      kanbaSocket.emit("change activity", state.document.document);
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const addActivityHistory = createAsyncThunk(
  "activities/add-history",
  async (action: string, thunkApi) => {
    try {
      const state: any = thunkApi.getState();
      const data = await addHistory({
        action,
        userId: state.auth.user._id,
        activityId: state.activity.activity._id,
      });
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const activityslice = createSlice({
  name: "activities",
  initialState: initialState,
  reducers: {
    setActivity: (state, action) => {
      console.log("ACTION", action);
      state.activity = action.payload;
    },
    clearActivities: (state, action) => {
      state.activities = [];
    },
    updateActivityState: (state, action) => {
      state.activity = {
        ...state.activity,
        state: action.payload.state,
        startedAt: Date.now(),
        // endedAt: action.payload.state === "revision" ? Date.now() : undefined,
      };

      let nextUserInActivity =
        state.activities.findIndex((i) => i._id === state.activity._id) + 1;

      if (state.activities[nextUserInActivity]) {
        if (action.payload.state === "progress") {
          notifySocket.emit(
            "notify upcoming activity",
            state.activities[nextUserInActivity].usersId._id
          );
        }

        if (action.payload.state === "revision") {
          notifySocket.emit(
            "notify ready activity",
            state.activities[nextUserInActivity].usersId._id
          );
          notifySocket.emit("load data");
        }
      }
    },
  },
  extraReducers: (builder) => {
    // BY Id
    builder.addCase(fetchActivityById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchActivityById.fulfilled, (state, action) => {
      console.log("PAYLOAD", action.payload);
      state.loading = false;
      state.activity = action.payload;
    });
    builder.addCase(fetchActivityById.rejected, (state, action) => {
      state.loading = false;
    });

    // BY USER
    builder.addCase(fetchMyActivities.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMyActivities.fulfilled, (state, action) => {
      state.loading = false;
      state.activities = action.payload;
    });
    builder.addCase(fetchMyActivities.rejected, (state, action) => {
      state.loading = false;
    });

    // BY DOCUMENT
    builder.addCase(fetchDocumentActivities.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDocumentActivities.fulfilled, (state, action) => {
      state.loading = false;
      state.activities = action.payload;
    });
    builder.addCase(fetchDocumentActivities.rejected, (state, action) => {
      state.loading = false;
    });

    // BY AREA
    builder.addCase(fetchAreaActivities.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAreaActivities.fulfilled, (state, action) => {
      state.loading = false;
      state.activities = action.payload;
    });
    builder.addCase(fetchAreaActivities.rejected, (state, action) => {
      state.loading = false;
    });

    // BY AREA AND DOCUMENT
    builder.addCase(fetchDocumentAndAreaActivities.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchDocumentAndAreaActivities.fulfilled,
      (state, action) => {
        state.loading = false;
        state.activities = action.payload;
      }
    );
    builder.addCase(
      fetchDocumentAndAreaActivities.rejected,
      (state, action) => {
        state.loading = false;
      }
    );
  },
});

export const { setActivity, updateActivityState, clearActivities } =
  activityslice.actions;

interface InitialState {
  activities: Activity[];
  activity: Activity;
  loading: boolean;
}

// export const { finddocuments } = documentslice.actions;

export default activityslice.reducer;
