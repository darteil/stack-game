import { PlaneGeometry, MeshPhongMaterial, Mesh, FlatShading } from 'three';

const buildFloor = (width, height) => {
  const color = '#c9603c';
  const geometry = new PlaneGeometry(width, height, 1, 1);
  const material = new MeshPhongMaterial({ color, flatShading: FlatShading });
  const plane = new Mesh(geometry, material);

  plane.rotation.x = -Math.PI / 2;

  plane.receiveShadow = true;
  plane.name = 'floor';

  return plane;
};

export default buildFloor;
