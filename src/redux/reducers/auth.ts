import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import cookies from "js-cookie";
import authService from "@/services/auth";
import { toastConfig } from "@/utils/data";

const { signin, handleCreateUsers } = authService();

const initialState: InitialState = {
  user: cookies.get("auth") ? JSON.parse(String(cookies.get("auth"))) : null,
  loading: false,
};

export const signIn = createAsyncThunk(
  "auth/signin",
  async (info: any, thunkApi) => {
    try {
      const data = await signin(info);

      if (!data.token) {
        toast.error(data, toastConfig);
      } else {
        cookies.set("auth", JSON.stringify(data));
        thunkApi.dispatch(setAuth(data));
        toast.success("Has iniciado sesion!", toastConfig);
        return data;
      }
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
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload;
    },
    removeAuth: (state, action) => {
      cookies.remove("auth");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // Sign In
    builder.addCase(signIn.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

interface InitialState {
  user: {
    id?: string;
    _id?: string;
    name?: string;
    area?: string;
    cargo?: string;
    isAdmin: boolean;
    token: string;
  } | null;
  loading: boolean;
}

export const { setAuth, removeAuth } = authSlice.actions;

export default authSlice.reducer;
