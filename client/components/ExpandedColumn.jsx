import React from 'react';
import ExpandedThumbnails from './ExpandedThumbnails.jsx';

const ExpandedColumn = (props) => {
  return (
    <div id='gall_expandedColumn'>
      <div id='gall_name'>
        {props.name}
      </div>
      <ExpandedThumbnails images={props.images} />
    </div>
  );
};

export default ExpandedColumn;