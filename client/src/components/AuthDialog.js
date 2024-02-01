import React, { useRef, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { login, authorize } from '../api/auth.js';

const AuthDialog = ({ open, handleClose, username, timeframe}) => {

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent className="dialog-content">
        <div className="dialog-title">
            <h2>Authenticate with Lichess?</h2>
        </div>
        <div className='dialog-explanatory-text'>
            <p>Authentication is optional, but it will load your games 3x faster.</p>
        </div>
        <Stack direction="row" spacing={2} style={{ marginTop: '20px', marginBottom: '20px'  }} alignItems="center" justifyContent="center">
  <Button variant="outlined" color="secondary" onClick={handleClose} style={{ maxWidth: 'fit-content' }}>
    Skip
  </Button>
  <Button 
    variant="contained" 
    color="primary" 
    style={{ maxWidth: 'fit-content' }} 
    onClick={() => login(username, timeframe)}
  >
    Authenticate
  </Button>
</Stack>
<div style={{ textAlign: 'center', fontSize: 'small' }}>
  Learn more about the Lichess API <a href="https://lichess.org/api#section/Introduction/Rate-limiting">here</a>.
</div>
          
      </DialogContent>
    </Dialog>
  );
}

export default AuthDialog;