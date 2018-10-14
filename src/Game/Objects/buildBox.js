import {
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
  FlatShading
} from 'three';
import colorsList from '../colors';

const buildBox = (width, height, depth, customColor) => {
  const geometry = new BoxGeometry(width, height, depth, 1);
  let color = '#ffffff';

  if (customColor) {
    color = customColor;
  } else {
    color = colorsList[Math.floor(Math.random() * colorsList.length)];
  }

  const material = new MeshPhongMaterial({ color, flatShading: FlatShading, transparent: true });
  const box = new Mesh(geometry, material);
  box.currentColor = color;

  return box;
};

export default buildBox;
