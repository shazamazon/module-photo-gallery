import React from 'react';
import ExpandedThumbnail from './ExpandedThumbnail.jsx';

const ExpandedThumbnails = (props) => {
  return (
    <div id='gall_expandedThumbnails'>
      {props.images.map(image =>
        <ExpandedThumbnail
          image={image}
          selectedThumbnail={props.selectedThumbnail}
          hoveredThumbnail={props.hoveredThumbnail}
          selectImage={props.selectImage}
          onHoverOverThumbnail={props.onHoverOverThumbnail}
          onHoverOffThumbnail={props.onHoverOffThumbnail}
        />)}
    </div>
  );
};

export default ExpandedThumbnails;