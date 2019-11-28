/* global requestAnimationFrame, cancelAnimationFrame, window */
import {
  PerspectiveCamera,
  Scene,
  Fog,
  WebGLRenderer,
  Vector3,
  Vector2,
  FontLoader,
  Color,
  AxesHelper,
  HemisphereLight,
  DirectionalLight,
  AmbientLight,
  PCFSoftShadowMap
} from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';

import OrbitControls from 'three-orbitcontrols';
import TWEEN from '@tweenjs/tween.js';
import buildTextObject from './Objects/buildTextObject';
import buildBox from './Objects/buildBox';
import buildFloor from './Objects/buildFloor';
import buildScaleBox from './Objects/buildScaleBox';
import Helpers from './helpers';

import GlowsPass from './Passes/Glows';

const SPEED = 3;

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
    this.scaleBox = null;
    this.textHeightStackPositionY = 20;
    this.fontFor3DText = null;
    this.composer = null;

    this.count = 0;
    this.heightStack = 0;

    this.setNewStack = this.setNewStack.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
  }

  init() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    const camera = new PerspectiveCamera(70, width / height, 0.1, 2000);
    const scene = new Scene();
    scene.background = new Color(0x2b6dbd);
    scene.fog = new Fog(scene.background, 2, 2200);
    const renderer = new WebGLRenderer({ antialias: true });
    const composer = new EffectComposer(renderer);

    const renderPass = new RenderPass(scene, camera);
    renderPass.renderToScreen = true;

    this.vectorForCamera = new Vector3(0, 0, 0);

    camera.position.x = 130;
    camera.position.z = 130;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    composer.setSize(this.container.clientWidth, this.container.clientHeight);
    composer.addPass(renderPass);

    const floor = buildFloor(5000, 5000);
    scene.add(floor);

    this.container.appendChild(renderer.domElement);
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.composer = composer;

    this.addBoxesForInit();
    const loader = new FontLoader();
    loader.load('./fonts/Android_101.json', res => {
      this.fontFor3DText = res;
      this.createHeightStackText();
    });

    this.createLights();
    this.initPasses();

    scene.children.reverse();
    window.addEventListener('resize', this.onWindowResize, false);
  }

  initPasses() {
    const glowsPass = new ShaderPass(GlowsPass);

    glowsPass.color = '#ffcfe0';
    glowsPass.material.uniforms.uPosition.value = new Vector2(0, 0.25);
    glowsPass.material.uniforms.uRadius.value = 0.7;
    glowsPass.material.uniforms.uColor.value = new Color(glowsPass.color);
    glowsPass.material.uniforms.uAlpha.value = 0.55;
    glowsPass.renderToScreen = true;

    const pixelRatio = this.renderer.getPixelRatio();

    const fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.material.uniforms.resolution.value.x = 1 / (this.container.clientWidth * pixelRatio);
    fxaaPass.material.uniforms.resolution.value.y = 1 / (this.container.clientHeight * pixelRatio);

    this.composer.addPass(fxaaPass);
    this.composer.addPass(glowsPass);
  }

  enableOrbitControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  enableAxesHelper() {
    const axesHelper = new AxesHelper(500);
    this.scene.add(axesHelper);
  }

  addBoxesForInit() {
    const firstBox = buildBox(50, 10, 50);
    firstBox.position.set(50, 5, 50);
    this.scene.add(firstBox);

    const secondBox = buildBox(50, 10, 50);
    secondBox.position.set(50, this.currentYPosition, 50);
    this.scene.add(secondBox);

    this.scaleBox = buildScaleBox();
    this.scaleBox.position.set(-120, 5, 50);
    this.scene.add(this.scaleBox);

    this.xAxis.activeBox = secondBox;
    this.xAxis.prevBox = firstBox;

    this.camera.position.y = this.xAxis.prevBox.position.y + 125;
    this.vectorForCamera.x = this.xAxis.prevBox.position.x;
    this.vectorForCamera.y = this.xAxis.prevBox.position.y;
    this.vectorForCamera.z = this.xAxis.prevBox.position.z;
  }

  createHeightStackText() {
    if (this.textHeightStack) {
      this.scene.remove(this.textHeightStack);
      this.textHeightStack = null;
    }

    this.textHeightStack = buildTextObject(this.heightStack.toString(), this.fontFor3DText);

    this.textHeightStack.rotation.y = Math.PI / 2;
    this.textHeightStack.position.set(-120, this.textHeightStackPositionY, 100);

    this.scene.add(this.textHeightStack);
  }

  createLights() {
    const hemisphereLight = new HemisphereLight(0xffffff, 0xffffff, 0.3);
    hemisphereLight.color.setHSL(0.6, 1, 0.6);
    hemisphereLight.groundColor.setHSL(0.095, 1, 0.75);
    hemisphereLight.position.set(0, 1000, 0);

    const directionalLight = new DirectionalLight(0xffffff, 0.5);
    const ambientLight = new AmbientLight(0xdc8874, 0.7);

    directionalLight.position.set(100, 1000, 150);
    directionalLight.target.position.set(36, 0, 36);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.left = -400;
    directionalLight.shadow.camera.right = 400;
    directionalLight.shadow.camera.top = 400;
    directionalLight.shadow.camera.bottom = -400;

    directionalLight.shadow.camera.far = 5000;
    directionalLight.shadow.bias = -0.0001;
    directionalLight.penumbra = 1;
    directionalLight.decay = 5;

    this.scene.add(hemisphereLight);
    this.scene.add(directionalLight);
    this.scene.add(directionalLight.target);
    this.scene.add(ambientLight);
  }

  animationOnXAxis(boxObject) {
    if (boxObject.position.x >= 180) {
      this.directionAnimation = 'up';
    } else if (boxObject.position.x < -80) {
      this.directionAnimation = 'down';
    }

    if (this.directionAnimation === 'down') {
      boxObject.position.set(boxObject.position.x + SPEED, boxObject.position.y, boxObject.position.z);
    } else {
      boxObject.position.set(boxObject.position.x - SPEED, boxObject.position.y, boxObject.position.z);
    }
  }

  animationOnZAxis(boxObject) {
    if (boxObject.position.z >= 180) {
      this.directionAnimation = 'up';
    } else if (boxObject.position.z < -80) {
      this.directionAnimation = 'down';
    }

    if (this.directionAnimation === 'down') {
      boxObject.position.set(boxObject.position.x, boxObject.position.y, boxObject.position.z + SPEED);
    } else {
      boxObject.position.set(boxObject.position.x, boxObject.position.y, boxObject.position.z - SPEED);
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
    this.heightStack = 0;
    this.scaleBox = null;
    this.textHeightStackPositionY = 20;

    for (let i = this.scene.children.length - 1; i >= 0; i -= 1) {
      if (this.scene.children[i].type === 'Mesh' && this.scene.children[i].name !== 'floor') {
        this.scene.remove(this.scene.children[i]);
      }
    }

    this.camera.position.x = 130;
    this.camera.position.z = 130;

    this.addBoxesForInit();
    this.createHeightStackText();
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

      newBox.position.set(
        positionForNewBox,
        this.currentYPosition,
        this.xAxis.prevBox ? this.xAxis.prevBox.position.z : 50
      );
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

    this.heightStack += 1;
    this.count += 1;
    this.createHeightStackText();
    this.textHeightStackPositionY += 10;
  }

  getCount() {
    return this.count;
  }

  getStackHeight() {
    return this.heightStack;
  }

  startTweenAnimations() {
    // Camera position
    const tweenCameraPosition = new TWEEN.Tween(this.camera.position)
      .to(
        {
          y: this.camera.position.y + 10
        },
        500
      )
      .easing(TWEEN.Easing.Linear.None);

    // Camera look
    const vectorForCamera = new TWEEN.Tween(this.vectorForCamera)
      .to(
        {
          y: this.animationAxis === 'x' ? this.xAxis.prevBox.position.y : this.zAxis.prevBox.position.y
        },
        500
      )
      .easing(TWEEN.Easing.Linear.None);

    // Text count position
    const tweenTextHeightStackPosition = new TWEEN.Tween(this.textHeightStack.position)
      .to(
        {
          y: this.textHeightStackPositionY
        },
        500
      )
      .easing(TWEEN.Easing.Quartic.InOut);

    // Scale box height
    this.scaleBox.geometry.vertices.forEach((vertex, index) => {
      if (index === 0 || index === 1 || index === 4 || index === 5) {
        const tweenVertex = new TWEEN.Tween(this.scaleBox.geometry.vertices[index])
          .to(
            {
              y: this.scaleBox.geometry.vertices[index].y + 10
            },
            500
          )
          .onUpdate(() => {
            this.scaleBox.geometry.verticesNeedUpdate = true;
          })
          .easing(TWEEN.Easing.Quartic.InOut);

        tweenVertex.start();
      }
    });

    tweenTextHeightStackPosition.start();
    tweenCameraPosition.start();
    vectorForCamera.start();
  }

  setNewStack() {
    if (this.stopGameStatus) {
      return false;
    }

    if (this.animationAxis === 'x') {
      if (
        !Helpers.checkIntersection(this.xAxis.prevBox, this.xAxis.activeBox, this.zAxis.depthPrevBox, 'x').intersection
      ) {
        this.stopGame();
        return false;
      }

      this.zAxis.depthPrevBox = Helpers.getWidthNewBox(
        this.xAxis.activeBox.position.x,
        this.xAxis.prevBox.position.x,
        this.zAxis.depthPrevBox
      );

      this.createNewStack();
      if (
        Helpers.checkIntersection(this.xAxis.prevBox, this.xAxis.activeBox, this.zAxis.depthPrevBox, 'x')
          .fullIntersection
      ) {
        Helpers.transparentMeshAnimate(this.zAxis.prevBox);
        this.count += 1;
      }
    }

    if (this.animationAxis === 'z') {
      if (
        !Helpers.checkIntersection(this.zAxis.prevBox, this.zAxis.activeBox, this.xAxis.widthPrevBox, 'z').intersection
      ) {
        this.stopGame();
        return false;
      }

      this.xAxis.widthPrevBox = Helpers.getWidthNewBox(
        this.zAxis.activeBox.position.z,
        this.zAxis.prevBox.position.z,
        this.xAxis.widthPrevBox
      );

      this.createNewStack();
      if (
        Helpers.checkIntersection(this.zAxis.prevBox, this.zAxis.activeBox, this.xAxis.widthPrevBox, 'z')
          .fullIntersection
      ) {
        Helpers.transparentMeshAnimate(this.xAxis.prevBox);
        this.count += 1;
      }
    }

    this.startTweenAnimations();

    this.toggleAnimationAxis();

    return true;
  }

  onWindowResize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.composer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  render() {
    this.composer.render(this.scene, this.camera);
    TWEEN.update();
    if (this.controls) {
      this.controls.update();
    } else {
      this.camera.lookAt(this.vectorForCamera);
    }

    if (!this.stopGameStatus) {
      if (this.animationAxis === 'x') {
        this.animationOnXAxis(this.xAxis.activeBox);
        /*if (
          Helpers.checkIntersection(this.xAxis.prevBox, this.xAxis.activeBox, this.zAxis.depthPrevBox, 'x')
            .fullIntersection
        ) {
          this.setNewStack();
        }*/
      } else {
        this.animationOnZAxis(this.zAxis.activeBox);
        /*if (
          Helpers.checkIntersection(this.zAxis.prevBox, this.zAxis.activeBox, this.xAxis.widthPrevBox, 'z')
            .fullIntersection
        ) {
          this.setNewStack();
        }*/
      }
    }

    this.requestId = requestAnimationFrame(this.render.bind(this));
  }
}
