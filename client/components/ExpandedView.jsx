import React, { Component } from 'react';

class ExpandedView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id='gall_expanded' ref={node => this.modal = node}>
        <span id='gall_close'>
          <img src='https://shazamazon.s3.us-east-2.amazonaws.com/icons/close.png' />
        </span>
      </div>
    );
  }
}

export default ExpandedView;