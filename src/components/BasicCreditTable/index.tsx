import React, {FC} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import {ICredit} from '../../models/ICredit'
import {saveLocalStorage, getLocalStorage} from '../../services/localstorage'
import TextField from '@mui/material/TextField';

type BasicTableProps = {
    credit_list: ICredit[],
    handleClickCloseCredit?: any,
    handleClickTransferDeposit?: any,
    payValue: any,
    handleChangePayValue: any,
    handleClickPayCredit: any
}

const BasicCreditTable: FC<BasicTableProps> = ({credit_list, handleClickCloseCredit, payValue,
    handleChangePayValue, handleClickPayCredit}) =>{

    const close = (<Button 
                    onClick={() => {handleClickCloseCredit(Number(getLocalStorage('client_by_id')),Number(getLocalStorage('credit_plan_id')))}} 
                    startIcon={<HighlightOffIcon/>}
                    ></Button>
                )
    const pay_btn = (<Button 
                        startIcon={<CreditCardIcon/>}
                        onClick={() => {handleClickPayCredit(Number(getLocalStorage('client_by_id')),Number(getLocalStorage('credit_plan_id')))}} 
                        ></Button>)
    const pay_input = (
        <TextField 
            type="number" 
            id="outlined-basic" 
            label="Amount" 
            variant="outlined"
            value={payValue}
            onChange={handleChangePayValue}
         />
    )
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Credit Plan</TableCell>
            <TableCell align="right">End date</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Payment Amount</TableCell>
            <TableCell align="right">Close credit</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">Pay</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {credit_list.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClickCapture={() =>saveLocalStorage('credit_plan_id', String(row.id))}
            >
              <TableCell component="th" scope="row">
                {row.credit_type_id === 1? "Annuity": "Differentiated"}
              </TableCell>
              <TableCell align="right">{row.end_date}</TableCell>
              <TableCell align="right">{(row.acc_id_main).toFixed(2)}</TableCell>
              <TableCell align="right" style={row.day_count === 1? {background: 'red'} : {}}>{(row.acc_id_repay).toFixed(2)}</TableCell>
              
              <TableCell align="right">{close}</TableCell>
              <TableCell align="right">{pay_input}</TableCell>
              <TableCell align="right">{pay_btn}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicCreditTable