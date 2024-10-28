const createBodyDetails = (selectedItems) => {
  const bodyDetails = [];

  for (const [bodySide, details] of Object.entries(selectedItems)) {
    if (details.muscles && details.muscles.length > 0) {
      details.muscles.forEach((muscle) => {
        bodyDetails.push({
          bodySectionId: muscle.bodySectionId,
          viewId: muscle.viewId,
          muscleId: muscle.muscleId,
          jointId: null,
          bodySide: bodySide,
        });
      });
    }

    if (details.joints && details.joints.length > 0) {
      details.joints.forEach((joint) => {
        bodyDetails.push({
          bodySectionId: joint.bodySectionId,
          viewId: joint.viewId,
          muscleId: null,
          jointId: joint.jointId,
          bodySide: bodySide,
        });
      });
    }
  }
  return { bodyDetails };
};

export default createBodyDetails;
