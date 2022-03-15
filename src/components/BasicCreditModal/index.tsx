import React, {FC} from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import BasicCreditPaymentTable from '../BasicCreditPaymentTable'
import {calculateAnnuity} from '../../helper/creditCalculateHalper'

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
  p: 4,
};

type BasicModalProps = {
    open: any,
    currency_list: [],
    credit_types_list: [],
    handleClose: any,
    handleCloseAccept: any,
    depType: any,
    currency: any,
    handleChangeDepSelect: any
    handleChangeCurrencySelect: any
    depAmount: any,
    handleChangeDepAmount: any,
    alertMsg: any
    openResponseAlert: any,
    handleCloseAlert: any,
}

const BasicCreditModal: FC<BasicModalProps> = ({
    open, 
    handleClose, 
    handleCloseAccept, 
    currency_list, 
    depType,
    currency,
    handleChangeDepSelect,
    handleChangeCurrencySelect,
    depAmount,
    handleChangeDepAmount,
    alertMsg,
    openResponseAlert,
    handleCloseAlert,
    credit_types_list}) => {
  return (
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Snackbar 
                    open={openResponseAlert} 
                    autoHideDuration={6000} 
                    onClose={handleCloseAlert}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                >
                    <Alert onClose={handleCloseAlert} severity="info" sx={{ width: '100%' }}>
                        {alertMsg}
                    </Alert>
                </Snackbar>
        <Box
            sx={{
                width: 500,
                maxWidth: '100%',
            }}
            style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
        >
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel id="demo-simple-select-label">Credit plan</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={depType}
                    label="Credit plan"
                    onChange={handleChangeDepSelect}
                >
                    { credit_types_list.map((type: any) => (<MenuItem value={type.id}>{type.name}</MenuItem>))}
                </Select>
            </FormControl>
            <Box sx={{ marginBottom: 2 }}>
                {depType === ''? null : (depType == '1'? '-on 365 days - 0.05% per year - annuity' : "-on 365 days - 0.05% per year - differentiated")}
            </Box>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currency}
                    label="Currency"
                    onChange={handleChangeCurrencySelect}
                >   
                { currency_list.map((currency: any) => (<MenuItem value={currency.id}>{currency.name}</MenuItem>))}
                </Select>
            </FormControl>
            <TextField 
                type="number" 
                id="outlined-basic" 
                label="Amount" 
                variant="outlined"
                value={depAmount}
                onChange={handleChangeDepAmount}
                style={{marginBottom: "20px"}}
                fullWidth />
        </Box>
        {depAmount && depType ?(
             <Box style={{overflow: "scroll", height: "200px", marginBottom: "20px"}}>
             <BasicCreditPaymentTable credit_list={calculateAnnuity(depAmount, depType)}/>
            </Box>
        ): null}
          <div  
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "20px"
            }}
          >
            <Button onClick={handleCloseAccept} style={{ marginRight: "30px" }}>
                Create
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </div>
        </Box>
      </Modal>
  );
}
export default BasicCreditModal
