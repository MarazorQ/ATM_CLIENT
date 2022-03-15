export interface ICredit {
  id: number;
  client_id: number;
  credit_type_id: number;
  end_date: Date;
  amount: number;
  payed: number;
  acc_id_repay: number;
  acc_id_main: number;
  close_credit: boolean;
  day_count: number;
}
