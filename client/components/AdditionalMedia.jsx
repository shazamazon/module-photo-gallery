import React from 'react';

import Image from './Image.jsx';

const AdditionalMedia = (props) => {
  return (
    <div id='gall_additional'>
      {props.images.map(image => <Image image={image} />)}
    </div>
  );
};

export default AdditionalMedia;