import React from 'react';

const Image = (props) => {
  return (
    <>
      <img className='gall_small' src={props.image} />
      <br />
    </>
  );
};

export default Image;