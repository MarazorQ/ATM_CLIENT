import { ICredit } from "../../models/ICredit";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";

interface IRegAlert {
  status: boolean;
  msg: string;
}
interface RegisterClientState {
  creditList: ICredit[];
  creditTypesList: any;
  isLoading: boolean;
  alertMsg: IRegAlert;
  error: string;
}

const initialState: RegisterClientState = {
  creditList: [],
  creditTypesList: [],
  isLoading: false,
  alertMsg: { status: false, msg: "" },
  error: "",
};

export const creditSlice = createSlice({
  name: "credit",
  initialState,
  reducers: {
    setCreditList(state, action) {
      state.creditList = action.payload;
    },
    setCreditTypesList(state, action) {
      state.creditTypesList = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setAlertMessage(state, action) {
      state.alertMsg = action.payload;
    },
  },
});

// Other code such as selectors can use the imported `RootState` type
export const isLoading = (state: RootState) => state.creditSlice.isLoading;
export const creditList = (state: RootState) => state.creditSlice.creditList;
export const creditTypesList = (state: RootState) =>
  state.creditSlice.creditTypesList;
export const alert_msg = (state: RootState) => state.creditSlice.alertMsg;

export default creditSlice.reducer;
