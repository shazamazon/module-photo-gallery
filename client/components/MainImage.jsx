import React from 'react';
import ExpandedView from './ExpandedView.jsx';

const MainImage = (props) => {
  return (
    <>
      <div id='gall_main' onMouseEnter={props.onMouseEnter} onMouseMove={props.onMouseMove} onMouseLeave={props.onMouseLeave} onClick={props.onMainImageClick}>
        <img src={props.main} onLoad={(e) => props.getImageDimensions(e.currentTarget.src)} />
      </div>
      {props.isExpandedView && <ExpandedView />}
    </>
  );
};

export default MainImage;