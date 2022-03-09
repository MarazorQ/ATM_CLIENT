import { ICity, IClient } from "../../models/IClient";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";

interface IRegAlert {
  status: boolean;
  msg: string;
}
interface RegisterClientState {
  citys: ICity[];
  disabilitys: ICity[];
  material_status: ICity[];
  citizenship: ICity[];
  clientList: IClient[];
  clientDetails: IClient | any;
  isLoading: boolean;
  isLoadingRegClient: boolean;
  alertMsg: IRegAlert;
  error: string;
}

const initialState: RegisterClientState = {
  citys: [],
  disabilitys: [],
  material_status: [],
  citizenship: [],
  clientList: [],
  clientDetails: {},
  isLoadingRegClient: false,
  isLoading: false,
  alertMsg: { status: false, msg: "" },
  error: "",
};

export const registerClientSlice = createSlice({
  name: "registerClient",
  initialState,
  reducers: {
    setCitys(state, action) {
      state.citys = action.payload;
    },
    setDisabilitys(state, action) {
      state.disabilitys = action.payload;
    },
    setMaterialStatus(state, action) {
      state.material_status = action.payload;
    },
    setCitizenship(state, action) {
      state.citizenship = action.payload;
    },
    setClientList(state, action) {
      state.clientList = action.payload;
    },
    setClientDetails(state, action) {
      state.clientDetails = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setRegisterClientLoading(state, action) {
      state.isLoadingRegClient = action.payload;
    },
    setAlertMessage(state, action) {
      state.alertMsg = action.payload;
    },
  },
});

// Other code such as selectors can use the imported `RootState` type
export const isLoading = (state: RootState) => state.registerClient.isLoading;
export const isLoadingRegClient = (state: RootState) =>
  state.registerClient.isLoadingRegClient;
export const citys = (state: RootState) => state.registerClient.citys;
export const disabilitys = (state: RootState) =>
  state.registerClient.disabilitys;
export const clientList = (state: RootState) => state.registerClient.clientList;
export const clientDetails = (state: RootState) =>
  state.registerClient.clientDetails;
export const material_status = (state: RootState) =>
  state.registerClient.material_status;
export const citizenship = (state: RootState) =>
  state.registerClient.citizenship;
export const alert_msg = (state: RootState) => state.registerClient.alertMsg;

export default registerClientSlice.reducer;
