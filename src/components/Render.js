import React from "react";
import "../css/render.css";
import * as THREE from "three";
import React3 from "react-three-renderer";
import { ShareButtons, generateShareIcon } from "react-share";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const OrbitControls = require("three-orbit-controls")(THREE);

//generate icons for sharing
const TwitterIcon = generateShareIcon("twitter");
const EmailIcon = generateShareIcon("email");
const LinkedInIcon = generateShareIcon("linkedin");
const RedditIcon = generateShareIcon("reddit");

class Render extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.meshPosition = new THREE.Vector3(0, 0, 0);

    //initial state of our geometry
    this.state = {
      cubeRotation: new THREE.Euler(),
      geometry: { vertices: [], faces: [], faceVertexUvs: [] },
      texture: { uuid: "" }
    };
  }

  loadTexture = () => {
    const texture = new THREE.TextureLoader();
    texture.crossOrigin = "Anonymous";
    texture.load(
      `https://thread-d.s3.amazonaws.com/undefined/${
        this.props.match.params.url
      }.jpg`,
      texture => {
        this.setState({ texture });
        //make the orbit controls here so it's waiting until texture and model are loaded.
        const controls = new OrbitControls(this.refs.camera);
        controls.position0.set(0, 0, 0);
        controls.minDistance = 5;
        controls.maxDistance = 30;
        this.controls = controls;
      },
      undefined,
      err => {
        this.props.history.push("/");
      }
    );
  };

  componentDidMount() {
    //make female the default model
    const model = this.props.model.length > 0 ? this.props.model : "female";

    //load geometry
    const loader = new THREE.JSONLoader();
    loader.load(
      `/${model}-tee.json`,
      geometry => {
        geometry.center();
        this.setState({ geometry: geometry });
        // after the model is loaded, load the texture
        this.loadTexture();
      },
      undefined,
      err => {
        this.props.history.push("/");
      }
    );

    //load texture from url
  }

  componentWillUnmount() {
    //clean up the orbit controls
    if (this.controls) {
      this.controls.dispose();
      delete this.controls;
    }
  }

  //go back to dashboard
  handleBackClick = e => {
    this.props.history.push("/dashboard");
  };

  render() {
    console.log(this.props);
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height
    //get current url for sharing purposes
    const url = `https://threadd-adc5f.firebaseapp.com${
      this.props.location.pathname
    }`;
    //make sure geometry and texture are loaded before rendering
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
          {this.props.loggedIn ? (
            <div id="share-icons">
              <ShareButtons.TwitterShareButton
                url={url}
                title="I designed this t-shirt on thread'd. Check out this awesome 3D model and make your own!"
                hashtags={["threadd", "customdesign", "futurefashion"]}
                children={<TwitterIcon size={32} round={true} />}
              />
              <ShareButtons.RedditShareButton
                url={url}
                title="I designed a custom t-shirt on thread'd. Check out this awesome 3D model and make your own!"
                children={<RedditIcon size={32} round={true} />}
              />
              <ShareButtons.LinkedinShareButton
                url={url}
                title="I designed a custom t-shirt on thread'd. Check out this awesome 3D model and make your own!"
                description="thread'd was made with React and Rails by Shirley Lin"
                children={<LinkedInIcon size={32} round={true} />}
              />
              <ShareButtons.EmailShareButton
                url={url}
                children={<EmailIcon size={32} round={true} />}
              />
            </div>
          ) : null}
          <ReactCSSTransitionGroup
            transitionName="slide-down"
            transitionAppear={true}
            transitionAppearTimeout={1000}
            transitionEnter={false}
            transitionLeave={false}
          >
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
          </ReactCSSTransitionGroup>
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
            <button style={{ visibility: "hidden" }} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="loading" style={{ height: window.innerHeight }}>
          <ReactCSSTransitionGroup
            transitionName="loading"
            transitionAppear={true}
            transitionAppearTimeout={700}
            transitionEnter={false}
            transitionLeave={false}
          >
            <h1 key="render-loading">Loading...</h1>
          </ReactCSSTransitionGroup>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    textureUrl: state.currentPattern,
    loggedIn: state.loggedIn,
    model: state.currentModel
  };
};

export default withRouter(connect(mapStateToProps)(Render));
