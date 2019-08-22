import React, { Component } from 'react';
import axios from 'axios';

class MediaContainer extends Component {
  constructor() {
    super();
    this.state = {
      images: []
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
      </>
    );
  }
}

export default MediaContainer;