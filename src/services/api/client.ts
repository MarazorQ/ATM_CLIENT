import { AppDispatch } from "../../store/store";
import { client } from "../../api";
import { registerClientSlice } from "../../store/reducers/RegisterClientSlice";
import { IClient } from "../../models/IClient";
import { getLocalStorage } from "../../services/localstorage";

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
export const addNewClient =
  (clientDto: IClient) => async (dispatch: AppDispatch) => {
    try {
      dispatch(registerClientSlice.actions.setRegisterClientLoading(true));

      const response = await client
        .post("/clients/register", {
          ...clientDto,
          id: "",
        })
        .catch(function (e) {
          console.log(e.response.data);
          dispatch(
            registerClientSlice.actions.setAlertMessage({
              status: true,
              msg: e.response.data.message,
            })
          );
        });

      dispatch(registerClientSlice.actions.setRegisterClientLoading(false));
      if (response)
        dispatch(
          registerClientSlice.actions.setAlertMessage({
            status: true,
            msg: "Клиент был успешно создан",
          })
        );
    } catch (e) {
      console.log("FatallError", e);
    }
  };
export const updateClient =
  (clientDto: IClient) => async (dispatch: AppDispatch) => {
    try {
      dispatch(registerClientSlice.actions.setRegisterClientLoading(true));

      const response = await client
        .put("/clients/update", {
          ...clientDto,
          id: Number(getLocalStorage("client_by_id")),
        })
        .catch(function (e) {
          console.log(e.response.data);
          dispatch(
            registerClientSlice.actions.setAlertMessage({
              status: true,
              msg: e.response.data.message,
            })
          );
        });

      dispatch(registerClientSlice.actions.setRegisterClientLoading(false));
      if (response)
        dispatch(
          registerClientSlice.actions.setAlertMessage({
            status: true,
            msg: "Данные клиента были успешно обновлены",
          })
        );
    } catch (e) {
      console.log("FatallError", e);
    }
  };
export const getClientist = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(registerClientSlice.actions.setLoading(true));

    const response = await client.get("/clients/list");

    dispatch(registerClientSlice.actions.setLoading(false));
    dispatch(registerClientSlice.actions.setClientList(response.data));
  } catch (e) {
    console.log(e);
  }
};
export const getClientById = (id: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(registerClientSlice.actions.setRegisterClientLoading(true));

    const response = await client.post("/clients/byId", {
      id,
    });

    dispatch(registerClientSlice.actions.setRegisterClientLoading(false));
    dispatch(registerClientSlice.actions.setClientDetails(response.data));
  } catch (e) {
    console.log("FatallError", e);
  }
};
export const deleteClient = (id: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(registerClientSlice.actions.setRegisterClientLoading(true));

    const response = await client.delete("/clients/delete", {
      data: {
        id,
      },
    });

    dispatch(registerClientSlice.actions.setRegisterClientLoading(false));
    dispatch(registerClientSlice.actions.setClientList(response.data));
  } catch (e) {
    console.log("FatallError", e);
  }
};
