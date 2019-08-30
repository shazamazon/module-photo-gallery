import React from 'react';

const ExpandedThumbnail = (props) => {
  return (
    <>
      <div className='gall_expandedThumbnail'>
        <img src={props.image}/>
      </div>
      {/* <div className='gall_columnSpacing'></div> */}
    </>
  );
};

export default ExpandedThumbnail;