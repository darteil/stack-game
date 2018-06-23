import * as THREE from 'three';

const buildBox = (width, height, depth) => {
  const geometry = new THREE.BoxGeometry(width, height, depth, 1);
  const material = new THREE.MeshPhongMaterial({
    color: (Math.random() * 0xff00000) - 0xff00000
  });

  return new THREE.Mesh(geometry, material);
};

export default buildBox;
