import React, {FC} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IClient } from "../../models/IClient";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

type BasicCardProps = {
    client: IClient,
    deleteClient: any
}

const EditBlock = (<Button 
    startIcon={<EditIcon/>} 
    onClick={()=> console.log("1")}
>
    {""}
</Button>)

 const BasicCard: FC<BasicCardProps> = ({client, deleteClient}) => {
  return (
    <Card sx={{ minWidth: 275 }} style={{marginBottom: "10px"}}>
      <CardActions>
        <Button 
            startIcon={<DeleteForeverIcon/>} 
            onClick={()=>deleteClient(client.id)}
        >
            {""}
        </Button>
      </CardActions>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {client.passport_series} {client.passport_id}
        </Typography>
        <Typography variant="h5" component="div">
          {client.first_name} {client.last_name} {EditBlock}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {client.mobile_phone}
        </Typography>
        <Typography variant="body2">
         {client.residential_address}
          <br />
          {client.email}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BasicCard
