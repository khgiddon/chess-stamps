import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { login } from '../api/auth.js';

const AuthDialog = ({ open, handleClose, username, timeframe}) => {

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent className="dialog-content">
        <div className="dialog-title">
            <h2>Authenticate with Lichess (highly recommended)</h2>
        </div>
        <div className='dialog-explanatory-text'>
            <p>Only one non-authenticated user can use the tool at a time because of Lichess's API rate limiting. <b>If you do not authenticate, you may receive a network error if someone else is trying to use the tool at the same time.</b> 
              <br /><br />
            Authenticating with Lichess will also make your call 3x faster. </p>
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