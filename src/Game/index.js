/* global requestAnimationFrame, cancelAnimationFrame, document */
import createOrbitControls from 'three-orbit-controls';
import * as THREE from 'three';
import buildBox from './buildBox';


export default class Game {
  constructor(container) {
    this.xAxis = {
      prevBox: null,
      widthPrevBox: 100,
      depthPrevBox: 100,
      activeBox: null
    };

    this.zAxis = {
      prevBox: null,
      widthPrevBox: 100,
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

    this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
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

    // light.position.set(152, 152, 152);
    scene.add(axesHelper);

    this.controls = controls;
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    this.addBoxesForInit();

    this.createLights();

    document.addEventListener('keydown', this.onDocumentKeyDown, false);
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
      boxObject.position.set(boxObject.position.x + 1, boxObject.position.y, boxObject.position.z);
    } else {
      boxObject.position.set(boxObject.position.x - 1, boxObject.position.y, boxObject.position.z);
    }
  }

  animationOnZAxis(boxObject) {
    if (boxObject.position.z >= 180) {
      this.directionAnimation = 'up';
    } else if (boxObject.position.z < -80) {
      this.directionAnimation = 'down';
    }

    if (this.directionAnimation === 'down') {
      boxObject.position.set(boxObject.position.x, boxObject.position.y, boxObject.position.z + 1);
    } else {
      boxObject.position.set(boxObject.position.x, boxObject.position.y, boxObject.position.z - 1);
    }
  }

  toggleAnimationAxis() {
    this.animationAxis = this.animationAxis === 'x' ? 'z' : 'x';
  }

  toggleDirectionFroActiveBox() {
    if (this.animationAxis === 'x') {
      this.xAxis.activeBox.position.set(-80, this.currentYPosition, 50);
    }

    if (this.animationAxis === 'z') {
      this.zAxis.activeBox.position.set(50, this.currentYPosition, -80);
    }
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
      depthPrevBox: 100,
      activeBox: null
    };

    this.zAxis = {
      prevBox: null,
      widthPrevBox: 100,
      depthPrevBox: 100,
      activeBox: null
    };

    this.stopGameStatus = false;
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

  onDocumentKeyDown(event) {
    const keyCode = event.which;

    if (keyCode !== 32) {
      return false;
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
