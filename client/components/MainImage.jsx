import React from 'react';

const MainImage = (props) => {
  return (
    <div id='gall_main' onMouseEnter={props.onMouseEnter} onMouseMove={props.onMouseMove} onMouseLeave={props.onMouseLeave}>
      <img src={props.main} />
    </div>
  );
};

export default MainImage;