import React, {FC} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import {IClient} from '../../models/IClient'

import { useForm, Controller, useFormState, SubmitHandler } from "react-hook-form";

import {
    getClientCitysList, 
    getClientDisabilityList, 
    getClientMaterialStatusList, 
    getClientCitizenshipList, 
    addNewClient} from '../../services/api/client'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
    citys, 
    disabilitys, 
    citizenship, 
    material_status, 
    isLoading, 
    isLoadingRegClient, 
    alert_msg, 
    registerClientSlice} from "../../store/reducers/RegisterClientSlice"
import {
    loginValidation, 
    emailValidation, 
    dateValidation} from '../../helper/clientValidationHelper'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const  RegisterClient:FC = () => {
    const [openResponseAlert, setResponseAlert] = React.useState(false);
    const [alertMsg, setAlertMsg] = React.useState("")

    const dispatch = useAppDispatch()

    const all_citys = useAppSelector(citys)
    const all_disabilitys = useAppSelector(disabilitys)
    const material_status_list = useAppSelector(material_status)
    const citizenship_list = useAppSelector(citizenship)
    const is_load_selects = useAppSelector(isLoading)
    const is_load_reg_response = useAppSelector(isLoadingRegClient)
    const response_alert_msg = useAppSelector(alert_msg)

    const { handleSubmit, control, register, reset } = useForm<IClient>({
        defaultValues: { 
            date_of_issue_of_the_passport: '',
            date_born: ''
        }
    });
    const { errors } = useFormState({ 
      control
    })

  const handleClickRegister: SubmitHandler<IClient> = 
    async (client: IClient) => {
      try {
    //    console.log(client)
       dispatch(addNewClient(client))
    //    reset({
    //     first_name: "",
    //     last_name: "",
    //     third_name: "",
    //     date_born: null,
    //     sex: "",
    //     passport_series: "",
    //     passport_id: "",
    //     who_issued_the_passport: "",
    //     date_of_issue_of_the_passport: null,
    //     inspirational_passport_number: "",
    //     place_of_birth: "",
    //     city_of_residence: "",
    //     residential_address: "",
    //     mobile_phone: "",
    //     home_phone: "",
    //     email: "",
    //     work_place: "",
    //     position: "",
    //     place_of_registration: "",
    //     address_of_residence: "",
    //     marital_status: "",
    //     citizenship: "",
    //     disability: "",
    //     retiree: "",
    //     salary: "",
    //     liable_for_military_service: ""
    //    })
      } catch (e) {
        console.log(e);
      }
    }
    const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setResponseAlert(false);
      };
  
  React.useEffect(()=>{
    if(response_alert_msg.status) {
        setResponseAlert(true);
        setAlertMsg(response_alert_msg.msg)
        dispatch(
            registerClientSlice.actions.setAlertMessage({
              status: false,
              msg: "",
            })
          );
    }
  }, [response_alert_msg])

  React.useEffect(()=>{
    dispatch(getClientCitysList())
    dispatch(getClientDisabilityList())
    dispatch(getClientMaterialStatusList())
    dispatch(getClientCitizenshipList())
  }, [])
  
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
        {is_load_selects 
            ? 
            ( <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>)
            : 
        (<FormControl>
                <Box
                sx={{
                    width: 500,
                    maxWidth: '100%',
                }}
                >
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
                    
                    <Controller
                    name={"last_name"}
                    control={control}
                    rules={loginValidation}
                    render={({field: {onChange, value}}) => (
                        <TextField
                        label="??????????????"
                        type="text"
                        value={value}
                        onChange={onChange}
                        error={!!errors.last_name?.message}
                        helperText={ errors?.last_name?.message }
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        />
                        )}
                    />
                    <Controller
                    name={"first_name"}
                    control={control}
                    rules={loginValidation}
                    render={({field: {onChange, value}}) => (
                        <TextField
                        label="??????"
                        type="text"
                        value={value}
                        onChange={onChange}
                        error={!!errors.first_name?.message}
                        helperText={ errors?.first_name?.message }
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        />
                        )}
                    />
                    <Controller
                    name={"third_name"}
                    control={control}
                    rules={{required: '?????????????????????? ?????? ????????????????????!'}}
                    render={({field: {onChange, value}}) => (
                        <TextField
                        label="????????????????"
                        type="text"
                        value={value}
                        onChange={onChange}
                        error={!!errors.third_name?.message}
                        helperText={ errors?.third_name?.message }
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        />
                        )}
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Controller
                            name={"date_born"}
                            control={control}
                            rules={dateValidation}
                            render={({field}) => (
                                <DatePicker
                                label="???????? ????????????????"
                                {...field}
                                renderInput={(params) => <TextField 
                                                        {...params} 
                                                        fullWidth 
                                                        sx={{ marginBottom: 2 }}
                                                        error={!!errors.date_born?.message}
                                                        helperText={ errors?.date_born?.message }
                                                        />}
                                />
                                )}
                            />
                    </LocalizationProvider>
                    
                    <Box style={{display: 'flex', justifyContent: 'center'}} sx={{ marginBottom: 2 }}>
                        <FormControl error={!!errors.sex?.message}>
                            <FormLabel id="demo-controlled-radio-buttons-group" component="legend">??????</FormLabel>
                            <Controller
                            name={"sex"}
                            control={control}
                            rules={{required: '?????????????????????? ?????? ????????????????????!'}}
                            render={({field}) => (
                                <RadioGroup
                                row
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                {...field}
                            >
                                    <FormControlLabel value="female" control={<Radio />} label="??????????????" />
                                    <FormControlLabel value="male" control={<Radio />} label="??????????????" />
                                </RadioGroup>
                            )}
                            />
                            <FormHelperText>{errors?.sex?.message}</FormHelperText>
                        </FormControl>
                    </Box>
                    
                    <Controller
                    name={"passport_series"}
                    control={control}
                    rules={{required: '?????????????????????? ?????? ????????????????????!'}}
                    render={({field: {onChange, value}}) => (
                        <TextField
                        label="?????????? ????????????????"
                        type="text"
                        value={value}
                        onChange={onChange}
                        error={!!errors.passport_series?.message}
                        helperText={ errors?.passport_series?.message }
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        />
                        )}
                    />
                    <Controller
                    name={"passport_id"}
                    control={control}
                    rules={{required: '?????????????????????? ?????? ????????????????????!'}}
                    render={({field: {onChange, value}}) => (
                        <TextField
                        label="??? ????????????????"
                        type="text"
                        value={value}
                        onChange={onChange}
                        error={!!errors.passport_id?.message}
                        helperText={ errors?.passport_id?.message }
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        />
                        )}
                    />
                    <Controller
                    name={"who_issued_the_passport"}
                    control={control}
                    rules={{required: '?????????????????????? ?????? ????????????????????!'}}
                    render={({field: {onChange, value}}) => (
                        <TextField
                        label="?????? ??????????"
                        type="text"
                        value={value}
                        onChange={onChange}
                        error={!!errors.who_issued_the_passport?.message}
                        helperText={ errors?.who_issued_the_passport?.message }
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        />
                        )}
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Controller
                            name={"date_of_issue_of_the_passport"}
                            control={control}
                            rules={dateValidation}
                            render={({field}) => (
                                <DatePicker
                                label="???????? ????????????"
                                {...field}
                                renderInput={(params) => <TextField 
                                                        {...params} 
                                                        fullWidth 
                                                        sx={{ marginBottom: 2 }}
                                                        error={!!errors.date_of_issue_of_the_passport?.message}
                                                        helperText={ errors?.date_of_issue_of_the_passport?.message }
                                                        />}
                                />
                                )}
                            />
                    </LocalizationProvider>
                    
                    <Controller
                    name={"inspirational_passport_number"}
                    control={control}
                    rules={{required: '?????????????????????? ?????? ????????????????????!'}}
                    render={({field: {onChange, value}}) => (
                        <TextField
                        label="??????????. ??????????"
                        type="text"
                        value={value}
                        onChange={onChange}
                        error={!!errors.inspirational_passport_number?.message}
                        helperText={ errors?.inspirational_passport_number?.message }
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        />
                        )}
                    />
                    <Controller
                    name={"place_of_birth"}
                    control={control}
                    rules={{required: '?????????????????????? ?????? ????????????????????!'}}
                    render={({field: {onChange, value}}) => (
                        <TextField
                        label="?????????? ????????????????"
                        type="text"
                        value={value}
                        onChange={onChange}
                        error={!!errors.place_of_birth?.message}
                        helperText={ errors?.place_of_birth?.message }
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        />
                        )}
                    />

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">?????????? ????????. ????????????????????</InputLabel>
                        <Controller
                        name={"city_of_residence"}
                        control={control}
                        rules={{required: '?????????????????????? ?????? ????????????????????!'}}
                        render={({field}) => (
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="?????????? ????????. ????????????????????"
                            sx={{ marginBottom: 2 }}
                            error={!!errors.city_of_residence?.message}
                            {...field}
                            >
                                {all_citys.map((city) => ( <MenuItem value={city.id} key={city.id}>{city.name}</MenuItem>))}
                            </Select>
                            )}
                        />
                    </FormControl>

                    <Controller
                    name={"residential_address"}
                    control={control}
                    rules={{required: '?????????????????????? ?????? ????????????????????!'}}
                    render={({field: {onChange, value}}) => (
                        <TextField
                        label="?????????? ????????.????????????????????"
                        type="text"
                        value={value}
                        onChange={onChange}
                        error={!!errors.residential_address?.message}
                        helperText={ errors?.residential_address?.message }
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        />
                        )}
                    />
                    <Controller
                    name={"home_phone"}
                    control={control}
                    rules={{required: '?????????????????????? ?????? ????????????????????!'}}
                    render={({field: {onChange, value}}) => (
                        <TextField
                        label="?????????????? ??????"
                        type="text"
                        value={value}
                        onChange={onChange}
                        error={!!errors.home_phone?.message}
                        helperText={ errors?.home_phone?.message }
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        />
                        )}
                    />
                    <Controller
                    name={"mobile_phone"}
                    control={control}
                    rules={{required: '?????????????????????? ?????? ????????????????????!'}}
                    render={({field: {onChange, value}}) => (
                        <TextField
                        label="?????????????? ??????"
                        type="text"
                        value={value}
                        onChange={onChange}
                        error={!!errors.mobile_phone?.message}
                        helperText={ errors?.mobile_phone?.message }
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        />
                        )}
                    />
                    <Controller
                    name={"email"}
                    control={control}
                    rules={emailValidation}
                    render={({field: {onChange, value}}) => (
                        <TextField
                        label="E-mail"
                        type="text"
                        value={value}
                        onChange={onChange}
                        error={!!errors.email?.message}
                        helperText={ errors?.email?.message }
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        />
                        )}
                    />
                    <Controller
                    name={"work_place"}
                    control={control}
                    rules={{required: '?????????????????????? ?????? ????????????????????!'}}
                    render={({field: {onChange, value}}) => (
                        <TextField
                        label="?????????? ????????????"
                        type="text"
                        value={value}
                        onChange={onChange}
                        error={!!errors.work_place?.message}
                        helperText={ errors?.work_place?.message }
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        />
                        )}
                    />
                    <Controller
                    name={"position"}
                    control={control}
                    rules={{required: '?????????????????????? ?????? ????????????????????!'}}
                    render={({field: {onChange, value}}) => (
                        <TextField
                        label="??????????????????"
                        type="text"
                        value={value}
                        onChange={onChange}
                        error={!!errors.position?.message}
                        helperText={ errors?.position?.message }
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        />
                        )}
                    />

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">?????????? ????????????????</InputLabel>
                        <Controller
                        name={"place_of_registration"}
                        control={control}
                        rules={{required: '?????????????????????? ?????? ????????????????????!'}}
                        render={({field}) => (
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="?????????? ????????????????"
                            sx={{ marginBottom: 2 }}
                            error={!!errors.place_of_registration?.message}
                            {...field}
                            >
                                {all_citys.map((city) => ( <MenuItem value={city.id} key={city.id}>{city.name}</MenuItem>))}
                            </Select>
                            )}
                        />
                    </FormControl>

                    <Controller
                    name={"address_of_residence"}
                    control={control}
                    rules={{required: '?????????????????????? ?????? ????????????????????!'}}
                    render={({field: {onChange, value}}) => (
                        <TextField
                        label="?????????? ????????????????"
                        type="text"
                        value={value}
                        onChange={onChange}
                        error={!!errors.address_of_residence?.message}
                        helperText={ errors?.address_of_residence?.message }
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        />
                        )}
                    />    
                    
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">???????????????? ??????????????????</InputLabel>
                        <Controller
                        name={"marital_status"}
                        control={control}
                        rules={{required: '?????????????????????? ?????? ????????????????????!'}}
                        render={({field}) => (
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="???????????????? ??????????????????"
                            sx={{ marginBottom: 2 }}
                            error={!!errors.marital_status?.message}
                            {...field}
                            >
                                 {material_status_list.map((status) => ( <MenuItem value={status.id} key={status.id}>{status.name}</MenuItem>))}
                            </Select>
                            )}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">??????????????????????</InputLabel>
                        <Controller
                        name={"citizenship"}
                        control={control}
                        rules={{required: '?????????????????????? ?????? ????????????????????!'}}
                        render={({field}) => (
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="??????????????????????"
                            sx={{ marginBottom: 2 }}
                            error={!!errors.citizenship?.message}
                            {...field}
                            >
                               {citizenship_list.map((citizenship) => ( <MenuItem value={citizenship.id} key={citizenship.id}>{citizenship.name}</MenuItem>))}
                            </Select>
                            )}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">????????????????????????</InputLabel>
                        <Controller
                        name={"disability"}
                        control={control}
                        rules={{required: '?????????????????????? ?????? ????????????????????!'}}
                        render={({field}) => (
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="????????????????????????"
                            sx={{ marginBottom: 2 }}
                            error={!!errors.disability?.message}
                            {...field}
                            >
                                {all_disabilitys.map((disability) => ( <MenuItem value={disability.id} key={disability.id}>{disability.name}</MenuItem>))}
                            </Select>
                            )}
                        />
                    </FormControl>

                    <Box style={{display: 'flex', justifyContent: 'center'}} sx={{ marginBottom: 2 }}>
                        <FormControl error={!!errors.retiree?.message}>
                            <FormLabel id="demo-controlled-radio-buttons-group" component="legend">??????????????????</FormLabel>
                            <Controller
                            name={"retiree"}
                            control={control}
                            rules={{required: '?????????????????????? ?????? ????????????????????!'}}
                            render={({field}) => (
                                <RadioGroup
                                row
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                {...field}
                            >
                                    <FormControlLabel value="Yes" control={<Radio />} label="????" />
                                    <FormControlLabel value="No" control={<Radio />} label="??????" />
                                </RadioGroup>
                            )}
                            />
                            <FormHelperText>{errors?.retiree?.message}</FormHelperText>
                        </FormControl>
                    </Box>
                    
                    <FormControl fullWidth>
                        <InputLabel htmlFor="outlined-adornment-amount">?????????????????????? ??????????</InputLabel>
                        <Controller
                        name={"salary"}
                        control={control}
                        rules={{required: '?????????????????????? ?????? ????????????????????!'}}
                        render={({field: {onChange, value}}) => (
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                type="number"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                label="?????????????????????? ??????????"
                                value={value}
                                onChange={onChange}
                                error={!!errors.salary?.message}
                                sx={{ marginBottom: 2 }}
                            />
                            )}
                        />
                    </FormControl>

                    <Box style={{display: 'flex', justifyContent: 'center'}} sx={{ marginBottom: 2 }}>
                        <FormControl error={!!errors.liable_for_military_service?.message}>
                            <FormLabel id="demo-controlled-radio-buttons-group" component="legend">??????????????????????????????</FormLabel>
                            <Controller
                            name={"liable_for_military_service"}
                            control={control}
                            rules={{required: '?????????????????????? ?????? ????????????????????!'}}
                            render={({field}) => (
                                <RadioGroup
                                row
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                {...field}
                            >
                                    <FormControlLabel value="Yes" control={<Radio />} label="????" />
                                    <FormControlLabel value="No" control={<Radio />} label="??????" />
                                </RadioGroup>
                            )}
                            />
                            <FormHelperText>{errors?.liable_for_military_service?.message}</FormHelperText>
                        </FormControl>
                    </Box>
                    {is_load_reg_response
                        ?
                            ( 
                            <Box sx={{ width: "100%" }}>
                                <LinearProgress /> 
                            </Box>
                            )
                        :
                            <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmit(handleClickRegister)} fullWidth>
                                ???????????????????????????????? ??????????????
                            </Button>
                    }
                </Box>
            </FormControl>)}
    </div>
  );
}

export default RegisterClient;
