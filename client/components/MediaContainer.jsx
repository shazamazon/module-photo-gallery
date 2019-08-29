import React, { Component } from 'react';
import axios from 'axios';

import MainImage from './MainImage.jsx';
import AdditionalMedia from './AdditionalMedia.jsx';
import Caption from './Caption.jsx';
import ExpandedView from './ExpandedView.jsx';

class MediaContainer extends Component {
  constructor() {
    super();
    this.state = {
      id: 46,
      images: [],
      main: '',
      video: null,
      caption: 'Roll over image to zoom in',
      isExpandedView: false,
      x: 0,
      y: 0
    };

    this.selectView = this.selectView.bind(this);
    this.selectVideo = this.selectVideo.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.showExpandedView = this.showExpandedView.bind(this);
    this.closeExpandedView = this.closeExpandedView.bind(this);
    this.getImageDimensions = this.getImageDimensions.bind(this);
  }

  getItem() {
    axios.get(`/item/${this.state.id}`)
      .then(({ data }) => {
        this.setState({
          images: data.Photo,
          main: data.Photo[0],
          video: data.Video
        }, () => console.log(data));
      });
  }

  componentDidMount() {
    this.getItem();
  }

  selectView(e) {
    this.setState({main: e});
  }

  selectVideo(e) {
    this.setState({
      main: e,
      video: e
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
    this.setState({
      isExpandedView: true
    }, () => {
      document.addEventListener('click', this.closeExpandedView);
    });
  }

  closeExpandedView(e) {
    if (!this.expandedView.modal.contains(e.target)) {
      this.setState({
        isExpandedView: false
      }, () => {
        document.removeEventListener('click', this.closeExpandedView);
      });
    }
  }


  getImageDimensions(e) {
    console.log(e);
  }

  render() {
    return (
      <>
        <AdditionalMedia images={this.state.images} video={this.state.video} selectView={this.selectView} selectVideo={this.selectVideo} />
        <div id='gall_wrapper'>
          <MainImage main={this.state.main} isExpandedView={this.state.isExpandedView} onMouseEnter={this.handleMouseEnter} onMouseMove={this.handleMouseMove} onMouseLeave={this.handleMouseLeave} showExpandedView={this.showExpandedView} getImageDimensions={this.getImageDimensions} />
          {!this.state.main.includes('cloudfront') && <Caption caption={this.state.caption} />}
        </div>
        {this.state.isExpandedView && <ExpandedView ref={node => this.expandedView = node} />}
      </>
    );
  }
}

export default MediaContainer;