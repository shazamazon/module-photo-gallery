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
  }

  getItem() {
    axios.get('/items')
      .then(({ data }) => {
        this.setState({images: data[0].images});
      });
  }

  componentDidMount() {
    this.getItem();
  }

  render() {
    return (
      <>
        {this.state.images.map(image => <img src={image}/>)}
        <AdditionalMedia />
        <MainImage />
        <Caption />
      </>
    );
  }
}

export default MediaContainer;