import { AppDispatch } from "../../store/store";
import { client } from "../../api";
import { registerClientSlice } from "../../store/reducers/RegisterClientSlice";

export const getClientCitysList = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(registerClientSlice.actions.setLoading(true));

    const response = await client.get("/analytics/analyze");

    dispatch(registerClientSlice.actions.setLoading(false));
    dispatch(registerClientSlice.actions.setCitys(response.data.data));
  } catch (e) {
    console.log(e);
  }
};
