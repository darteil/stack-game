/* global requestAnimationFrame, cancelAnimationFrame */
import createOrbitControls from 'three-orbit-controls';
import * as THREE from 'three';
import buildBox from './buildBox';
import Helpers from './helpers';


export default class Game {
  constructor(container) {
    this.xAxis = {
      prevBox: null,
      widthPrevBox: 100,
      activeBox: null
    };

    this.zAxis = {
      prevBox: null,
      depthPrevBox: 100,
      activeBox: null
    };

    this.stopGameStatus = true;
    this.container = container;
    this.currentYPosition = 15;
    this.requestId = null;
    this.directionAnimation = 'up'; // up or down
    this.animationAxis = 'x'; // x or z
    this.controls = null;
    this.scene = null;
    this.camera = null;
    this.renderer = null;

    this.setNewStack = this.setNewStack.bind(this);
  }

  init() {
    const width = this.container.current.clientWidth;
    const height = this.container.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 5000);

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

    // light.position.set(152, 152, 152);

    this.controls = controls;
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    this.addBoxesForInit();

    this.createLights();
  }

  addBoxesForInit() {
    const firstBox = buildBox(100, 10, 100);
    firstBox.position.set(50, 5, 50);
    firstBox.name = 'first-box';
    this.scene.add(firstBox);

    const secondBox = buildBox(100, 10, 100);
    secondBox.position.set(50, this.currentYPosition, 50);
    secondBox.name = 'second-box';
    this.scene.add(secondBox);

    this.xAxis.activeBox = secondBox;
    this.xAxis.prevBox = firstBox;
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

  animationOnXAxis(boxObject) {
    if (boxObject.position.x >= 180) {
      this.directionAnimation = 'up';
    } else if (boxObject.position.x < -80) {
      this.directionAnimation = 'down';
    }

    if (this.directionAnimation === 'down') {
      boxObject.position.set(boxObject.position.x + 3, boxObject.position.y, boxObject.position.z);
    } else {
      boxObject.position.set(boxObject.position.x - 3, boxObject.position.y, boxObject.position.z);
    }
  }

  animationOnZAxis(boxObject) {
    if (boxObject.position.z >= 180) {
      this.directionAnimation = 'up';
    } else if (boxObject.position.z < -80) {
      this.directionAnimation = 'down';
    }

    if (this.directionAnimation === 'down') {
      boxObject.position.set(boxObject.position.x, boxObject.position.y, boxObject.position.z + 3);
    } else {
      boxObject.position.set(boxObject.position.x, boxObject.position.y, boxObject.position.z - 3);
    }
  }

  toggleAnimationAxis() {
    this.animationAxis = this.animationAxis === 'x' ? 'z' : 'x';
  }

  stopGame() {
    if (this.animationAxis === 'x') {
      this.scene.remove(this.xAxis.activeBox);
    } else {
      this.scene.remove(this.zAxis.activeBox);
    }
    this.stopGameStatus = true;
  }

  restartGame() {
    cancelAnimationFrame(this.requestId);

    this.xAxis = {
      prevBox: null,
      widthPrevBox: 100,
      activeBox: null
    };

    this.zAxis = {
      prevBox: null,
      depthPrevBox: 100,
      activeBox: null
    };

    this.stopGameStatus = true;
    this.currentYPosition = 15;
    this.requestId = null;
    this.directionAnimation = 'up'; // up or down
    this.animationAxis = 'x'; // x or z

    for (let i = this.scene.children.length - 1; i >= 0; i -= 1) {
      if (this.scene.children[i].type === 'Mesh') {
        this.scene.remove(this.scene.children[i]);
      }
    }

    this.addBoxesForInit();
    this.start();
  }

  start() {
    this.stopGameStatus = false;
    this.render();
  }

  createNewStack() {
    if (this.animationAxis === 'x') {
      const newBox = buildBox(this.zAxis.depthPrevBox, 10, this.xAxis.widthPrevBox);
      const newActiveBox = buildBox(this.zAxis.depthPrevBox, 10, this.xAxis.widthPrevBox);

      const positionForNewBox = Helpers.getPositionForNewBox(
        this.xAxis.activeBox.position.x,
        this.xAxis.prevBox.position.x
      );

      newBox.position.set(positionForNewBox, this.currentYPosition, this.xAxis.prevBox ? this.xAxis.prevBox.position.z : 50);
      newActiveBox.position.set(positionForNewBox, this.currentYPosition + 10, -80);

      this.currentYPosition += 10;

      this.scene.remove(this.xAxis.activeBox);
      this.scene.add(newBox);
      this.scene.add(newActiveBox);

      this.zAxis.prevBox = newBox;
      this.zAxis.activeBox = newActiveBox;
    }

    if (this.animationAxis === 'z') {
      const newBox = buildBox(this.zAxis.depthPrevBox, 10, this.xAxis.widthPrevBox);
      const newActiveBox = buildBox(this.zAxis.depthPrevBox, 10, this.xAxis.widthPrevBox);

      const positionForNewBox = Helpers.getPositionForNewBox(
        this.zAxis.activeBox.position.z,
        this.zAxis.prevBox.position.z
      );

      newBox.position.set(this.zAxis.prevBox.position.x, this.currentYPosition, positionForNewBox);
      newActiveBox.position.set(-80, this.currentYPosition + 10, positionForNewBox);

      this.currentYPosition += 10;

      this.scene.remove(this.zAxis.activeBox);
      this.scene.add(newBox);
      this.scene.add(newActiveBox);

      this.xAxis.prevBox = newBox;
      this.xAxis.activeBox = newActiveBox;
    }
  }

  setNewStack() {
    if (this.stopGameStatus) {
      return false;
    }

    if (this.animationAxis === 'x') {
      if (!Helpers.checkIntersection(this.xAxis.prevBox, this.xAxis.activeBox, this.zAxis.depthPrevBox, 'x')) {
        this.stopGame();
        return false;
      }

      this.zAxis.depthPrevBox = Helpers.getWidthNewBox(
        this.xAxis.activeBox.position.x,
        this.xAxis.prevBox.position.x,
        this.zAxis.depthPrevBox
      );

      this.createNewStack();
    }

    if (this.animationAxis === 'z') {
      if (!Helpers.checkIntersection(this.zAxis.prevBox, this.zAxis.activeBox, this.xAxis.widthPrevBox, 'z')) {
        this.stopGame();
        return false;
      }

      this.xAxis.widthPrevBox = Helpers.getWidthNewBox(
        this.zAxis.activeBox.position.z,
        this.zAxis.prevBox.position.z,
        this.xAxis.widthPrevBox
      );

      this.createNewStack();
    }

    this.toggleAnimationAxis();

    return true;
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    this.controls.update();

    if (!this.stopGameStatus) {
      if (this.animationAxis === 'x') {
        this.animationOnXAxis(this.xAxis.activeBox);
      } else {
        this.animationOnZAxis(this.zAxis.activeBox);
      }
    }

    this.requestId = requestAnimationFrame(this.render.bind(this));
  }
}
