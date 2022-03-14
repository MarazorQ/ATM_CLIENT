export interface IDeposit {
  id: number;
  client_id: number;
  deposit_type_id: number;
  end_date: Date;
  amount: number;
  acc_id_percent: number;
  acc_id_main: number;
  close_depostin: boolean;
}
