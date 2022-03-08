import React, {FC} from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import BasicCard from "../../components/BasicCard"
import BasicModal from "../../components/BasicModal"
import {getClientist} from '../../services/api/client'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {clientList, isLoading} from '../../store/reducers/RegisterClientSlice'

const  ClientsList:FC = () => {
  const dispatch = useAppDispatch()

  const client_list = useAppSelector(clientList)
  const is_load_list = useAppSelector(isLoading)

  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);


  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  React.useEffect(() => {
    dispatch(getClientist())
  }, [])

  return (
    <div>
      <BasicModal open={openDeleteModal} handleClose={handleCloseDeleteModal}/>
      {is_load_list
        ?
          <LinearProgress/>
        :
          client_list.map((client)=>(<BasicCard client={client} deleteClient={handleOpenDeleteModal}/>))
      }
    </div>
  );
}

export default ClientsList;
