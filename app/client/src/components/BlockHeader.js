import React from 'react';

const BlockHeader = () => (
  <div>
    <div className="stampImageContainer">
    <img src="assets/stamp_images/logo3.png" alt="Chess Opening Stamp Collector" className='stampImage'/>
    </div>
    {console.log('Header rendered')}
    <h1>How many chess opening stamps have you collected?</h1>
  </div>



  
);

export default BlockHeader;