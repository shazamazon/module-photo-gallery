import React, { Component } from 'react';
import axios from 'axios';

import MainImage from './MainImage.jsx';
import AdditionalMedia from './AdditionalMedia.jsx';
import Caption from './Caption.jsx';
import ExpandedView from './modal/ExpandedView.jsx';

class MediaContainer extends Component {
  constructor() {
    super();
    this.state = {
      id: Math.floor(Math.random() * 105),
      name: '',
      images: [],
      main: '',
      video: null,
      caption: 'Roll over image to zoom in',
      hoveredThumbnail: '',
      isExpandedView: false,
      isVideoLiked: false,
      isVideoDisliked: false,
      numberOfLikes: Math.floor(Math.random() * 15),
      numberOfDislikes: Math.floor(Math.random() * 15),
      x: 0,
      y: 0,
      dns: 'ec2-3-17-158-128.us-east-2.compute.amazonaws.com:8369'
    };

    this.selectView = this.selectView.bind(this);
    this.selectVideo = this.selectVideo.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.showExpandedView = this.showExpandedView.bind(this);
    this.closeExpandedView = this.closeExpandedView.bind(this);
    this.closeExpandedViewWithX = this.closeExpandedViewWithX.bind(this);
    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.handleDislikeClick = this.handleDislikeClick.bind(this);
    this.getImageDimensions = this.getImageDimensions.bind(this);
  }

  getItem() {
    axios.get(`${this.state.dns}/item/${this.state.id}`)
      .then(({ data }) => {
        this.setState({
          name: data.ItemName,
          images: data.Photo,
          main: data.Photo[0],
          video: data.Video,
          hoveredThumbnail: data.Photo[0]
        });
      });
  }

  componentDidMount() {
    this.getItem();
  }

  selectView(e) {
    this.setState({
      main: e,
      hoveredThumbnail: e
    });
  }

  selectVideo(e) {
    this.setState({
      main: e,
      video: e,
      hoveredThumbnail: e
    });
  }

  handleMouseEnter(e) {
    this.setState({
      caption: 'Click image to open expanded view',
      x: e.clientX,
      y: e.clientY
    }, () => console.log('X: ', this.state.x, ', Y: ', this.state.y));
  }

  handleMouseMove(e) {
    this.setState({
      x: e.clientX,
      y: e.clientY
    }, () => console.log('X: ', this.state.x, ', Y: ', this.state.y));
  }

  handleMouseLeave(e) {
    this.setState({
      caption: 'Roll over image to zoom in',
      x: e.clientX,
      y: e.clientY
    }, () => console.log('X: ', this.state.x, ', Y: ', this.state.y));
  }

  showExpandedView(e) {
    this.setState({isExpandedView: true}, () => {
      document.addEventListener('click', this.closeExpandedView);
    });
  }

  closeExpandedView(e) {
    if (!this.expandedView.modal.contains(e.target)) {
      this.setState({isExpandedView: false}, () => {
        document.removeEventListener('click', this.closeExpandedView);
      });
    }
  }

  closeExpandedViewWithX() {
    this.setState({isExpandedView: false}, () => {
      document.removeEventListener('click', this.closeExpandedView);
    });
  }

  handleLikeClick() {
    if (this.state.isVideoLiked) {
      this.setState({
        isVideoLiked: false,
        numberOfLikes: this.state.numberOfLikes - 1
      });
    } else {
      if (this.state.isVideoDisliked) {
        this.setState({
          isVideoLiked: true,
          numberOfLikes: this.state.numberOfLikes + 1,
          isVideoDisliked: false,
          numberOfDislikes: this.state.numberOfDislikes - 1
        });
      } else {
        this.setState({
          isVideoLiked: true,
          numberOfLikes: this.state.numberOfLikes + 1
        });
      }
    }
  }

  handleDislikeClick() {
    if (this.state.isVideoDisliked) {
      this.setState({
        isVideoDisliked: false,
        numberOfDislikes: this.state.numberOfDislikes - 1
      });
    } else {
      if (this.state.isVideoLiked) {
        this.setState({
          isVideoDisliked: true,
          numberOfDislikes: this.state.numberOfDislikes + 1,
          isVideoLiked: false,
          numberOfDislikes: this.state.numberOfDislikes - 1
        });
      } else {
        this.setState({
          isVideoDisliked: true,
          numberOfDislikes: this.state.numberOfDislikes + 1
        });
      }
    }
  }

  getImageDimensions(e) {
    console.log(e);
  }

  render() {
    return (
      <>
        <AdditionalMedia
          images={this.state.images}
          video={this.state.video}
          hoveredThumbnail={this.state.hoveredThumbnail}
          selectView={this.selectView}
          selectVideo={this.selectVideo}
        />
        <div id='gall_wrapper'>
          <MainImage
            name={this.state.name}
            main={this.state.main}
            isExpandedView={this.state.isExpandedView}
            onMouseEnter={this.handleMouseEnter}
            onMouseMove={this.handleMouseMove}
            onMouseLeave={this.handleMouseLeave}
            showExpandedView={this.showExpandedView}
            getImageDimensions={this.getImageDimensions}
          />
          {!this.state.main.includes('cloudfront') && <Caption caption={this.state.caption} />}
        </div>
        {this.state.isExpandedView && <ExpandedView
          ref={node => this.expandedView = node}
          name={this.state.name}
          expandedMain={this.state.main}
          images={this.state.images}
          video={this.state.video}
          isVideoLiked={this.state.isVideoLiked}
          isVideoDisliked={this.state.isVideoDisliked}
          numberOfLikes={this.state.numberOfLikes}
          numberOfDislikes={this.state.numberOfDislikes}
          closeExpandedViewWithX={this.closeExpandedViewWithX}
          onLikeClick={this.handleLikeClick}
          onDislikeClick={this.handleDislikeClick}
        />}
      </>
    );
  }
}

export default MediaContainer;