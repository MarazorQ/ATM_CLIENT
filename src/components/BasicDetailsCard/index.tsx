import React, {FC} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IClient } from "../../models/IClient";
import {ICredit} from '../../models/ICredit'
import {IDeposit} from '../../models/IDeposit';
import PersonIcon from '@mui/icons-material/Person';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import {saveLocalStorage, getLocalStorage} from '../../services/localstorage'
import { useNavigate } from 'react-router-dom';
import {RouteNames} from '../../router/'
import BasicTable from '../BasicDepostiTable'
import BasicCreditTable from '../BasicCreditTable'
import BasicDepositModal from '../BasicDepostiModal'
import BasicCreditModal from '../BasicCreditModal'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #007FFF;",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4
};

type BasicCardProps = {
    client: IClient,
    deposit_list: IDeposit[],
    credit_list: ICredit[]
    currency_list: [],
    deposit_types_list: [],
    credit_types_list: [],
    openDepositModal: any,
    handleOpenDepositModal: any,
    handleClickEndDay: any,
    handleClickCloseDeposit: any,
    handleClickCloseCredit: any,
    handleClickTransferDeposit: any,
    handleCloseDepositModal: any,
    handleCloseAcceptDepositModal: any,
    depType: any,
    currency: any,
    handleChangeDepSelect: any,
    handleChangeCurrencySelect: any,
    depAmount: any,
    handleChangeDepAmount: any,
    alertMsg: any,
    openResponseAlert: any,
    openCreditAlert: any,
    handleCloseCreditAlert: any,
    handleCloseAlert: any,
    payValue: any,
    handleChangePayValue: any,
    handleClickPayCredit: any,
    handleCloseCreditModal: any,
    handleCloseAcceptCreditModal: any,
    handleOpenCreditModal: any,
    openCreditModal: any,
}
 const BasicDetailsCard: FC<BasicCardProps> = ({
     client,
     deposit_list,
     credit_list,
     currency_list,
     deposit_types_list,
     credit_types_list,
     openDepositModal, 
     handleOpenDepositModal,
     handleClickEndDay,
     handleClickCloseDeposit,
     handleClickCloseCredit,
     handleClickTransferDeposit,
     handleCloseDepositModal,
     handleCloseAcceptDepositModal,
     depType,
     currency,
     handleChangeDepSelect,
     handleChangeCurrencySelect,
     depAmount,
     handleChangeDepAmount,
     alertMsg,
     openResponseAlert,
     openCreditAlert,
     handleCloseCreditAlert,
     handleCloseAlert,
     payValue,
     handleChangePayValue,
     handleClickPayCredit,
     handleCloseCreditModal,
     handleCloseAcceptCreditModal,
     handleOpenCreditModal,
     openCreditModal,
    }) => {
  const navigate = useNavigate()
  return (
    <Card sx={{ minWidth: 275 }} style={{marginBottom: "10px"}}>
      <CardContent>
      <Snackbar 
        open={openCreditAlert} 
        autoHideDuration={6000} 
        onClose={handleCloseCreditAlert}
        anchorOrigin={{
            vertical: "top",
            horizontal: "center",
            }}
        >
            <Alert onClose={handleCloseCreditAlert} severity="info" sx={{ width: '100%' }}>
                {"Pay off the loan!"}
            </Alert>
        </Snackbar>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         <PersonIcon/>
        </Typography>
        <Typography variant="h5" component="div" onClickCapture={() => saveLocalStorage('client_by_id', String(client.id))}>
          {client.first_name} | {client.last_name} | {client.third_name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {client.passport_series}{client.passport_id} | {client.inspirational_passport_number}
        </Typography>
        <Typography variant="body2">
         {client.residential_address} | {client.mobile_phone}
          <br />
          {client.email}
        </Typography>
      </CardContent>
      <CardActions>
        <Button  endIcon={<CurrencyExchangeIcon/>} onClick={()=>handleClickEndDay(client.id)}>
            end day
        </Button>
      </CardActions>
      <CardActions>
        <BasicTable 
            deposit_list={deposit_list}
            handleClickCloseDeposit={handleClickCloseDeposit}
            handleClickTransferDeposit={handleClickTransferDeposit}
        />
      </CardActions>
      <CardActions>
        <BasicCreditTable 
            credit_list={credit_list}
            handleClickCloseCredit={handleClickCloseCredit}
            handleClickTransferDeposit={handleClickTransferDeposit}
            payValue={payValue}
            handleChangePayValue={handleChangePayValue}
            handleClickPayCredit={handleClickPayCredit}
        />
      </CardActions>
      <CardActions>
        <Box style={{display: "flex", justifyContent: 'center'}}>
            <Button variant="contained" style={{marginRight: "20px"}} onClick={handleOpenDepositModal}>
                Create dep
            </Button>
            <Button variant="contained" onClick={handleOpenCreditModal}>
                Create Credit
            </Button>
        </Box>
      </CardActions>
      <BasicDepositModal 
        open={openDepositModal} 
        currency_list={currency_list}
        deposit_types_list={deposit_types_list}
        handleClose={handleCloseDepositModal}  
        handleCloseAccept={handleCloseAcceptDepositModal}
        depType={depType}
        currency={currency}
        handleChangeDepSelect={handleChangeDepSelect}
        handleChangeCurrencySelect={handleChangeCurrencySelect}
        depAmount={depAmount}
        handleChangeDepAmount={handleChangeDepAmount}
        alertMsg={alertMsg}
        openResponseAlert={openResponseAlert}
        handleCloseAlert={handleCloseAlert}
      />
      <BasicCreditModal 
        open={openCreditModal} 
        currency_list={currency_list}
        credit_types_list={credit_types_list}
        handleClose={handleCloseCreditModal}  
        handleCloseAccept={handleCloseAcceptCreditModal}
        depType={depType}
        currency={currency}
        handleChangeDepSelect={handleChangeDepSelect}
        handleChangeCurrencySelect={handleChangeCurrencySelect}
        depAmount={depAmount}
        handleChangeDepAmount={handleChangeDepAmount}
        alertMsg={alertMsg}
        openResponseAlert={openResponseAlert}
        handleCloseAlert={handleCloseAlert}
      />
    </Card>
  );
}

export default BasicDetailsCard
