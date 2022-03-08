import React, {FC} from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import BasicCard from "../../components/BasicCard"
import BasicModal from "../../components/BasicModal"
import {getClientist} from '../../services/api/client'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {clientList, isLoading} from '../../store/reducers/RegisterClientSlice'
import { useNavigate } from 'react-router-dom';
import {RouteNames} from '../../router'
import {deleteClient} from '../../services/api/client'
import {saveLocalStorage, getLocalStorage} from '../../services/localstorage'

const  ClientsList:FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch()

  const client_list = useAppSelector(clientList)
  const is_load_list = useAppSelector(isLoading)

  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

  const handleOpenDeleteModal = (id: number) => {
    saveLocalStorage('client_id', String(id))
    setOpenDeleteModal(true)
  };

  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleCloseAcceptDeleteModal = (id: number) => {
    dispatch(deleteClient(Number(getLocalStorage('client_id'))))
    setOpenDeleteModal(false);
  }
  
  const handleClickRegClient = () => navigate(RouteNames.REGISTER_CLIENT)

  React.useEffect(() => {
    dispatch(getClientist())
  }, [])

  return (
    <div>
      <BasicModal 
        open={openDeleteModal} 
        handleClose={handleCloseDeleteModal} 
        handleCloseAccept={handleCloseAcceptDeleteModal}
      />
      {is_load_list
        ?
          <LinearProgress/>
        :
          (
            client_list.length > 0
              ?
                client_list.map((client)=>(<BasicCard key={client.id} client={client} deleteClient={handleOpenDeleteModal}/>))
              :
                <div style={{justifyContent: 'center', textAlign: 'center'}}>
                    <Typography variant="h5" component="div" style={{paddingBottom: "30px"}}>
                      На данный момент в системе нет ни одного клиента. 
                    </Typography>
                    <Button variant="contained" style={{width: "40%"}} onClick={handleClickRegClient}>
                        Зарегестрировать клиента
                    </Button>
                </div>
          )
      }
    </div>
  );
}

export default ClientsList;
