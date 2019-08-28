import React from 'react';

const MainImage = (props) => {
  return (
    <>
      <div id='gall_main' onMouseEnter={props.onMouseEnter} onMouseMove={props.onMouseMove} onMouseLeave={props.onMouseLeave} onClick={props.showExpandedView}>
        <img src={props.main} onLoad={(e) => props.getImageDimensions(e.currentTarget.src)} />
      </div>
    </>
  );
};

export default MainImage;