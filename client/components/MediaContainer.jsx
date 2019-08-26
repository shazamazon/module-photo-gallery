import React, { Component } from 'react';
import axios from 'axios';

import MainImage from './MainImage.jsx';
import AdditionalMedia from './AdditionalMedia.jsx';
import Caption from './Caption.jsx';

class MediaContainer extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      main: '',
      caption: 'Roll over image to zoom in'
    };

    this.selectView = this.selectView.bind(this);
  }

  getItem() {
    axios.get('/items')
      .then(({ data }) => {
        this.setState({
          images: data[0].images,
          main: data[0].images[0]
        });
      });
  }

  componentDidMount() {
    this.getItem();
  }

  selectView(e) {
    this.setState({main: e});
  }

  render() {
    return (
      <>
        <AdditionalMedia images={this.state.images} selectView={this.selectView} />
        <div id='gall_wrapper'>
          <MainImage main={this.state.main} />
          <Caption caption={this.state.caption} />
        </div>
      </>
    );
  }
}

export default MediaContainer;