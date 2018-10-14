import { FlatShading, Mesh, MeshPhongMaterial, TextGeometry } from 'three';

const buildTextObject = (text, font) => {
  const options = {
    size: 20,
    height: 5,
    font,
    style: 'regular',
    curveSegments: 20,
    steps: 50
  };

  const textMaterial = new MeshPhongMaterial({
    color: '#4b5320',
    flatShading: FlatShading
  });
  const textGeom = new TextGeometry(text, options);
  textGeom.computeBoundingBox();
  textGeom.computeVertexNormals();
  return new Mesh(textGeom, textMaterial);
};

export default buildTextObject;
