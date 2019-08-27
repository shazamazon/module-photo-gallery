import React from 'react';

import Image from './Image.jsx';

const AdditionalMedia = (props) => {
  return (
    <div id='gall_additional'>
      {props.images.slice(0, 6).map(image => <Image image={image} selectView={props.selectView} />)}
    </div>
  );
};

export default AdditionalMedia;