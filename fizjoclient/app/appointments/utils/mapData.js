const mapData = (data) => {
  return data.map((section) => {
    const muscles = section.muscles.map((muscle) => ({
      label: muscle.name,
      value: muscle.name.toLowerCase().replace(/\s+/g, "-"),
      description: `Muscle in the ${section.name} section`,
      bodySectionId: section.bodySectionId,
      viewId: section.viewId,
      muscleId: muscle.id,
    }));

    const joints = section.joints.map((joint) => ({
      label: joint.name,
      value: joint.name.toLowerCase().replace(/\s+/g, "-"),
      description: `Joint in the ${section.name} section`,
      bodySectionId: section.bodySectionId,
      viewId: section.viewId,
      jointId: joint.id,
    }));

    return {
      sectionName: section.name,
      muscles,
      joints,
    };
  });
};

export default mapData;
