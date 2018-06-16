/* global requestAnimationFrame */
import React, { Component } from 'react';
import * as THREE from 'three';
import styles from './styles.css';


export default class SceneExample extends Component {
  componentDidMount() {
    const scene = new THREE.Scene();
    // eslint-disable-next-line
    const camera = new THREE.PerspectiveCamera(70, this.threeRootElement.clientWidth / this.threeRootElement.clientHeight, 1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(this.threeRootElement.clientWidth, this.threeRootElement.clientHeight);
    this.threeRootElement.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
    scene.background = new THREE.Color(0xf0f0f0);

    camera.position.y = 150;
    camera.position.z = 500;

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();
  }

  render() {
    return (
      <div className={styles.scene} ref={(element) => { this.threeRootElement = element; }} />
    );
  }
}
