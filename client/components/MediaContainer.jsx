import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import MainImage from './MainImage.jsx';
import AdditionalMedia from './AdditionalMedia.jsx';
import Caption from './Caption.jsx';
import ZoomedImage from './zoom/ZoomedImage.jsx';
import MagnifierLens from './zoom/MagnifierLens.jsx';
import ExpandedView from './modal/ExpandedView.jsx';

class MediaContainer extends Component {
  constructor() {
    super();
    this.state = {
      id: 38,
      name: '',
      images: [],
      main: '',
      video: null,
      caption: 'Roll over image to zoom in',
      hoveredThumbnail: '',
      lensOffsetX: '0px',
      lensOffsetY: '0px',
      lensLeftDisplacement: '0px',
      lensTopDisplacement: '0px',
      zoomFactor: 2,
      zoomBackgroundSize: '',
      zoomBackgroundPosition: '',
      containerOffsetX: '0px',
      containerOffsetY: '0px',
      imageWidth: '0px',
      imageHeight: '0px',
      columnOffsetX: '0px',
      columnOffsetY: '0px',
      windowWidth: window.innerWidth * .47,
      windowHeight: window.innerHeight * .8,
      isImageMagnified: false,
      isExpandedView: false,
      isVideoLiked: false,
      isVideoDisliked: false,
      numberOfLikes: Math.floor(Math.random() * 15),
      numberOfDislikes: Math.floor(Math.random() * 15),
      x: 0,
      y: 0,
      dns: 'http://3.15.191.238'
    };

    this.selectView = this.selectView.bind(this);
    this.selectVideo = this.selectVideo.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.getLensDimensions = this.getLensDimensions.bind(this);
    this.getImageDimensions = this.getImageDimensions.bind(this);
    this.getColumnDimensions = this.getColumnDimensions.bind(this);
    this.moveLens = this.moveLens.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.showZoom = this.showZoom.bind(this);
    this.hideZoom = this.hideZoom.bind(this);
    this.showExpandedView = this.showExpandedView.bind(this);
    this.closeExpandedView = this.closeExpandedView.bind(this);
    this.closeExpandedViewWithX = this.closeExpandedViewWithX.bind(this);
    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.handleDislikeClick = this.handleDislikeClick.bind(this);
  }

  getItem(id) {
    axios.get(`${this.state.dns}/item`, {
      params: {
        id: id
      }
    })
      .then(({ data }) => {
        this.setState({
          name: data.ItemName,
          images: data.Photo,
          main: data.Photo[0],
          video: data.Video,
          hoveredThumbnail: data.Photo[0]
        });
      })
      .catch(err => {
        console.log('Error retrieving image photo');
      });
  }

