import React, {FC} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type BasicTableProps = {
    credit_list: any[],
}

const BasicCreditPaymentTable: FC<BasicTableProps> = ({credit_list}) =>{
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Payment Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {credit_list.map((row) => (
            <TableRow
              key={String(Math.random() + row.pay)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {String(row.date)}
              </TableCell>
              <TableCell align="right">{row.pay}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicCreditPaymentTable