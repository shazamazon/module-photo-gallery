import React, { Component } from 'react';

import Image from './Image.jsx';
import Video from './Video.jsx';

class AdditionalMedia extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getColumnDimensions(this.column.offsetWidth, this.column.offsetHeight);
  }

  render() {
    return (
      <div ref={node => this.column = node} id='gall_additional'>
        {this.props.images.slice(0, 6).map((image, index) =>
          <Image
            key={index}
            image={image}
            hoveredThumbnail={this.props.hoveredThumbnail}
            selectView={this.props.selectView}
          />
        )}
        {this.props.video && <Video
          video={this.props.video}
          hoveredThumbnail={this.props.hoveredThumbnail}
          selectVideo={this.props.selectVideo}
        />}
      </div>
    );
  }
}

export default AdditionalMedia;