  componentDidMount() {
    this.getItem(this.state.id);
    window.addEventListener('clickedProduct', event => {
      const product = event.detail;
      if (product) {
        this.setState({id: product}, () => {
          this.getItem(this.state.id);
        });
      }
    });
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
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
      isImageMagnified: !this.state.isImageMagnified,
      caption: this.state.caption === 'Click image to open expanded view' ? 'Roll over image to zoom in' : 'Click image to open expanded view'
    }, () => {
      document.addEventListener('mousemove', this.moveLens);
    });
  }

  handleMouseLeave(e) {
    this.setState({
      isImageMagnified: false,
      caption: 'Roll over image to zoom in'
    }, () => {
      document.removeEventListener('mousemove', this.moveLens);
      document.removeEventListener('click', this.showExpandedView);
    });
  }

  getLensDimensions(width, height) {
    this.setState({
      lensOffsetX: width,
      lensOffsetY: height
    });
  }

  getImageDimensions(containerWidth, containerHeight, imageWidth, imageHeight) {
    this.setState({
      containerOffsetX: containerWidth,
      containerOffsetY: containerHeight,
      imageWidth: imageWidth,
      imageHeight: imageHeight
    });
  }

  getColumnDimensions(width, height) {
    this.setState({
      columnOffsetX: width,
      columnOffsetY: height
    });
  }

  moveLens(e) {
    // Cursor and lens coordinates
    let cursorX = e.pageX;
    let cursorY = e.pageY;
    let lensX = cursorX - this.state.lensOffsetX / 2;
    let lensY = cursorY - this.state.lensOffsetY / 2;
    let horizontalImagePadding = (this.state.containerOffsetX - this.state.imageWidth) / 2;
    let verticalImagePadding = ((this.state.containerOffsetX - (this.state.containerOffsetX * 0.95)) / 2);
    let containerMargin = this.state.containerOffsetX * 0.01 + this.state.imageWidth * 0.01;
    let leftImageDisplacement = 15 + this.state.columnOffsetX + containerMargin + horizontalImagePadding;
    let rightImageDisplacement = window.innerWidth / 2 - horizontalImagePadding;
    let topImageDisplacement = 121 + verticalImagePadding;

    // Prevents lens from moving off image
    if (lensX <= leftImageDisplacement) {
      lensX = leftImageDisplacement;
    }
    if (lensX + this.state.lensOffsetX >= rightImageDisplacement) {
      lensX = rightImageDisplacement - this.state.lensOffsetX;
    }

    if (lensY > this.state.containerOffsetY - this.state.lensOffsetY + topImageDisplacement) {
      lensY = this.state.containerOffsetY - this.state.lensOffsetY + topImageDisplacement;
    }
    if (lensY <= topImageDisplacement) {
      lensY = topImageDisplacement;
    }

    if (e.pageX > leftImageDisplacement && e.pageX < rightImageDisplacement && e.pageY > topImageDisplacement && e.pageY < topImageDisplacement + this.state.containerOffsetY) {
      document.addEventListener('click', this.showExpandedView);
    }

    if (this.state.isExpandedView) {
      document.removeEventListener('click', this.showExpandedView);
    }

    let ratio = this.state.containerOffsetX / this.state.containerOffsetY;
    let heightZoomFactor = (this.state.containerOffsetX * this.state.zoomFactor) / (this.state.containerOffsetY * ratio);
    let backgroundPosition;

    // if ((cursorX - leftImageDisplacement) / this.state.imageWidth <= 0.5) {
    //   backgroundPosition = `${((lensX - leftImageDisplacement) / this.state.imageWidth) * 100}% ${((lensY - topImageDisplacement) / this.state.containerOffsetY) * 100}%`;
    // } else {
    //   backgroundPosition = `${((lensX - leftImageDisplacement) / this.state.imageWidth) * 100}% ${((lensY - topImageDisplacement) / this.state.containerOffsetY) * 100}%`;
    // }

    backgroundPosition = `${((cursorX - leftImageDisplacement) / this.state.imageWidth - this.state.lensOffsetX) * 100}% ${((cursorY - topImageDisplacement) / this.state.containerOffsetY - this.state.lensOffsetY) * 100}%`;

    this.setState({
      lensLeftDisplacement: lensX.toString() + 'px',
      lensTopDisplacement: lensY.toString() + 'px',
      zoomBackgroundSize: (this.state.containerOffsetX * this.state.zoomFactor).toString() + 'px auto',
      zoomBackgroundPosition: backgroundPosition
    });
  }

  handleResize() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  }

  showZoom() {
    this.setState({
      caption: 'Click image to open expanded view',
      isImageMagnified: true
    });
  }

  hideZoom() {
    this.setState({
      caption: 'Roll over image to zoom in',
      isImageMagnified: false
    });
  }

  showExpandedView(e) {
    this.setState({isExpandedView: true, isImageMagnified: false}, () => {
      document.removeEventListener('click', this.showExpandedView);
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

  render() {
    return (
      <>
        <AdditionalMedia
          images={this.state.images}
          video={this.state.video}
          hoveredThumbnail={this.state.hoveredThumbnail}
          selectView={this.selectView}
          selectVideo={this.selectVideo}
          getColumnDimensions={this.getColumnDimensions}
        />
        <div id='gall_wrapper'>
          <MainImage
            name={this.state.name}
            main={this.state.main}
            isExpandedView={this.state.isExpandedView}
            containerWidth={this.state.containerOffsetX}
            containerHeight={this.state.containerOffsetY}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            showExpandedView={this.showExpandedView}
            getImageDimensions={this.getImageDimensions}
          />
          {!this.state.main.includes('cloudfront') && <Caption caption={this.state.caption} />}
        </div>

        {this.state.isImageMagnified && !this.state.main.includes('cloudfront') && ReactDOM.createPortal(<MagnifierLens
          ref={node => this.magnifier = node}
          isImageMagnified={this.state.isImageMagnified}
          lensLeftDisplacement={this.state.lensLeftDisplacement}
          lensTopDisplacement={this.state.lensTopDisplacement}
          getLensDimensions={this.getLensDimensions}
        />, document.getElementById('gall_lensContainer'))}

        {this.state.isImageMagnified && !this.state.main.includes('cloudfront') && ReactDOM.createPortal(<ZoomedImage
          main={this.state.main}
          windowWidth={this.state.windowWidth}
          windowHeight={this.state.windowHeight}
          backgroundSize={this.state.zoomBackgroundSize}
          backgroundPosition={this.state.zoomBackgroundPosition}
        />, document.getElementById('gall_zoomedContainer'))}

        {(this.state.isExpandedView) && ReactDOM.createPortal(<ExpandedView
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
        />, document.getElementById('gall_modal'))}
      </>
    );
  }
}

export default MediaContainer;