import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "@/services/users";

const {
  usersByArea,
  usersByDireccion,
  usersByDepartment,
  findAllUsers,
  handleCreateUsers,
} = userService();

const initialState: InitialState = {
  users: [],
  loading: false,
};

export const getUsersByArea = createAsyncThunk(
  "auth/getUserByArea",
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
  "auth/getUserByDireccion",
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
  "auth/getUserByDepartment",
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

interface InitialState {
  users: [];
  loading: boolean;
}

export const { setUsers, setLoading } = authSlice.actions;

export default authSlice.reducer;
