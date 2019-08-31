import React from 'react';

const ExpandedThumbnail = (props) => {
  return (
    <>
      <div
        className='gall_expandedThumbnail'
        id={props.selectedThumbnail === props.image ? 'gall_expandedSelected' : props.hoveredThumbnail === props.image ? 'gall_expandedHovered' : null}
        onClick={() => props.selectImage(props.image)}
        onMouseEnter={() => props.onHoverOverThumbnail(props.image)}
        onMouseLeave={props.onHoverOffThumbnail}
      >
        <img src={props.image}/>
      </div>
    </>
  );
};

export default ExpandedThumbnail;