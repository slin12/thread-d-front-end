import React from "react";
import "../css/render.css";
import * as THREE from "three";
import React3 from "react-three-renderer";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const OrbitControls = require("three-orbit-controls")(THREE);

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
    const loader = new THREE.JSONLoader();
    loader.load("new-origin.json", geometry => {
      geometry.center();
      this.setState({ geometry: geometry });
    });
    console.log("about to load");
    const texture = new THREE.TextureLoader();
    // texture.crossOrigin = "Anonymous";
    // this.props.textureUrl
    texture.load("scroll-icon.jpg", texture => {
      console.log("loaded!");
      console.log(texture);
      this.setState({ texture });
    });
  }

  _onCameraMounted = cameraObj => {
    setTimeout(() => {
      this.controls = new OrbitControls(cameraObj);
      console.log("camera mounted!", this.controls);
    }, 200);
  };

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height
    console.log("controls", this.controls);
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
          <React3
            mainCamera="camera"
            width={width}
            height={height}
            clearColor={0x323232}
          >
            <scene>
              <perspectiveCamera
                ref={this._onCameraMounted}
                name="camera"
                {...cameraProps}
              >
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
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}

//mesh

const mapStateToProps = state => {
  return { textureUrl: state.currentPattern };
};

export default withRouter(connect(mapStateToProps)(Render));
