import React, { Component } from 'react';

// const MainImage = (props) => {
//   return (
//     <>
//       <div
//         id={props.main.includes('cloudfront') ? 'gall_video' : 'gall_main'}
//         onMouseEnter={props.onMouseEnter}
//         onMouseMove={props.moveLens}
//         onMouseLeave={props.onMouseLeave}
//       >
//         {props.main.includes('cloudfront') ? (
//           <video
//             src={props.main + '#t=1'}
//             preload='metadata'
//             onClick={props.showExpandedView}
//           ></video>
//         ) : (
//           <img
//             src={props.main}
//             alt={props.name}
//             onClick={props.showExpandedView}
//             onLoad={(e) => props.getImageDimensions()}
//           />
//         )}
//       </div>
//     </>
//   );
// };

class MainImage extends Component {
  constructor(props) {
    super(props);
  }

  getDimensions(e) {
    const naturalWidth = e.nativeEvent.path[0].naturalWidth;
    const naturalHeight = e.nativeEvent.path[0].naturalHeight;
    const ratio = naturalWidth / naturalHeight;
    let imageWidth;
    let imageHeight;

    if (naturalWidth > naturalHeight) {
      imageWidth = this.image.offsetWidth * .99;
      imageHeight = imageWidth / ratio;
    } else if (naturalWidth === naturalHeight) {
      imageWidth = this.image.offsetWidth * .99;
      imageHeight = this.image.offsetHeight * .95;
    } else {
      imageHeight = this.image.offsetHeight;
      imageWidth = imageHeight * ratio;
    }

    this.props.getImageDimensions(this.image.offsetWidth, this.image.offsetHeight, imageWidth, imageHeight);
  }

  render() {
    return (
      <>
        <div
          id={this.props.main.includes('cloudfront') ? 'gall_video' : 'gall_main'}
          onMouseEnter={e => this.props.onMouseLeave(e)}
        >
          {this.props.main.includes('cloudfront') ? (
            <video
              src={this.props.main + '#t=1'}
              preload='metadata'
              onClick={this.props.showExpandedView}
            ></video>
          ) : (
            <img
              ref={node => this.image = node}
              src={this.props.main}
              alt={this.props.name}
              onClick={this.props.showExpandedView}
              onLoad={(e) => this.getDimensions(e)}
              onMouseEnter={e => this.props.onMouseEnter(e)}
            />
          )}
        </div>
      </>
    );
  }
}

export default MainImage;