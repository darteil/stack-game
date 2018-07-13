const checkIntersection = box => box.position.x >= 150 ||
  box.position.x <= -50 ||
  box.position.z >= 150 ||
  box.position.z <= -50;

const getWidthNewBox = (centerXOfBox, centerXOfPrevBox, widthPrevBox) => {
  if (centerXOfBox > centerXOfPrevBox) {
    const x1 = centerXOfPrevBox + (widthPrevBox / 2);
    const x2 = centerXOfBox - (widthPrevBox / 2);

    return x1 - x2;
  }
  if (centerXOfBox < centerXOfPrevBox) {
    const x1 = centerXOfPrevBox - (widthPrevBox / 2);
    const x2 = centerXOfBox + (widthPrevBox / 2);

    return x2 - x1;
  }
  return 100;
};

const getPositionForNewBox = (centerOfBox, centerOfPrevBox, widthNewBox) => {
  if (centerOfBox > centerOfPrevBox) {
    if (centerOfBox - centerOfPrevBox > widthNewBox) {
      return false;
    }
    return (centerOfBox + centerOfPrevBox) / 2;
  }
  if (centerOfBox < centerOfPrevBox) {
    if (centerOfPrevBox - centerOfBox > widthNewBox) {
      return false;
    }
    return (centerOfPrevBox + centerOfBox) / 2;
  }
  return 100;
};

module.exports = {
  checkIntersection,
  getWidthNewBox,
  getPositionForNewBox
};
