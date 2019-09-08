import React, { Component } from 'react';

import ExpandedImagesView from './ExpandedImagesView.jsx';
import ExpandedVideoView from './ExpandedVideoView.jsx';

class ExpandedView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedMain: this.props.expandedMain,
      selectedThumbnail: '',
      hoveredThumbnail: ''
    };

    this.selectImage = this.selectImage.bind(this);
    this.handleHoverOverThumbnail = this.handleHoverOverThumbnail.bind(this);
    this.handleHoverOffThumbnail = this.handleHoverOffThumbnail.bind(this);
    this.viewImages = this.viewImages.bind(this);
    this.viewVideo = this.viewVideo.bind(this);
  }

  selectImage(e) {
    this.setState({
      expandedMain: e,
      selectedThumbnail: e
    });
  }

  handleHoverOverThumbnail(e) {
    this.setState({hoveredThumbnail: e});
  }

  handleHoverOffThumbnail() {
    this.setState({hoveredThumbnail: ''});
  }

  viewImages(e) {
    e.preventDefault();
    this.setState({
      expandedMain: this.props.images[0],
      selectedThumbnail: this.props.images[0]
    });
  }

  viewVideo(e) {
    e.preventDefault();
    this.setState({expandedMain: this.props.video});
  }

  render() {
    return (
      <div id='gall_disable'>
        <div ref={node => this.modal = node} id='gall_expanded'>
          <span id={'gall_close'} onClick={this.props.closeExpandedViewWithX}>
            <img src='https://shazamazon.s3.us-east-2.amazonaws.com/icons/close.png' />
          </span>
          {this.props.video && (
            <ul className='gall_tabs'>
              <li
                id={this.state.expandedMain.includes('cloudfront') ? 'gall_selectedTab' : null}
                onClick={this.viewVideo}>
                RELATED VIDEOS
              </li>
              <li
                id={!this.state.expandedMain.includes('cloudfront') ? 'gall_selectedTab' : null}
                onClick={this.viewImages}>
                IMAGES
              </li>
            </ul>
          )}
          {this.state.expandedMain.includes('cloudfront') ? (
            <ExpandedVideoView
              name={this.props.name}
              video={this.props.video}
              isVideoLiked={this.props.isVideoLiked}
              isVideoDisliked={this.props.isVideoDisliked}
              numberOfLikes={this.props.numberOfLikes}
              numberOfDislikes={this.props.numberOfDislikes}
              onLikeClick={this.props.onLikeClick}
              onDislikeClick={this.props.onDislikeClick}
            />
          ) : (
            <ExpandedImagesView
              expandedMain={this.state.expandedMain}
              name={this.props.name}
              images={this.props.images}
              video={this.props.video}
              selectedThumbnail={this.state.selectedThumbnail ? this.state.selectedThumbnail : this.props.expandedMain}
              hoveredThumbnail={this.state.hoveredThumbnail}
              selectImage={this.selectImage}
              onHoverOverThumbnail={this.handleHoverOverThumbnail}
              onHoverOffThumbnail={this.handleHoverOffThumbnail}
            />
          )}
        </div>
      </div>
    );
  }
}

export default ExpandedView;