import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Link from '@mui/material/Link';


const BlockHeader = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const faqData = [
    {
      question: 'Q: Do you support Chess.com games in addition to Lichess games?',
      answer: 'A: Right now the tool only supports Lichess games. I\'m considering adding Chess.com support in the future.',
    },
    {
      question: 'Q: What are popularity rank and rarity score?',
      answer: 'A: Popularity rank is the rank of how popular a particular opening is in the overall Lichess database, with Rank 1 being the most popular. Rarity score is based on the overall proportion instead of a ranking. A rarity score of 10,000 means that opening is 1 in every 10,000 stamps, and a higher rarity score means the opening is played less frequently.',
    },
    {
      question: 'Q: How do you handle transpositions?',
      answer: 'A: Each game is assigned a single opening, which is the most granular opening played, and this can be reached via transposition and assigned successfully. However, you will only get credit for a "parent" of a particular opening if you played the canonical move order for that parent opening. For example, the sequence 1. Nf3 e5 2. e4 will receive credit as the King\'s Knight Opening even though it started with Nf3, but would not receive credit for the King\'s Pawn Game because it did not play the accepted move order for that opening.',
    },
    {
      question: 'Q: When is the overall popularity data from?',
      answer: 'A: Popularity data does not update. It was pulled from Lichess in August 2023 and contains all games played on Lichess at the time.',
    },
    {
      question: 'Q: How can I provide feedback?',
      answer: (
        <React.Fragment>
          A: You can contact me through the{' '}
          <Link href="https://forms.gle/mNfFzLsrQ7YXC4Es5" target="_blank" rel="noopener noreferrer">
            Google Form
          </Link>
          , or see my{' '}
          <Link href="https://www.kylegiddon.com/?utm_source=cosc" target="_blank" rel="noopener noreferrer">
            personal website
          </Link>
          {' '}for other contact info.
        </React.Fragment>
      ),
    },  ];

  return (
    <div>
      <div className="stamp-image-container">
        <img src="assets/stamp_images/logo4.png" alt="Chess Opening Stamp Collector" className='stamp-image'/>
      </div>
      {console.log('Header rendered')}
      <h1>How many&nbsp;
      <Tooltip 
          className="opaque-tooltip"
          title="Click to load FAQ"
          enterTouchDelay={0}
          arrow
          sx={{
            '.MuiTooltip-tooltip': {
              border: '1px solid',
            },  
          }}
        >
          <span className='dotted-underline' onClick={handleClickOpen}>chess opening stamps</span>
        </Tooltip>
        &nbsp;have you collected?&nbsp;&nbsp;

        <Tooltip 
          className="opaque-tooltip"
          title="Click to load FAQ"
          enterTouchDelay={0}
          arrow
          sx={{
            '.MuiTooltip-tooltip': {
              border: '1px solid',
            },  
          }}
        >
          <HelpIcon className="header-tooltip-icon" color="primary" onClick={handleClickOpen} />
        </Tooltip>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold'  }}>FAQ</Typography>
          </DialogTitle>
          <DialogContent>
            <IconButton style={{ position: 'absolute', right: '10px', top: '10px' }} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 2, marginBottom: 2, lineHeight: 1.1 }}>
              Q: What are "chess opening stamps"?
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.2, } }>
              A: Think of playing chess openings as collecting stamps...
              <ul>
                <li>Every time you reach a named opening position, you collect a "stamp"!</li>
                <li>You can collect multiple stamps in the same game. For example, if you play the Ruy Lopez, you'll collect a stamp for all named openings you pass through:
                  <ol>
                    <li>King's Pawn Game</li>
                    <li>King's Knight Opening</li>
                    <li>King's Knight Opening: Normal Variation</li>
                    <li>Ruy Lopez</li>
                    <li>...and whatever subsequent variations of the Ruy Lopez you end up in...</li>
                  </ol>
                </li>  
              </ul>
              The tool uses your data to pull statistics on your "stamp collection" in a variety of categories.
            </Typography>
            {faqData.map((faq, index) => (
              <div key={index}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 2, marginBottom: 2, lineHeight: 1.1 }}>
                  {faq.question}
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.2}} >
                  {faq.answer}
                </Typography>
              </div>
  ))}


          </DialogContent>
        </Dialog>
      </h1>
    </div>
  );
};

export default BlockHeader;