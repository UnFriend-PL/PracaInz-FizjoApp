const createBodyDetails = (selectedItems) => {
  const bodyDetails = [];

  Object.entries(selectedItems).forEach(([sectionName, details]) => {
    const bodySide = sectionName.includes("_front") ? "front" : "back";

    details.muscles?.forEach((muscle) => {
      bodyDetails.push({
        bodySectionId: muscle.bodySectionId,
        viewId: muscle.viewId,
        muscleId: muscle.muscleId,
        jointId: null,
        bodySide,
      });
    });

    details.joints?.forEach((joint) => {
      bodyDetails.push({
        bodySectionId: joint.bodySectionId,
        viewId: joint.viewId,
        muscleId: null,
        jointId: joint.jointId,
        bodySide,
      });
    });
  });

  return { bodyDetails };
};

export default createBodyDetails;
