import React from 'react';
import ExpandedThumbnails from './ExpandedThumbnails.jsx';

const ExpandedColumn = (props) => {
  return (
    <div id='gall_expandedColumn'>
      <div id='gall_name'>
        {props.name}
      </div>
      <ExpandedThumbnails
        images={props.images}
        selectedThumbnail={props.selectedThumbnail}
        hoveredThumbnail={props.hoveredThumbnail}
        selectImage={props.selectImage}
        onHoverOverThumbnail={props.onHoverOverThumbnail}
        onHoverOffThumbnail={props.onHoverOffThumbnail}
      />
    </div>
  );
};

export default ExpandedColumn;