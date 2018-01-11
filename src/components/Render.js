import React from "react";
import "../css/render.css";
import * as THREE from "three";
import React3 from "react-three-renderer";

class Render extends React.Component {
  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 0, 6);

    this.state = {
      cubeRotation: new THREE.Euler(),
      geometry: { vertices: [], faces: [] }
    };

    this._onAnimate = () => {
      // we will get this callback every frame

      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      this.setState({
        cubeRotation: new THREE.Euler(
          this.state.cubeRotation.x + 0.1,
          this.state.cubeRotation.y + 0.1,
          0
        )
      });
    };
  }

  componentDidMount() {
    const loader = new THREE.JSONLoader();
    console.log("loader", loader);
    loader.load("tee.json", geometry => {
      this.setState({ geometry: geometry });
      // mesh = new THREE.Mesh(geometry, material);
      // mesh.position.z = -10;
      // mesh.position.y = -10;
      // mesh.position.x = 0;
      // scene.add(mesh);
    });
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height
    console.log(this.state.geometry);
    return (
      <React3
        mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
        width={width}
        height={height}
        onAnimate={this._onAnimate}
      >
        <scene>
          <perspectiveCamera
            name="camera"
            fov={45}
            aspect={width / height}
            near={0.1}
            far={10000}
            position={this.cameraPosition}
          />
          <mesh position={new THREE.Vector3(0, -10, -10)}>
            <geometry
              vertices={this.state.geometry.vertices}
              faces={this.state.geometry.faces}
            />
            <meshNormalMaterial />
          </mesh>
        </scene>
      </React3>
    );
  }
}

export default Render;
