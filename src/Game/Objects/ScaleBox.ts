import { BoxGeometry, Mesh, MeshPhongMaterial, Geometry } from 'three';
import TWEEN from '@tweenjs/tween.js';

export default class ScaleBox {
  public mesh: Mesh;

  constructor() {
    const material = new MeshPhongMaterial({ color: '#e9d66b', flatShading: true });
    const geometry = new BoxGeometry(10, 10, 100, 1);
    this.mesh = new Mesh(geometry, material);
  }

  increaseHeight(increaseValue: number) {
    (this.mesh.geometry as Geometry).vertices.forEach((vertex, index) => {
      // modify the coordinates of the top vertices
      if (index === 0 || index === 1 || index === 4 || index === 5) {
        const tweenVertex = new TWEEN.Tween(vertex)
          .to(
            {
              y: vertex.y + increaseValue
            },
            500
          )
          .onUpdate(() => {
            (this.mesh.geometry as Geometry).verticesNeedUpdate = true;
          })
          .easing(TWEEN.Easing.Quartic.InOut);

        tweenVertex.start();
      }
    });
  }
}
