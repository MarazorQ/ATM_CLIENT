import { ICity } from "../../models/IClient";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";

interface RegisterClientState {
  citys: ICity[];
  disabilitys: ICity[];
  material_status: ICity[];
  citizenship: ICity[];
  isLoading: boolean;
  error: string;
}

const initialState: RegisterClientState = {
  citys: [],
  disabilitys: [],
  material_status: [],
  citizenship: [],
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
    setDisabilitys(state, action) {
      state.disabilitys = action.payload;
    },
    setMaterialStatus(state, action) {
      state.material_status = action.payload;
    },
    setCitizenship(state, action) {
      state.citizenship = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

// Other code such as selectors can use the imported `RootState` type
export const isLoading = (state: RootState) => state.registerClient.isLoading;
export const citys = (state: RootState) => state.registerClient.citys;
export const disabilitys = (state: RootState) =>
  state.registerClient.disabilitys;
export const material_status = (state: RootState) =>
  state.registerClient.material_status;
export const citizenship = (state: RootState) =>
  state.registerClient.citizenship;

export default registerClientSlice.reducer;
