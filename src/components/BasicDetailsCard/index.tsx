import React, {FC} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IClient } from "../../models/IClient";
import {IDeposit} from '../../models/IDeposit';
import PersonIcon from '@mui/icons-material/Person';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import {saveLocalStorage, getLocalStorage} from '../../services/localstorage'
import { useNavigate } from 'react-router-dom';
import {RouteNames} from '../../router/'
import BasicTable from '../BasicDepostiTable'
import BasicDepositModal from '../BasicDepostiModal'

type BasicCardProps = {
    client: IClient,
    deposit_list: IDeposit[],
    currency_list: [],
    deposit_types_list: [],
    openDepositModal: any,
    handleOpenDepositModal: any,
    handleClickEndDay: any,
    handleClickCloseDeposit: any,
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
    handleCloseAlert: any
}
 const BasicDetailsCard: FC<BasicCardProps> = ({
     client,
     deposit_list,
     currency_list,
     deposit_types_list,
     openDepositModal, 
     handleOpenDepositModal,
     handleClickEndDay,
     handleClickCloseDeposit,
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
    handleCloseAlert,
    }) => {
  const navigate = useNavigate()

  return (
    <Card sx={{ minWidth: 275 }} style={{marginBottom: "10px"}}>
      <CardContent>
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
        <Box style={{display: "flex", justifyContent: 'center'}}>
            <Button variant="contained" style={{marginRight: "20px"}} onClick={handleOpenDepositModal}>
                Create dep
            </Button>
            <Button variant="contained" onClick={()=>navigate(RouteNames.CLIENT_LIST)}>
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
    </Card>
  );
}

export default BasicDetailsCard
