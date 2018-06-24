/* global requestAnimationFrame, document */
import React, { Component } from 'react';
import createOrbitControls from 'three-orbit-controls';
import * as THREE from 'three';
import styles from './styles.css';
import buildBox from '../Game/buildBox';

export default class SceneExample extends Component {
  constructor(props) {
    super(props);

    this.container = React.createRef();

    this.state = {
      toggleDirectionAnimation: 'up', // up or down
      animationAxis: 'x' // x or z
    };

    this.renderScene = this.renderScene.bind(this);
    this.createLights = this.createLights.bind(this);
    this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
    this.toggleAnimationAxis = this.toggleAnimationAxis.bind(this);
    this.init = this.init.bind(this);
  }

  componentDidMount() {
    this.init();
    this.renderScene();
  }

  onDocumentKeyDown(event) {
    const keyCode = event.which;
    if (keyCode === 32) {
      this.toggleAnimationAxis();
    }
  }

  init() {
    const width = this.container.current.clientWidth;
    const height = this.container.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 5000);

    const axesHelper = new THREE.AxesHelper(500);
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const OrbitControls = createOrbitControls(THREE);
    // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    // scene.add(directionalLight);

    camera.position.x = 200;
    camera.position.y = 200;
    camera.position.z = 200;
    camera.lookAt(0, 0, 0);

    scene.background = new THREE.Color(0x0031343C);

    renderer.setSize(this.container.current.clientWidth, this.container.current.clientHeight);
    this.container.current.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    const mainBox = buildBox(100, 10, 100);
    mainBox.position.set(50, 5, 50);
    scene.add(mainBox);

    const box = buildBox(100, 10, 100);
    box.position.set(50, 15, 50);
    scene.add(box);

    // light.position.set(152, 152, 152);
    scene.add(axesHelper);

    this.controls = controls;
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.box = box;

    this.createLights();

    document.addEventListener('keydown', this.onDocumentKeyDown, false);
  }

  toggleAnimationAxis() {
    this.setState({
      animationAxis: this.state.animationAxis === 'x' ? 'z' : 'x'
    });
  }

  createLights() {
    const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
    const shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
    const ambientLight = new THREE.AmbientLight(0xdc8874, 0.5);

    shadowLight.position.set(150, 350, 350);
    shadowLight.castShadow = true;

    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;

    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    this.scene.add(hemisphereLight);
    this.scene.add(shadowLight);
    this.scene.add(ambientLight);
  }

  animationOnZAxis() {
    if (this.box.position.z >= 180) {
      this.setState({
        toggleDirectionAnimation: 'up'
      });
    } else if (this.box.position.z < -80) {
      this.setState({
        toggleDirectionAnimation: 'down'
      });
    }

    if (this.state.toggleDirectionAnimation === 'down') {
      this.box.position.set(this.box.position.x, this.box.position.y, this.box.position.z + 3);
    } else {
      this.box.position.set(this.box.position.x, this.box.position.y, this.box.position.z - 3);
    }
  }

  animationOnXAxis() {
    if (this.box.position.x >= 180) {
      this.setState({
        toggleDirectionAnimation: 'up'
      });
    } else if (this.box.position.x < -80) {
      this.setState({
        toggleDirectionAnimation: 'down'
      });
    }

    if (this.state.toggleDirectionAnimation === 'down') {
      this.box.position.set(this.box.position.x + 3, this.box.position.y, this.box.position.z);
    } else {
      this.box.position.set(this.box.position.x - 3, this.box.position.y, this.box.position.z);
    }
  }

  renderScene() {
    requestAnimationFrame(this.renderScene);
    this.renderer.render(this.scene, this.camera);

    if (this.state.animationAxis === 'x') {
      this.animationOnXAxis();
    } else {
      this.animationOnZAxis();
    }
  }

  render() {
    return (
      <div className={styles.scene} ref={this.container} />
    );
  }
}
