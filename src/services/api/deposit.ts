import { AppDispatch } from "../../store/store";
import { client } from "../../api";
import { IDeposit } from "../../models/IDeposit";
import { depositSlice } from "../../store/reducers/DepositSlice";
import { getLocalStorage } from "../../services/localstorage";

export const getDepositList =
  (client_id: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(depositSlice.actions.setLoading(true));

      const response = await client.post("/deposit/plansById", {
        client_id,
      });

      dispatch(depositSlice.actions.setLoading(false));
      dispatch(depositSlice.actions.setDepositList(response.data));
    } catch (e) {
      console.log("FatallError", e);
    }
  };
export const endDay = (client_id: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(depositSlice.actions.setLoading(true));

    await client.post("/deposit/endDay", {
      client_id,
    });
    const new_list = await client.post("/deposit/plansById", {
      client_id,
    });

    dispatch(depositSlice.actions.setLoading(false));
    dispatch(depositSlice.actions.setDepositList(new_list.data));
  } catch (e) {
    console.log("FatallError", e);
  }
};
export const closeDeposit =
  (client_id: number, plan_id: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(depositSlice.actions.setLoading(true));

      await client.post("/deposit/close", {
        plan_id,
      });
      const new_list = await client.post("/deposit/plansById", {
        client_id,
      });

      dispatch(depositSlice.actions.setLoading(false));
      dispatch(depositSlice.actions.setDepositList(new_list.data));
    } catch (e) {
      console.log("FatallError", e);
    }
  };
export const transferDeposit =
  (client_id: number, plan_id: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(depositSlice.actions.setLoading(true));

      await client.post("/deposit/transfer", {
        plan_id,
      });
      const new_list = await client.post("/deposit/plansById", {
        client_id,
      });

      dispatch(depositSlice.actions.setLoading(false));
      dispatch(depositSlice.actions.setDepositList(new_list.data));
    } catch (e) {
      console.log("FatallError", e);
    }
  };
export const addDepositPlan =
  (client_id: number, deposit_type_id: any, amount: any, name: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(depositSlice.actions.setLoading(true));

      await client.post("/deposit/plan", {
        client_id,
        deposit_type_id,
        amount,
        name,
      });
      const new_list = await client.post("/deposit/plansById", {
        client_id,
      });

      dispatch(depositSlice.actions.setLoading(false));
      dispatch(depositSlice.actions.setDepositList(new_list.data));
    } catch (e) {
      console.log("FatallError", e);
    }
  };
export const getDepositCurrencyList = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(depositSlice.actions.setLoading(true));

    const response = await client.get("/deposit/currency");

    dispatch(depositSlice.actions.setLoading(false));
    dispatch(depositSlice.actions.setCurrencyList(response.data));
  } catch (e) {
    console.log(e);
  }
};
export const getDepositTypesList = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(depositSlice.actions.setLoading(true));

    const response = await client.get("/deposit/types");

    dispatch(depositSlice.actions.setLoading(false));
    dispatch(depositSlice.actions.setDepositTypesList(response.data));
  } catch (e) {
    console.log(e);
  }
};
