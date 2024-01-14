import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const TopNav = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar variant='dense' sx={{ 
          minHeight: '30px', // Adjust height as needed
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-around', 
          height: '100%',
          padding: '0 8px', // Reduced padding, adjust values as needed
        }}
      >
      <Button href="/" color="inherit" variant="text" sx={{ textTransform: 'none' }}>
        <Typography variant="caption" sx={{ fontSize: '0.9rem' }}>
          Home
        </Typography>
      </Button>
      <Button href="/faq" color="inherit" variant="text" sx={{ textTransform: 'none' }}>
        <Typography variant="caption" sx={{ fontSize: '0.9rem' }}>
          FAQ
        </Typography>
      </Button>
      <Button href="/about" color="inherit" variant="text" sx={{ textTransform: 'none' }}>
        <Typography variant="caption" sx={{ fontSize: '0.9rem' }}>
          About
        </Typography>
      </Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;