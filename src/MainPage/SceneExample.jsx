/* global requestAnimationFrame */
import React, { Component } from 'react';
import createOrbitControls from 'three-orbit-controls';
import * as THREE from 'three';
import styles from './styles.css';
import buildBox from '../Game/buildBox';

export default class SceneExample extends Component {
  constructor(props) {
    super(props);

    this.container = React.createRef();

    this.renderScene = this.renderScene.bind(this);
    this.init = this.init.bind(this);
  }

  componentDidMount() {
    this.init();
    this.renderScene();
  }

  init() {
    // eslint-disable-next-line
    const camera = new THREE.PerspectiveCamera(45, this.container.current.clientWidth / this.container.current.clientHeight, 1, 1000);

    const axesHelper = new THREE.AxesHelper(500);
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const OrbitControls = createOrbitControls(THREE);
    const light = new THREE.PointLight(0xff0000, 1, 100);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(directionalLight);

    camera.position.x = 200;
    camera.position.y = 200;
    camera.position.z = 200;
    camera.lookAt(0, 0, 0);

    scene.background = new THREE.Color(0x0031343C);

    renderer.setSize(this.container.current.clientWidth, this.container.current.clientHeight);
    this.container.current.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    const mainBox = buildBox(100, 20, 100);
    mainBox.position.set(50, 10, 50);
    scene.add(mainBox);

    const box = buildBox(100, 20, 100);
    box.position.set(50, 40, 50);
    scene.add(box);

    light.position.set(152, 152, 152);
    scene.add(light);
    scene.add(axesHelper);

    this.controls = controls;
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
  }

  renderScene() {
    requestAnimationFrame(this.renderScene);
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div className={styles.scene} ref={this.container} />
    );
  }
}
