import React from 'react';

const BlockHeader = () => (
  <div>
    <div className="stampImageContainer">
    <img src="assets/stamp_images/image.webp" alt="Stamp" className='stampImage'/>
      <img src="assets/stamp_images/image (1).webp" alt="Stamp" className='stampImage'/>
      <img src="assets/stamp_images/image (5).webp" alt="Stamp" className='stampImage'/>          
      <img src="assets/stamp_images/image (6).webp" alt="Stamp" className='stampImage'/>
      <img src="assets/stamp_images/image (4).webp" alt="Stamp" className='stampImage'/>
    </div>
    <h1>Chess Opening Stamp Collector</h1>
    {console.log('Header rendered')}
    <h3>How many chess opening stamps have you collected?</h3>
  </div>
);

export default BlockHeader;