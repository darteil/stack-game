import * as THREE from 'three';
import colorsList from './colors';

const buildBox = (width, height, depth) => {
  const geometry = new THREE.BoxGeometry(width, height, depth, 1);
  /* const material = new THREE.MeshLambertMaterial({
    color: 0x003E7238,
    map: new THREE.TextureLoader().load('texture.jpg')
  }); */

  /* const material = new THREE.MeshStandardMaterial({
    color: 0x003E7238
  }); */

  /* eslint-disable-next-line */
  const material = new THREE.MeshPhongMaterial({ color: colorsList[Math.floor(Math.random() * colorsList.length)], flatShading: THREE.FlatShading });

  return new THREE.Mesh(geometry, material);
};

export default buildBox;
