import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



const Share = ({ data, displayUsername, displayTimeframe, displayUsernameSecondMention, addThousandsSeparator, formatPercentage }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dialogContent = `I've played ${addThousandsSeparator(data.unique_stamps)} unique chess openings, and my rarest opening is the ${data.most_obscure_stamp ? data.most_obscure_stamp.name : 'loading...'}. How many have you played? See your stats at `;

  const url = "https://chessopeningstampcollector.com";
  
  const handleCopy = () => {
    navigator.clipboard.writeText(dialogContent + url);
  };
  

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        
        <Button variant="outlined" onClick={handleClickOpen}>
          <ShareIcon />&nbsp;&nbsp;Share your stats
        </Button>
      </div>

    <Dialog open={open} onClose={handleClose}>
    <div className="stamp-image-container-dialog">
    <img src="assets/stamp_images/logo3.png" alt="Chess Opening Stamp Collector" className='stamp-image-dialog'/>
    </div>
        <DialogTitle className="dialog-title">
            <h2>Share your stats</h2>
            <IconButton style={{ position: 'absolute', right: '10px', top: '10px' }} onClick={handleClose}>
            <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent className="dialog-content">
            <div className='dialog-copyable-text'>
                {dialogContent}<a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <Button variant="outlined" onClick={handleCopy} style={{ marginTop: '10px' }}>
                <FileCopyIcon />&nbsp;&nbsp;Copy to Clipboard
                </Button>
                <Button variant="outlined" style={{ marginLeft: '10px' }}>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(dialogContent + url)}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Tweet
                </a>
                </Button>
            </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Share;