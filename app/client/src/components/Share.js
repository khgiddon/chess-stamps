import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LinkIcon from '@mui/icons-material/Link';
import { Stack } from '@mui/material';
import { Box } from '@mui/system';


const Share = ({data, displayUsername, displayTimeframe, displayUsernameSecondMention, addThousandsSeparator, formatPercentage, urlOverride}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dialogContent = `I've played ${addThousandsSeparator(data.unique_stamps)} unique chess openings, and my rarest opening is the ${data.most_obscure_stamp ? data.most_obscure_stamp.name : 'loading...'}. What's yours? See my stats at: `;

  const url = "https://chessopeningstampcollector.com";
  const urlKey = urlOverride !== null ? urlOverride : data.url_key;
  const uniqueurl = url + '/?' + urlKey;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(uniqueurl);
  };
  

  const handleCopyFull = () => {
    navigator.clipboard.writeText(dialogContent + uniqueurl);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        
        <Button variant="outlined" onClick={handleClickOpen}>
          <ShareIcon />&nbsp;&nbsp;Share your stats
        </Button>
      </div>

    <Dialog open={open} onClose={handleClose} >
    <DialogContent className="dialog-content">
    <div className="stamp-image-container-dialog">
    <img src="assets/stamp_images/logo3.png" alt="Chess Opening Stamp Collector" className='stamp-image-dialog'/>
    </div>
    <div className="dialog-title">
            <h2>Share your stats with a unique link:</h2>
        </div>
            <IconButton style={{ position: 'absolute', right: '10px', top: '10px' }} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
        

          
          <div className='dialog-explanatory-text'></div>
              <Stack direction="row" spacing={0} alignItems="stretch" justifyContent="center">
                <Box display="flex" alignItems="center" className='dialog-copyable-text-url'>
                  <IconButton color="primary" fontSize="small" onClick={handleCopyUrl} style={{ padding: 0, display: 'flex', alignItems: 'center' }}>
                    <LinkIcon color="primary" fontSize="small"/>
                  </IconButton>
                </Box>
                <Box display="flex" alignItems="center" className='dialog-copyable-text-url'>
                  <a href={uniqueurl} target="_blank" rel="noopener noreferrer">{uniqueurl}</a>
                </Box>
            </Stack>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>

            <Button variant="outlined" onClick={handleCopyUrl} style={{ marginTop: '0px', marginBottom : '25px' }}>
                <FileCopyIcon />&nbsp;&nbsp;Copy to Clipboard
                </Button>
            </div>    
            <div className="dialog-title">
            <h2>Or send to your friends:</h2>
        </div>
            <div className='dialog-copyable-text'>
                {dialogContent}<a href={url} target="_blank" rel="noopener noreferrer">{uniqueurl}</a>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
                <Button variant="outlined" onClick={handleCopyFull} style={{ marginTop: '10px' }}>
                <FileCopyIcon />&nbsp;&nbsp;Copy to Clipboard
                </Button>
                <Button variant="outlined" style={{ marginLeft: '10px', marginTop: '10px' }}>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(dialogContent + uniqueurl)}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
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