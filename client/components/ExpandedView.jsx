import React, { Component } from 'react';

class ExpandedView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id='gall_expanded' ref={node => this.modal = node}>Hello from ExpandedView~</div>
    );
  }
}

export default ExpandedView;