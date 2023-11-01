import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api";

type LoginResponse = {
  success: boolean;
  message: string;
  uid: string;
  token: string;
  expired: number;
};

export const login = createAsyncThunk(
  "loginResponse/fetchLoginResponse",
  async (params: { username: string; password: string }) => {
    const response = await api.login.signIn(params);
    return response as unknown as LoginResponse;
  }
);
export const userCheck = createAsyncThunk(
  "loginResponse/fetchUserCheck",
  async () => {
    const response = await api.login.userCheck();
    return response;
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    loginState: false,
    loading: false,
    msg: "",
    error: false,
  },
  reducers: {
    logout: (state, action) => {
      if (action.payload) {
        state.loginState = false;
        state.msg = "";
        state.error = false;
        document.cookie = "hongShengToken=;";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload === undefined) return;
      const { success, message } = action.payload;
      if (success) {
        state.loginState = true;
        state.msg = message;
        const { token, expired } = action.payload;
        document.cookie = `hongShengToken=${token}; expires=${new Date(
          expired
        )};`;
      } else {
        state.loginState = false;
        state.msg = message;
        state.error = false;
      }
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
      state.error = true;
      state.loginState = false;
    });

    builder.addCase(userCheck.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userCheck.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload !== undefined) {
        const { success, message } = action.payload as LoginResponse;
        state.loginState = success;
        state.msg = message;
        state.error = false;
      }
    });
    builder.addCase(userCheck.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});
export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
