import React from 'react';

const MainImage = (props) => {
  return (
    <div id='gall_main'>
      <img src={props.main} />
    </div>
  );
};

export default MainImage;