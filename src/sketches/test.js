import React from "react";
import React3 from "react-three-renderer";
import * as THREE from "three";

var OrbitControls = require("three-orbit-controls")(THREE);

class GreenCube extends React.Component {
  render() {
    return (
      <mesh>
        <boxGeometry width={200} height={200} depth={200} />
        <meshBasicMaterial color={0x00ee00} />
      </mesh>
    );
  }
}

export default class Example extends React.Component {
  componentDidMount() {
    const controls = new OrbitControls(this.refs.camera);
    this.controls = controls;
    console.log(this.controls);
  }

  componentWillUnmount() {
    this.controls.dispose();
    delete this.controls;
  }

  render() {
    var aspectratio = window.innerWidth / window.innerHeight;

    var cameraprops = {
      fov: 75,
      aspect: aspectratio,
      near: 0.1,
      far: 1000,
      position: new THREE.Vector3(300, 400, 600),
      lookAt: new THREE.Vector3(0, 0, 0)
    };

    return (
      <React3
        mainCamera="maincamera"
        width={window.innerWidth}
        height={window.innerHeight}
        clearColor={0xf5f9ff}
      >
        <scene>
          <perspectiveCamera ref="camera" name="maincamera" {...cameraprops} />
          <GreenCube />
        </scene>
      </React3>
    );
  }
}
