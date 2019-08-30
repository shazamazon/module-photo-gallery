import React from 'react';

import Image from './Image.jsx';
import Video from './Video.jsx';

const AdditionalMedia = (props) => {
  return (
    <div id='gall_additional'>
      {props.images.slice(0, 6).map(image => <Image image={image} selectView={props.selectView} />)}
      {props.video && <Video video={props.video} selectVideo={props.selectVideo} />}
    </div>
  );
};

export default AdditionalMedia;