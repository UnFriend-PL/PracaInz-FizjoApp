import { useState } from "react";
import Select from "react-select";
import styles from "./appointmentDetails.module.scss";

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

const MusclesAndJoints = ({ musclesAndJoints }) => {
  const [selectedItems, setSelectedItems] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const mappedData = mapData(musclesAndJoints);

  const handleChange = (selected, sectionName, type) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [sectionName]: {
        ...prevState[sectionName],
        [type]: selected || [],
      },
    }));
    console.log(selectedItems);
  };

  const handleRemove = (sectionName, type, value) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [sectionName]: {
        ...prevState[sectionName],
        [type]: prevState[sectionName][type].filter(
          (item) => item.value !== value
        ),
      },
    }));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? musclesAndJoints.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === musclesAndJoints.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (musclesAndJoints.length === 0)
    return <div className={styles.musclesAndJointsWrapper}></div>;

  const { sectionName, muscles, joints } = mappedData[currentIndex];

  return (
    <div className={styles.musclesAndJointsWrapper}>
      <div className={styles.selectedItemsList}>
        {Object.entries(selectedItems).map(([sectionName, items]) => (
          <div key={sectionName} className={styles.selectedSection}>
            <div className={styles.selectedSectionHeader}>
              {sectionName.replace("-", " ")}
            </div>
            {["muscles", "joints"].map((type) =>
              items[type]?.map((item) => (
                <div key={item.value} className={styles.selectedItem}>
                  {item.label}
                  <button
                    onClick={() => handleRemove(sectionName, type, item.value)}
                    className={styles.removeButton}
                  >
                    &times;
                  </button>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
      <div className={styles.navigation}>
        <button onClick={handlePrev}>&lt;</button>
        <span>{`${currentIndex + 1} / ${musclesAndJoints.length}`}</span>
        <button onClick={handleNext}>&gt;</button>
      </div>
      <div className={styles.bodyPartContainer}>
        <div key={sectionName} className={styles.bodyPart}>
          <div className={styles.bodyPartHeader}>
            {sectionName.replace("-", " ")}
          </div>
          <div className={styles.bodyPartSubHeader}>Muscles:</div>
          <Select
            options={muscles}
            isMulti
            onChange={(selected) =>
              handleChange(selected, sectionName, "muscles")
            }
            value={selectedItems[sectionName]?.muscles || []}
            className={styles.select}
            placeholder="Select muscles"
          />
          <div className={styles.bodyPartSubHeader}>Joints:</div>
          <Select
            options={joints}
            isMulti
            onChange={(selected) =>
              handleChange(selected, sectionName, "joints")
            }
            value={selectedItems[sectionName]?.joints || []}
            className={styles.select}
            placeholder="Select joints"
          />
        </div>
      </div>
    </div>
  );
};

export default MusclesAndJoints;
