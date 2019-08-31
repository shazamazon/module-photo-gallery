import React, { Component } from 'react';
import ExpandedImageContent from './ExpandedImageContent.jsx';
import ExpandedColumn from './ExpandedColumn.jsx';

class ExpandedView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedMain: this.props.main,
      selectedThumbnail: '',
      hoveredThumbnail: ''
    };

    this.selectImage = this.selectImage.bind(this);
    this.handleHoverOverThumbnail = this.handleHoverOverThumbnail.bind(this);
    this.handleHoverOffThumbnail = this.handleHoverOffThumbnail.bind(this);
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

  render() {
    return (
      <div id='gall_disable'>
        <div id='gall_expanded' ref={node => this.modal = node}>
          <span id={'gall_close'} onClick={this.props.closeExpandedViewWithX}>
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
              expandedMain={this.state.expandedMain ? this.state.expandedMain : this.props.expandedMain}
              video={this.props.video}
            />
            <ExpandedColumn
              name={this.props.name}
              images={this.props.images}
              video={this.props.video}
              selectedThumbnail={this.state.selectedThumbnail ? this.state.selectedThumbnail : this.props.expandedMain}
              hoveredThumbnail={this.state.hoveredThumbnail}
              selectImage={this.selectImage}
              onHoverOverThumbnail={this.handleHoverOverThumbnail}
              onHoverOffThumbnail={this.handleHoverOffThumbnail}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ExpandedView;