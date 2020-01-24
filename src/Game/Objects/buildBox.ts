import { BoxGeometry, MeshPhongMaterial, Mesh } from 'three';
import colorsList from '../colors';

const buildBox = (width: number, height: number, depth: number, customColor?: string) => {
  const geometry = new BoxGeometry(width, height, depth, 1);
  let color = '#ffffff';

  if (customColor) {
    color = customColor;
  } else {
    color = colorsList[Math.floor(Math.random() * colorsList.length)];
  }

  const material = new MeshPhongMaterial({ color, flatShading: true, transparent: true });
  const box = new Mesh(geometry, material);
  box.userData.currentColor = color;
  box.castShadow = true;
  box.receiveShadow = true;

  return box;
};

export default buildBox;
