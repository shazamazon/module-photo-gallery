import React from 'react';

const Image = (props) => {
  return (
    <div className='gall_thumbnail'>
      <img src={props.image} />
      <br />
    </div>
  );
};

export default Image;