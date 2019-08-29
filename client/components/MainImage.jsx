import React from 'react';

const MainImage = (props) => {
  return (
    <>
      <div id={props.main.includes('cloudfront') ? 'gall_video' : 'gall_main'} onMouseEnter={props.onMouseEnter} onMouseMove={props.onMouseMove} onMouseLeave={props.onMouseLeave}>
        {props.main.includes('cloudfront') ? (
          <video src={props.main + '#t=1'} preload='metadata' onClick={props.showExpandedView}></video>
        ) : (
          <img src={props.main} onClick={props.showExpandedView} onLoad={(e) => props.getImageDimensions(e.currentTarget.src)}/>
        )}
      </div>
    </>
  );
};

export default MainImage;