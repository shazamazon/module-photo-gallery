import React from 'react';
import ExpandedThumbnail from './ExpandedThumbnail.jsx';

const ExpandedThumbnails = (props) => {
  return (
    <div id='gall_expandedThumbnails'>
      {props.images.map(image => <ExpandedThumbnail image={image} />)}
    </div>
  );
};

export default ExpandedThumbnails;