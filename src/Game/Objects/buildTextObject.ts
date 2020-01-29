import { Mesh, MeshPhongMaterial, TextGeometry, Font } from 'three';

const buildTextObject = (text: string, font: Font) => {
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
    flatShading: true
  });
  const textGeom = new TextGeometry(text, options);
  textGeom.computeBoundingBox();
  textGeom.computeVertexNormals();
  return new Mesh(textGeom, textMaterial);
};

export default buildTextObject;
