import { useState } from "react";
import Select from "react-select";
import styles from "./appointmentDetails.module.scss";

// Funkcja mapująca dane do formatu akceptowanego przez react-select
const mapData = (data) => {
  return data.flatMap((section) => {
    const muscles = section.muscles.map((muscle) => ({
      label: muscle.name,
      value: muscle.name.toLowerCase().replace(/\s+/g, "-"),
      description: `Muscle in the ${section.name} section`,
    }));

    const joints = section.joints.map((joint) => ({
      label: joint.name,
      value: joint.name.toLowerCase().replace(/\s+/g, "-"),
      description: `Joint in the ${section.name} section`,
    }));

    return [...muscles, ...joints];
  });
};

const MusclesAndJoints = ({ musclesAndJoints }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mapped data for select component
  const formattedData = mapData(musclesAndJoints);

  // Handling selection changes
  const handleChange = (selected) => {
    setSelectedItems(selected || []);
  };

  // Handling navigation to previous and next body parts
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

  const { name, muscles, joints } = musclesAndJoints[currentIndex];

  return (
    <div className={styles.musclesAndJointsWrapper}>
      <div className={styles.navigation}>
        <button onClick={handlePrev}>&lt;</button>
        <span>{`${currentIndex + 1} / ${musclesAndJoints.length}`}</span>
        <button onClick={handleNext}>&gt;</button>
      </div>
      <div className={styles.bodyPart}>
        <div className={styles.bodyPartHeader}>{name.replace("-", " ")}</div>
        <div className={styles.bodyPartSubHeader}>Muscles:</div>
        <div className={styles.musclesAndJointsList}>
          <Select
            options={formattedData.filter((item) =>
              item.description.includes("Muscle")
            )}
            isMulti
            onChange={handleChange}
            value={selectedItems}
            className={styles.select}
            placeholder="Select muscles"
          />
        </div>
        <div className={styles.bodyPartSubHeader}>Joints:</div>
        <div className={styles.musclesAndJointsList}>
          <Select
            options={formattedData.filter((item) =>
              item.description.includes("Joint")
            )}
            isMulti
            onChange={handleChange}
            value={selectedItems}
            className={styles.select}
            placeholder="Select joints"
          />
        </div>
        <div className={styles.selectedItems}>
          <h3>Selected Items:</h3>
          {selectedItems.map((item) => (
            <div key={item.value} className={styles.selectedItem}>
              <input
                type="checkbox"
                checked
                readOnly
                className={styles.checkbox}
              />
              <span>{item.label}</span>
              <button
                onClick={() =>
                  setSelectedItems((prevItems) =>
                    prevItems.filter((i) => i.value !== item.value)
                  )
                }
                className={styles.removeButton}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusclesAndJoints;
