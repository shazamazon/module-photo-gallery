import React from 'react';

const Image = (props) => {
  return (
    <>
      <div
        className='gall_thumbnail'
        id={props.hoveredThumbnail === props.image ? 'gall_hover' : null}
        onMouseEnter={() => props.selectView(props.image)}
      >
        <img src={props.image}/>
      </div>
      <div className='gall_spacing'></div>
    </>
  );
};

export default Image;