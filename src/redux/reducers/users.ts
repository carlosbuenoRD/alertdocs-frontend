import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "@/services/users";

const {
  usersByArea,
  usersByDireccion,
  usersByDepartment,
  findAllUsers,
  handleCreateUsers,
  handleGetNotifications
} = userService();

const initialState: InitialState = {
  users: [],
  notifications: '',
  loading: false,
};

export const getUsersByArea = createAsyncThunk(
  "user/getUserByArea",
  async (id: string, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const data = await usersByArea(id);
      thunkApi.dispatch(setLoading(false));
      thunkApi.dispatch(setUsers(data));
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const getUsersByDireccion = createAsyncThunk(
  "user/getUserByDireccion",
  async (id: string, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const data = await usersByDireccion(id);
      thunkApi.dispatch(setLoading(false));
      thunkApi.dispatch(setUsers(data));
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const getUsersByDepartment = createAsyncThunk(
  "user/getUserByDepartment",
  async (id: string, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const data = await usersByDepartment(id);
      thunkApi.dispatch(setLoading(false));
      thunkApi.dispatch(setUsers(data));
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const getUsers = createAsyncThunk(
  "user/getUsers",
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

export const getNotifications = createAsyncThunk(
  "user/getNotifications",
  async (_, thunkApi) => {

    const state: any = thunkApi.getState()

    try {
      const data = await handleGetNotifications(state.auth.user._id);
      thunkApi.dispatch(setNotifications(data));
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const AddRemoveUser = createAsyncThunk(
  "user/add_remove_user",
  async (data: any, thunkApi) => {
    try {
      const res = await handleCreateUsers(data);
      return res;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => { },
});

interface InitialState {
  users: [];
  notifications: any
  loading: boolean;
}

export const { setUsers, setLoading, setNotifications } = userSlice.actions;

export default userSlice.reducer;
