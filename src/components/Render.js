import React from "react";
import "../css/render.css";
import * as THREE from "three";
import React3 from "react-three-renderer";
import { ShareButtons, generateShareIcon } from "react-share";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const OrbitControls = require("three-orbit-controls")(THREE);

//generate icons for sharing
const TwitterIcon = generateShareIcon("twitter");
const EmailIcon = generateShareIcon("email");
const LinkedInIcon = generateShareIcon("linkedin");
const RedditIcon = generateShareIcon("reddit");
const url = "http://localhost:3001/render/59f86663-847e-45c8-9bb9-516991cfcdca";

class Render extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.meshPosition = new THREE.Vector3(0, 0, 0);

    this.state = {
      cubeRotation: new THREE.Euler(),
      geometry: { vertices: [], faces: [], faceVertexUvs: [] },
      texture: { uuid: "" }
    };

    this._onAnimate = () => {
      this.setState({
        cubeRotation: new THREE.Euler(0, this.state.cubeRotation.y + 0.01, 0)
      });
    };
  }

  componentDidMount() {
    // if (this.props.textureUrl.length < 1) {
    //   this.props.history.push("/dashboard");
    // }
    const model = this.props.model.length > 0 ? this.props.model : "female";

    const loader = new THREE.JSONLoader();
    loader.load(`/${model}-tee.json`, geometry => {
      geometry.center();
      this.setState({ geometry: geometry });
      setTimeout(() => {
        const controls = new OrbitControls(this.refs.camera);
        this.controls = controls;
      }, 300);
    });
    console.log("about to load");
    const texture = new THREE.TextureLoader();
    texture.crossOrigin = "Anonymous";

    texture.load(
      `https://thread-d.s3.amazonaws.com/undefined/${
        this.props.match.params.url
      }.jpg`,
      texture => {
        console.log("loaded!");
        console.log(texture);
        this.setState({ texture });
      }
    );
  }

  componentWillUnmount() {
    if (this.controls) {
      console.log("in component will unmount", this.controls);
      this.controls.dispose();
      delete this.controls;
      console.log("deleting controls", this.controls);
    }
  }

  handleBackClick = e => {
    this.props.history.push("/dashboard");
  };

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height
    if (
      this.state.geometry.vertices.length > 0 &&
      this.state.texture.uuid.length > 0
    ) {
      const cameraProps = {
        fov: 75,
        aspect: width / height,
        near: 0.1,
        far: 1000,
        position: new THREE.Vector3(0, 0, 7),
        lookAt: new THREE.Vector3(0, 0, -6)
      };
      return (
        <div id="render">
          <div id="share-icons">
            <ShareButtons.TwitterShareButton
              url={url}
              title="I designed this t-shirt on thread'd. Check out this awesome 3D model."
              hashtags={["threadd", "customdesign", "futurefashion"]}
              children={<TwitterIcon size={32} round={true} />}
            />
            <ShareButtons.RedditShareButton
              url={url}
              title="I designed a custom t-shirt on thread'd. Check out this awesome 3D model and make you own!"
              children={<RedditIcon size={32} round={true} />}
            />
            <ShareButtons.LinkedinShareButton
              url={url}
              title="I designed a custom t-shirt on thread'd. Check out this awesome 3D model and make you own!"
              description="thread'd was made with React and Rails by Shirley Lin"
              children={<LinkedInIcon size={32} round={true} />}
            />
            <ShareButtons.EmailShareButton
              url={url}
              children={<EmailIcon size={32} round={true} />}
            />
          </div>
          <React3
            mainCamera="camera"
            width={width}
            height={height}
            clearColor={0x323232}
          >
            <scene>
              <perspectiveCamera ref="camera" name="camera" {...cameraProps}>
                <pointLight position={new THREE.Vector3(100, 0, 150)} />
              </perspectiveCamera>

              <mesh
                position={this.meshPosition}
                rotation={this.state.cubeRotation}
              >
                <geometry
                  vertices={this.state.geometry.vertices}
                  faces={this.state.geometry.faces}
                  faceVertexUvs={this.state.geometry.faceVertexUvs}
                />
                <meshLambertMaterial map={this.state.texture} />
              </mesh>
            </scene>
          </React3>
          <div id="render-bottom-bar">
            {this.props.loggedIn ? (
              <button onClick={this.handleBackClick} id="render-back">
                BACK
              </button>
            ) : (
              <button onClick={this.handleBackClick} id="render-back">
                SIGN UP
              </button>
            )}

            <span>
              Click and Drag to move around model. Scroll to zoom in and out.
            </span>
            <button style={{ display: "hidden" }} />
          </div>
        </div>
      );
    } else {
      return (
        <div id="loading" style={{ height: window.innerHeight }}>
          <h1>Loading...</h1>
        </div>
      );
    }
  }
}

//mesh

const mapStateToProps = state => {
  return {
    textureUrl: state.currentPattern,
    loggedIn: state.loggedIn,
    model: state.currentModel
  };
};

export default withRouter(connect(mapStateToProps)(Render));
