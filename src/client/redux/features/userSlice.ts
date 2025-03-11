import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  currentUser: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  status: "idle",
  error: null,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: number) => {
    const response = await axios.get(`/api/users/${userId}`);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.status = "idle";
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;
