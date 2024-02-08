import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-text">
      Chess Stamps was created by <a href="https://www.kylegiddon.com/?utm_source=cosc" target="_blank" rel="noopener noreferrer">Kyle Giddon</a> and is <a href="https://github.com/khgiddon/chess-stamps" target="_blank" rel="noopener noreferrer">open source</a>. Any feedback? <a href="https://forms.gle/mNfFzLsrQ7YXC4Es5" target="_blank" rel="noopener noreferrer">Submit here</a>.
      © {new Date().getFullYear()}.
    </footer>
  );
};

export default Footer;