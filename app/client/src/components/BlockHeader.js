import React from 'react';

const BlockHeader = () => (
  <div>
    <div className="stampImageContainer">
    <img src="assets/stamp_images/logo3.png" alt="Chess Opening Stamp Collector" className='stampImage'/>
    </div>
    {console.log('Header rendered')}
    <h3>How many chess opening stamps have <u>you</u> collected?</h3>
  </div>
);

export default BlockHeader;