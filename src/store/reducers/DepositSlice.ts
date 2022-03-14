import { IDeposit } from "../../models/IDeposit";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";

interface IRegAlert {
  status: boolean;
  msg: string;
}
interface RegisterClientState {
  depositList: IDeposit[];
  currencyList: any;
  depositTypesList: any;
  isLoading: boolean;
  alertMsg: IRegAlert;
  error: string;
}

const initialState: RegisterClientState = {
  depositList: [],
  currencyList: [],
  depositTypesList: [],
  isLoading: false,
  alertMsg: { status: false, msg: "" },
  error: "",
};

export const depositSlice = createSlice({
  name: "deposit",
  initialState,
  reducers: {
    setDepositList(state, action) {
      state.depositList = action.payload;
    },
    setCurrencyList(state, action) {
      state.currencyList = action.payload;
    },
    setDepositTypesList(state, action) {
      state.depositTypesList = action.payload;
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
export const isLoading = (state: RootState) => state.depositSlice.isLoading;
export const depositList = (state: RootState) => state.depositSlice.depositList;
export const currencyList = (state: RootState) =>
  state.depositSlice.currencyList;
export const depositTypesList = (state: RootState) =>
  state.depositSlice.depositTypesList;
export const alert_msg = (state: RootState) => state.depositSlice.alertMsg;

export default depositSlice.reducer;
