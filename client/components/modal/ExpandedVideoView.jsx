import React from 'react';

const ExpandedVideoView = (props) => {
  return (
    <div id='gall_expandedVideoView'>
      <div id='gall_expandedVideoWithName'>
        <div id='gall_expandedVideo'>
          <video src={props.video} controls controlsList='nodownload' disablePictureInPicture autoPlay></video>
        </div>
        <div className='gall_feedback'>
          <span>Helpful?</span>
          <img src={props.isVideoLiked ? 'https://shazamazon.s3.us-east-2.amazonaws.com/icons/liked.png' : 'https://shazamazon.s3.us-east-2.amazonaws.com/icons/like.png'} onClick={props.onLikeClick}/>
          <span>{props.numberOfLikes}</span>
          <img src={props.isVideoDisliked ? 'https://shazamazon.s3.us-east-2.amazonaws.com/icons/disliked.png' : 'https://shazamazon.s3.us-east-2.amazonaws.com/icons/dislike.png'} onClick={props.onDislikeClick}/>
          <span>{props.numberOfDislikes}</span>
          <img id='gall_share' src='https://shazamazon.s3.us-east-2.amazonaws.com/icons/share2.png'/>
        </div>
        <div id='gall_expandedName'>
          <p>{props.name}</p>
        </div>
      </div>
      <div id='gall_expandedRelatedVideos'>
        <p>Related videos (1)</p>
        <div id='gall_expandedVideoThumbnailWithName'>
          <div id='gall_expandedVideoThumbnail'>
            <video src={props.video}></video>
          </div>
          <div id='gall_expandedThumnbnailName'>{props.name.slice(0, 38) + '...'}</div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedVideoView;