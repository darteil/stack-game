import { BoxGeometry, Mesh, MeshPhongMaterial } from 'three';
import TWEEN from '@tweenjs/tween.js';

export default class ProgressBox {
  public mesh: Mesh;

  constructor() {
    const material = new MeshPhongMaterial({ color: '#e9d66b', flatShading: true });
    const geometry = new BoxGeometry(10, 10, 100, 1);
    this.mesh = new Mesh(geometry, material);

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }

  setYPosition(value: number) {
    const tweenPosition = new TWEEN.Tween(this.mesh.position)
      .to({ y: this.mesh.position.y + value }, 500)
      .easing(TWEEN.Easing.Quartic.InOut);

    tweenPosition.start();
  }
}
