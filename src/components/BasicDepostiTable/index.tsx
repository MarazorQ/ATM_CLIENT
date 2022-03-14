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
import {IDeposit} from '../../models/IDeposit';
import {saveLocalStorage, getLocalStorage} from '../../services/localstorage'

type BasicTableProps = {
    deposit_list: IDeposit[],
    handleClickCloseDeposit: any,
    handleClickTransferDeposit: any,
}

const BasicTable: FC<BasicTableProps> = ({deposit_list, handleClickCloseDeposit, handleClickTransferDeposit}) =>{
    const close = (<Button 
                    onClick={() => {handleClickCloseDeposit(Number(getLocalStorage('client_by_id')),Number(getLocalStorage('deposit_plan_id')))}} 
                    startIcon={<HighlightOffIcon/>}
                    ></Button>
                )
    const transfer = (<Button 
                        startIcon={<MoveUpIcon/>}
                        onClick={() => {handleClickTransferDeposit(Number(getLocalStorage('client_by_id')),Number(getLocalStorage('deposit_plan_id')))}} 
                        ></Button>)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Deposit Plan</TableCell>
            <TableCell align="right">End date</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Accumulated Amount</TableCell>
            <TableCell align="right">Close deposit</TableCell>
            <TableCell align="right">Transfer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deposit_list.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClickCapture={() =>saveLocalStorage('deposit_plan_id', String(row.id))}
            >
              <TableCell component="th" scope="row">
                {row.deposit_type_id === 1? "Revocable": "Irrevocable"}
              </TableCell>
              <TableCell align="right">{row.end_date}</TableCell>
              <TableCell align="right">{(row.acc_id_main).toFixed(2)}</TableCell>
              <TableCell align="right">{(row.acc_id_percent).toFixed(2)}</TableCell>
              
              <TableCell align="right">{close}</TableCell>
              <TableCell align="right">{row.deposit_type_id === 1 ? transfer : null}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicTable