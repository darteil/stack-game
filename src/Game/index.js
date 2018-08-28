/* global requestAnimationFrame, cancelAnimationFrame, window */
import {
  PerspectiveCamera,
  Scene,
  Fog,
  WebGLRenderer,
  Vector3,
  Color,
  HemisphereLight,
  DirectionalLight,
  AmbientLight
} from 'three';
import TWEEN from '@tweenjs/tween.js';
import buildBox from './buildBox';
import Helpers from './helpers';


export default class Game {
  constructor(container) {
    this.xAxis = {
      prevBox: null,
      widthPrevBox: 50,
      activeBox: null
    };

    this.zAxis = {
      prevBox: null,
      depthPrevBox: 50,
      activeBox: null
    };

    this.vectorForCamera = null;
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

    this.count = 0;

    this.setNewStack = this.setNewStack.bind(this);
  }

  init() {
    const width = this.container.current.clientWidth;
    const height = this.container.current.clientHeight;

    const camera = new PerspectiveCamera(70, width / height, 0.1, 5000);
    // const camera = new THREE.OrthographicCamera(width / -5, width / 5, height / 5, height / -5, 2, 1000);

    const scene = new Scene();
    scene.fog = new Fog(0xf7d9aa, 100, 950);
    const renderer = new WebGLRenderer({ antialias: true });
    // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    // scene.add(directionalLight);

    this.vectorForCamera = new Vector3(0, 0, 0);

    camera.position.x = 130;
    camera.position.z = 130;

    scene.background = new Color(0x0070726E);

    renderer.setSize(this.container.current.clientWidth, this.container.current.clientHeight);

    this.container.current.appendChild(renderer.domElement);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    this.addBoxesForInit();

    this.createLights();
    window.addEventListener('resize', this.onWindowResize, false);
  }

  addBoxesForInit() {
    const firstBox = buildBox(50, 10, 50);
    firstBox.position.set(50, 5, 50);
    this.scene.add(firstBox);

    const secondBox = buildBox(50, 10, 50);
    secondBox.position.set(50, this.currentYPosition, 50);
    this.scene.add(secondBox);

    this.xAxis.activeBox = secondBox;
    this.xAxis.prevBox = firstBox;

    this.camera.position.y = this.xAxis.prevBox.position.y + 125;
    this.vectorForCamera.x = this.xAxis.prevBox.position.x;
    this.vectorForCamera.y = this.xAxis.prevBox.position.y;
    this.vectorForCamera.z = this.xAxis.prevBox.position.z;
  }

  createLights() {
    const hemisphereLight = new HemisphereLight(0xaaaaaa, 0x000000, 0.5);
    const shadowLight = new DirectionalLight(0xffffff, 0.5);
    const ambientLight = new AmbientLight(0xdc8874, 0.5);

    shadowLight.position.set(150, 350, -350);
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

    cancelAnimationFrame(this.requestId);
    this.requestId = null;
    this.render();
  }

  restartGame() {
    cancelAnimationFrame(this.requestId);

    this.xAxis = {
      prevBox: null,
      widthPrevBox: 50,
      activeBox: null
    };

    this.zAxis = {
      prevBox: null,
      depthPrevBox: 50,
      activeBox: null
    };

    this.stopGameStatus = true;
    this.currentYPosition = 15;
    this.requestId = null;
    this.directionAnimation = 'up'; // up or down
    this.animationAxis = 'x'; // x or z
    this.count = 0;

    for (let i = this.scene.children.length - 1; i >= 0; i -= 1) {
      if (this.scene.children[i].type === 'Mesh') {
        this.scene.remove(this.scene.children[i]);
      }
    }

    this.camera.position.x = 130;
    this.camera.position.z = 130;

    this.addBoxesForInit();
    this.start();
  }

  getStopStatusGame() {
    return this.stopGameStatus;
  }

  start() {
    this.stopGameStatus = false;
    this.render();
  }

  createNewStack() {
    if (this.animationAxis === 'x') {
      const newBox = buildBox(this.zAxis.depthPrevBox, 10, this.xAxis.widthPrevBox, this.xAxis.activeBox.currentColor);
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
      const newBox = buildBox(this.zAxis.depthPrevBox, 10, this.xAxis.widthPrevBox, this.zAxis.activeBox.currentColor);
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

    this.count += 1;
  }

  getCount() {
    return this.count;
  }

  setNewStack() {
    if (this.stopGameStatus) {
      return false;
    }

    if (this.animationAxis === 'x') {
      if (!Helpers.checkIntersection(this.xAxis.prevBox, this.xAxis.activeBox, this.zAxis.depthPrevBox, 'x').intersection) {
        this.stopGame();
        return false;
      }
      if (Helpers.checkIntersection(this.xAxis.prevBox, this.xAxis.activeBox, this.zAxis.depthPrevBox, 'x').fullIntersection) {
        console.log('x yes!');
      }

      this.zAxis.depthPrevBox = Helpers.getWidthNewBox(
        this.xAxis.activeBox.position.x,
        this.xAxis.prevBox.position.x,
        this.zAxis.depthPrevBox
      );

      this.createNewStack();
    }

    if (this.animationAxis === 'z') {
      if (!Helpers.checkIntersection(this.zAxis.prevBox, this.zAxis.activeBox, this.xAxis.widthPrevBox, 'z').intersection) {
        this.stopGame();
        return false;
      }

      if (Helpers.checkIntersection(this.zAxis.prevBox, this.zAxis.activeBox, this.xAxis.widthPrevBox, 'z').fullIntersection) {
        console.log('z yes!');
      }

      this.xAxis.widthPrevBox = Helpers.getWidthNewBox(
        this.zAxis.activeBox.position.z,
        this.zAxis.prevBox.position.z,
        this.xAxis.widthPrevBox
      );

      this.createNewStack();
    }

    const tweenCameraPosition = new TWEEN.Tween(this.camera.position)
      .to({
        y: this.animationAxis === 'x' ? this.xAxis.prevBox.position.y + 125 : this.zAxis.prevBox.position.y + 125
      })
      .easing(TWEEN.Easing.Linear.None);

    const vectorForCamera = new TWEEN.Tween(this.vectorForCamera)
      .to({
        y: this.animationAxis === 'x' ? this.xAxis.prevBox.position.y : this.zAxis.prevBox.position.y
      })
      .easing(TWEEN.Easing.Linear.None);

    tweenCameraPosition.start();
    vectorForCamera.start();

    this.toggleAnimationAxis();

    return true;
  }

  onWindowResize() {
    this.camera.aspect = this.container.current.clientWidth / this.container.current.clientHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.container.current.clientWidth, this.container.current.clientHeight);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    TWEEN.update();
    this.camera.lookAt(this.vectorForCamera);

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
