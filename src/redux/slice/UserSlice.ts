import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import axios, { AxiosResponse } from "axios";

interface User {
  id: string;
  email: string;
  name: string;
  cart:[];
  imageUrl: string | null;
}
export interface UserSliceProps {
  loading: boolean | null;
  email: string;
  name: string;
  certification_status: boolean | null;
  imageUrl: string | null;
  cart:[]
}

const initialState: UserSliceProps = {
  loading: null,
  email: "",
  name: "",
  imageUrl: "",
  certification_status: null,
  cart:[]
};
interface FetchUserError {
  message: string;
}

export const fetchUserData = createAsyncThunk<
  User,
  string,
  { rejectValue: FetchUserError }
>("user/fetchUserData", async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<User> = await axiosClient.get(
      "/customer-info"
    );

    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data || error.message,
      });
    }
    return rejectWithValue({ message: "An unknown error occurred" });
  }
});

const userSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.email = "";
      state.name = "";
      state.imageUrl = "";
      state.cart = [];

     },
    setUserInfo: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.imageUrl = action.payload.imageUrl;
      state.cart = action.payload.cart;
     },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.imageUrl = action.payload.imageUrl;
        state.cart = action.payload.cart
       })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        console.error("Failed to fetch user data:", action.payload);
      });
  },
});

export const { userLogout, setUserInfo } = userSlice.actions;
export default userSlice.reducer;
