import React from 'react';

const Video = (props) => {
  return (
    <>
      <div
        className='gall_thumbnail'
        id='gall_vidthumb'
        onMouseEnter={() => props.selectVideo(props.video)}
      >
        <video src={props.video}></video>
        <img src='https://shazamazon.s3.us-east-2.amazonaws.com/icons/white_play_icon.jpg'/>
      </div>
      <div id='gall_vidcap'>VIDEO</div>
    </>
  );
};

export default Video;