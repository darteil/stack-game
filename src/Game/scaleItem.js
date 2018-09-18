/* global document */
import { DoubleSide, FlatShading, Mesh, MeshPhongMaterial, PlaneGeometry, Texture } from 'three';

const createScaleItem = (text, x, y, z) => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 64;

  const scaleTextBitmap = canvas.getContext('2d');
  scaleTextBitmap.font = 'Bold 80px Arial';
  scaleTextBitmap.textAlign = 'start';
  scaleTextBitmap.textBaseline = 'middle';
  scaleTextBitmap.fillStyle = '#00ffff';
  scaleTextBitmap.fillRect(0, 0, 512, 64);
  scaleTextBitmap.fillStyle = 'rgba(255,0,0,0.95)';

  scaleTextBitmap.fillText(text, 10, 35);
  const scaleTextTexture = new Texture(canvas);
  scaleTextTexture.needsUpdate = true;
  const scaleTextMaterial = new MeshPhongMaterial({
    map: scaleTextTexture,
    side: DoubleSide,
    flatShading: FlatShading
  });
  scaleTextMaterial.transparent = true;

  const wallGeometry = new PlaneGeometry(100, 10);
  const item = new Mesh(wallGeometry, scaleTextMaterial);
  item.rotation.y = Math.PI / 2;
  item.position.x = x;
  item.position.y = y;
  item.position.z = z;
  return item;
};

export default createScaleItem;

