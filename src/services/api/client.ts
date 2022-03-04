import { AppDispatch } from "../../store/store";
import { client } from "../../api";
import { registerClientSlice } from "../../store/reducers/RegisterClientSlice";

export const getClientCitysList = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(registerClientSlice.actions.setLoading(true));

    const response = await client.get("/clients/citys");

    dispatch(registerClientSlice.actions.setLoading(false));
    dispatch(registerClientSlice.actions.setCitys(response.data));
  } catch (e) {
    console.log(e);
  }
};
export const getClientDisabilityList = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(registerClientSlice.actions.setLoading(true));

    const response = await client.get("/clients/disabilitys");

    dispatch(registerClientSlice.actions.setLoading(false));
    dispatch(registerClientSlice.actions.setDisabilitys(response.data));
  } catch (e) {
    console.log(e);
  }
};
export const getClientMaterialStatusList =
  () => async (dispatch: AppDispatch) => {
    try {
      dispatch(registerClientSlice.actions.setLoading(true));

      const response = await client.get("/clients/material_status");

      dispatch(registerClientSlice.actions.setLoading(false));
      dispatch(registerClientSlice.actions.setMaterialStatus(response.data));
    } catch (e) {
      console.log(e);
    }
  };
export const getClientCitizenshipList = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(registerClientSlice.actions.setLoading(true));

    const response = await client.get("/clients/citizenship");

    dispatch(registerClientSlice.actions.setLoading(false));
    dispatch(registerClientSlice.actions.setCitizenship(response.data));
  } catch (e) {
    console.log(e);
  }
};
