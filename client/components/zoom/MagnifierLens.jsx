import React, { Component } from 'react';

class MagnifierLens extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getLensDimensions(this.lens.offsetWidth, this.lens.offsetHeight);
  }

  render() {
    return (
      <div
        ref={node => this.lens = node}
        id='gall_lens'
        style={{
          left: this.props.lensLeftDisplacement,
          top: this.props.lensTopDisplacement
        }}
      ></div>
    );
  }
}

export default MagnifierLens;