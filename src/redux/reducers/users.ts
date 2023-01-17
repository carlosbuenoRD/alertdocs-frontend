import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "@/services/users";

const { usersByArea, findAllUsers, handleCreateUsers } = userService();

const initialState: InitialState = {
  users: [],
  loading: false,
};

export const getUsersByArea = createAsyncThunk(
  "auth/getUserByArea",
  async (id: any, thunkApi) => {
    try {
      const data = await usersByArea(id);
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const getUsers = createAsyncThunk(
  "auth/getUsers",
  async (_, thunkApi) => {
    try {
      const data = await findAllUsers();
      thunkApi.dispatch(setUsers(data));
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const AddRemoveUser = createAsyncThunk(
  "auth/add_remove_user",
  async (data: any, thunkApi) => {
    try {
      const res = await handleCreateUsers(data);
      return res;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch by area
    builder.addCase(getUsersByArea.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

interface InitialState {
  users: [];
  loading: boolean;
}

export const { setUsers } = authSlice.actions;

export default authSlice.reducer;
