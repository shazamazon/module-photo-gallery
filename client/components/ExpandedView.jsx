import React, { Component } from 'react';
import ExpandedImageContent from './ExpandedImageContent.jsx';
import ExpandedColumn from './ExpandedColumn.jsx';

class ExpandedView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedMain: this.props.main
    };
  }

  render() {
    return (
      <div id='gall_expanded' ref={node => this.modal = node}>
        <span id='gall_close'>
          <img src='https://shazamazon.s3.us-east-2.amazonaws.com/icons/close.png' />
        </span>
        {this.props.video && (
          <ul id='gall_tabs'>
            <li>RELATED VIDEOS</li>
            <li>IMAGES</li>
          </ul>
        )}
        <div id={this.props.video ? 'gall_withVideo' : 'gall_withoutVideo'}>
          <ExpandedImageContent
            expandedMain={this.props.expandedMain}
            video={this.props.video}
          />
          <ExpandedColumn
            name={this.props.name}
            images={this.props.images}
            video={this.props.video}
          />
        </div>
      </div>
    );
  }
}

export default ExpandedView;