import { ICity } from "../../models/IClient";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";

interface RegisterClientState {
  citys: ICity[];
  isLoading: boolean;
  error: string;
}

const initialState: RegisterClientState = {
  citys: [],
  isLoading: false,
  error: "",
};

export const registerClientSlice = createSlice({
  name: "registerClient",
  initialState,
  reducers: {
    setCitys(state, action) {
      state.citys = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

// Other code such as selectors can use the imported `RootState` type
export const isLoading = (state: RootState) => state.registerClient.isLoading;
export const citys = (state: RootState) => state.registerClient.citys;

export default registerClientSlice.reducer;
