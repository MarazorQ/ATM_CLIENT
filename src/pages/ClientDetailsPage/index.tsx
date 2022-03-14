import React, {FC} from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import BasicDetailsCard from '../../components/BasicDetailsCard'
import {getClientById} from '../../services/api/client'
import {
  getDepositList, 
  endDay, 
  closeDeposit, 
  addDepositPlan,
  transferDeposit, 
  getDepositTypesList,
  getDepositCurrencyList} from '../../services/api/deposit'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {clientDetails, isLoadingRegClient} from '../../store/reducers/RegisterClientSlice'
import {
  depositList, 
  currencyList, 
  isLoading, 
  depositSlice, 
  depositTypesList} from '../../store/reducers/DepositSlice'
import { useNavigate } from 'react-router-dom';
import {RouteNames} from '../../router'
import {deleteClient} from '../../services/api/client'
import {saveLocalStorage, getLocalStorage} from '../../services/localstorage'
import { client } from '../../api';

const ClientDetailsPage:FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch()

  const client_details = useAppSelector(clientDetails)
  const deposit_list = useAppSelector(depositList)
  const currency_list = useAppSelector(currencyList)
  const deposit_types_list = useAppSelector(depositTypesList)
  const is_loading_deposit_list = useAppSelector(isLoading)
  const is_load_client_details = useAppSelector(isLoadingRegClient)

  const [openResponseAlert, setResponseAlert] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState("")
 
  const [openDepositModal, setOpenDepositModal] = React.useState(false);

  const [depAmount, setDepAmount] = React.useState('');

  const [depType, setDepType] = React.useState('');
  const [currency, setCurrency] = React.useState('');

  const handleChangeDepSelect = (event: any) => {
    setDepType(event.target.value);
  };
  const handleChangeCurrencySelect = (event: any) => {
    setCurrency(event.target.value);
  };

  const handleOpenDepositModal = (id: number) => {
    // saveLocalStorage('client_id', String(id))
    setOpenDepositModal(true)
  };

  const handleChangeDepAmount = (event: any) =>{
    setDepAmount(event.target.value)
  }

  const handleCloseDepositModal = () => {
    setOpenDepositModal(false)
    setDepType('')
    setCurrency('')
    setDepAmount('')
    setAlertMsg('')
  };
  const handleCloseAcceptDepositModal = () => {
    if(!depType || !depAmount || !currency ){
      setResponseAlert(true);
      setAlertMsg("Fill out the forms") 
    }else if(Number(depAmount) < 100){
      setAlertMsg("deposit amount cannot be 0") 
      setResponseAlert(true);
    }else{
      dispatch(addDepositPlan(
        Number(getLocalStorage('client_by_id')), 
        depType, 
        depAmount, 
        "Shkuratov Artem Oleg"))
        setDepType('')
        setCurrency('')
        setDepAmount('')
        setAlertMsg('')
      setOpenDepositModal(false);
    }
  }

  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setResponseAlert(false);
  };
  
  const handleClickEndDay = (id: number) => {
    dispatch(endDay(id))
  }
  const handleClickCloseDeposit = (client_id: number, plan_id: number) => {
    dispatch(closeDeposit(client_id, plan_id))
  }
  const handleClickTransferDeposit = (client_id: number, plan_id: number) => {
    dispatch(transferDeposit(client_id, plan_id))
  }
  const handleClickRegClient = () => navigate(RouteNames.REGISTER_CLIENT)

  React.useEffect(() => {
    dispatch(getClientById(Number(getLocalStorage('client_by_id'))))
    dispatch(getDepositList(Number(getLocalStorage('client_by_id'))))
    dispatch(getDepositCurrencyList())
    dispatch(getDepositTypesList())

    return function clean(){
      dispatch(depositSlice.actions.setDepositList([]));
      dispatch(depositSlice.actions.setCurrencyList([]));
      dispatch(depositSlice.actions.setDepositTypesList([]));
    }
  }, [])

  return (
    <div>
     {is_load_client_details
        ?
          <LinearProgress/>
        :
          <BasicDetailsCard 
            client={client_details} 
            deposit_list={deposit_list}
            currency_list={currency_list}
            deposit_types_list={deposit_types_list}
            handleOpenDepositModal={handleOpenDepositModal}
            handleCloseDepositModal={handleCloseDepositModal}
            handleClickEndDay={handleClickEndDay}
            handleClickCloseDeposit={handleClickCloseDeposit}
            handleCloseAcceptDepositModal={handleCloseAcceptDepositModal}
            handleClickTransferDeposit={handleClickTransferDeposit}
            openDepositModal={openDepositModal}
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
      }
    </div>
  );
}

export default ClientDetailsPage;
