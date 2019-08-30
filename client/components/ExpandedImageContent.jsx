import React from 'react';

const ExpandedImageContent = (props) => {
  return (
    <div id={props.video ? 'gall_expandedImageWithVideo' : 'gall_expandedImageWithoutVideo'}>
      <img src={props.expandedMain} />
    </div>
  );
};

export default ExpandedImageContent;