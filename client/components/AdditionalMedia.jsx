import React from 'react';

import Image from './Image.jsx';

const AdditionalMedia = (props) => {
  return (
    props.images.map(image => <Image image={image} />)
  );
};

export default AdditionalMedia;