import * as THREE from 'three';
import colorsList from './colors';

const buildBox = (width, height, depth, customColor) => {
  const geometry = new THREE.BoxGeometry(width, height, depth, 1);
  let color = '#ffffff';

  if (customColor) {
    color = customColor;
  } else {
    color = colorsList[Math.floor(Math.random() * colorsList.length)];
  }

  const material = new THREE.MeshPhongMaterial({ color, flatShading: THREE.FlatShading });
  const box = new THREE.Mesh(geometry, material);
  box.name = color;

  return box;
};

export default buildBox;
