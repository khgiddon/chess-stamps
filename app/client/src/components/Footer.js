import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-text">
      Chess Opening Stamp Collector was created by <a href="https://www.kylegiddon.com/?utm_source=cosc" target="_blank" rel="noopener noreferrer">Kyle Giddon</a>.
      © {new Date().getFullYear()}. All rights reserved.
    </footer>
  );
};

export default Footer;