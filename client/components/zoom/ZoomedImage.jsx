import React from 'react';

const ZoomedImage = (props) => {
  return (
    <div
      id='gall_underlay'
      style={{
        width: (props.windowWidth).toString() + 'px',
        height: (props.windowHeight).toString() + 'px',
      }}
    >
      <div
        id='gall_zoomedImage'
        style={{
          width: (props.windowWidth).toString() + 'px',
          height: (props.windowHeight).toString() + 'px',
          backgroundImage: `url(${props.main})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: props.backgroundSize,
          backgroundPosition: props.backgroundPosition
        }}
        onMouseEnter={props.onMouseEnter}
      ></div>
    </div>
  );
};

export default ZoomedImage;