import { AppDispatch } from "../../store/store";
import { client } from "../../api";
import { creditSlice } from "../../store/reducers/CreditSlice";
import { getLocalStorage } from "../../services/localstorage";

export const getCreditList =
  (client_id: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(creditSlice.actions.setLoading(true));

      const response = await client.post("/credit/plansById", {
        client_id,
      });

      dispatch(creditSlice.actions.setLoading(false));
      dispatch(creditSlice.actions.setCreditList(response.data));
    } catch (e) {
      console.log("FatallError", e);
    }
  };
export const endCreditDay =
  (client_id: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(creditSlice.actions.setLoading(true));

      await client.post("/credit/endDay", {
        client_id,
      });
      const new_list = await client.post("/credit/plansById", {
        client_id,
      });

      dispatch(creditSlice.actions.setLoading(false));
      dispatch(creditSlice.actions.setCreditList(new_list.data));
    } catch (e) {
      console.log("FatallError", e);
    }
  };
export const closeCredit =
  (client_id: number, plan_id: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(creditSlice.actions.setLoading(true));

      await client.post("/credit/close", {
        plan_id,
      });
      const new_list = await client.post("/credit/plansById", {
        client_id,
      });

      dispatch(creditSlice.actions.setLoading(false));
      dispatch(creditSlice.actions.setCreditList(new_list.data));
    } catch (e) {
      console.log("FatallError", e);
    }
  };
export const payCredit =
  (plan_id: number, amount: number, client_id: number) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(creditSlice.actions.setLoading(true));

      await client.post("/credit/pay", {
        plan_id,
        amount,
      });
      const new_list = await client.post("/credit/plansById", {
        client_id,
      });

      dispatch(creditSlice.actions.setLoading(false));
      dispatch(creditSlice.actions.setCreditList(new_list.data));
    } catch (e) {
      console.log("FatallError", e);
    }
  };
export const addCreditPlan =
  (client_id: number, credit_type_id: any, amount: any) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(creditSlice.actions.setLoading(true));

      await client.post("/credit/plan", {
        client_id,
        credit_type_id,
        amount,
        name: "Client",
      });
      const new_list = await client.post("/credit/plansById", {
        client_id,
      });

      dispatch(creditSlice.actions.setLoading(false));
      dispatch(creditSlice.actions.setCreditList(new_list.data));
    } catch (e) {
      console.log("FatallError", e);
    }
  };
export const getCreditTypesList = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(creditSlice.actions.setLoading(true));

    const response = await client.get("/credit/types");

    dispatch(creditSlice.actions.setLoading(false));
    dispatch(creditSlice.actions.setCreditTypesList(response.data));
  } catch (e) {
    console.log(e);
  }
};
