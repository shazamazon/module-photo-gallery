import React, { Component } from 'react';
import axios from 'axios';

import MainImage from './MainImage.jsx';
import AdditionalMedia from './AdditionalMedia.jsx';
import Caption from './Caption.jsx';

class MediaContainer extends Component {
  constructor() {
    super();
    this.state = {
      id: 46,
      images: [],
      main: '',
      caption: 'Roll over image to zoom in',
      isExpandedView: false,
      x: 0,
      y: 0
    };

    this.selectView = this.selectView.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMainImageClick = this.handleMainImageClick.bind(this);
    this.getImageDimensions = this.getImageDimensions.bind(this);
  }

  getItem() {
    axios.get(`/item/${this.state.id}`)
      .then(({ data }) => {
        this.setState({
          images: data.Photo,
          main: data.Photo[0]
        });
      });
  }

  componentDidMount() {
    this.getItem();
  }

  selectView(e) {
    this.setState({main: e});
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

  handleMainImageClick(e) {
    this.setState({
      isExpandedView: true
    });
  }

  getImageDimensions(e) {
    console.log(e);
  }

  render() {
    return (
      <>
        <AdditionalMedia images={this.state.images} selectView={this.selectView} />
        <div id='gall_wrapper'>
          <MainImage main={this.state.main} isExpandedView={this.state.isExpandedView} onMouseEnter={this.handleMouseEnter} onMouseMove={this.handleMouseMove} onMouseLeave={this.handleMouseLeave} onMainImageClick={this.handleMainImageClick} getImageDimensions={this.getImageDimensions} />
          <Caption caption={this.state.caption} />
        </div>
      </>
    );
  }
}

export default MediaContainer;