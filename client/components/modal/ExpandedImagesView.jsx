import React from 'react';

import ExpandedImageContent from './ExpandedImageContent.jsx';
import ExpandedColumn from './ExpandedColumn.jsx';

const ExpandedImagesView = (props) => {
  return (
    <div id={props.video ? 'gall_withVideo' : 'gall_withoutVideo'}>
      <ExpandedImageContent
        expandedMain={props.expandedMain}
        video={props.video}
      />
      <ExpandedColumn
        name={props.name}
        images={props.images}
        video={props.video}
        selectedThumbnail={props.selectedThumbnail}
        hoveredThumbnail={props.hoveredThumbnail}
        selectImage={props.selectImage}
        onHoverOverThumbnail={props.handleHoverOverThumbnail}
        onHoverOffThumbnail={props.handleHoverOffThumbnail}
      />
    </div>
  );
};

export default ExpandedImagesView;