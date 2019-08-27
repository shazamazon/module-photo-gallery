import React from 'react';

const MainImage = (props) => {
  return (
    <img id='gall_main' src={props.main} onMouseEnter={props.onMouseEnter} onMouseMove={props.onMouseMove} onMouseLeave={props.onMouseLeave} onLoad={(e) => props.getImageDimensions(e.currentTarget.src)}/>
  );
};

export default MainImage;