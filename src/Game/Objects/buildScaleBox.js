import { BoxGeometry, FlatShading, Mesh, MeshPhongMaterial } from 'three';


const buildScaleBox = () => {
  const material = new MeshPhongMaterial({ color: '#e9d66b', flatShading: FlatShading });
  const geometry = new BoxGeometry(10, 10, 100, 1);

  return new Mesh(geometry, material);
};

export default buildScaleBox;

