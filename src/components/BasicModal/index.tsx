import React, {FC} from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

type BasicModalProps = {
    open: any,
    handleClose: any,
    handleCloseAccept: any
}

const BasicModal: FC<BasicModalProps> = ({open, handleClose, handleCloseAccept}) => {
  return (
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box style={{ textAlign: "center" }}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Вы действительно хотите удалить данного клиента?
            </Typography>
          </Box>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "20px"
            }}
          >
            <Button onClick={handleCloseAccept} style={{ marginRight: "30px" }}>
              Accept
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </div>
        </Box>
      </Modal>
  );
}
export default BasicModal
