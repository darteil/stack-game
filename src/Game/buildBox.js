import * as THREE from 'three';

const buildBox = (width, height, depth) => {
  const colors = [
    0xf25346,
    0xd8d0d1,
    0x59332e,
    0xF5986E,
    0x23190f,
    0x68c3c0
  ];

  const geometry = new THREE.BoxGeometry(width, height, depth, 1);
  /* const material = new THREE.MeshLambertMaterial({
    color: 0x003E7238,
    map: new THREE.TextureLoader().load('texture.jpg')
  }); */

  /* const material = new THREE.MeshStandardMaterial({
    color: 0x003E7238
  }); */

  /* eslint-disable-next-line */
  const material = new THREE.MeshPhongMaterial({ color: colors[Math.floor(Math.random() * colors.length)], flatShading: THREE.FlatShading });

  return new THREE.Mesh(geometry, material);
};

export default buildBox;
