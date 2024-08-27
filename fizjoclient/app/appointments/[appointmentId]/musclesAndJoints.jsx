import { useState } from "react";
import Select from "react-select";
import styles from "./appointmentDetails.module.scss";

const MusclesAndJoints = ({ musclesAndJoints }) => {
  const [selectedItems, setSelectedItems] = useState([]);

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

      console.log([...muscles, ...joints]);
      return [...muscles, ...joints];
    });
  };

  const formattedData = mapData(musclesAndJoints);

  const handleChange = (selected) => {
    setSelectedItems(selected || []);
  };

  return (
    <div className={styles.musclesAndJointsWrapper}>
      <div className={styles.navigation}>{/* Navigation buttons */}</div>
      <div className={styles.bodyPart}>
        <div className={styles.bodyPartHeader}>Muscles</div>
        <Select
          options={formattedData.filter((item) =>
            item.description.includes("Muscle")
          )}
          isMulti
          onChange={handleChange}
          className={styles.select}
        />
        <div className={styles.bodyPartHeader}>Joints</div>
        <Select
          options={formattedData.filter((item) =>
            item.description.includes("Joint")
          )}
          isMulti
          onChange={handleChange}
          className={styles.select}
        />
      </div>
    </div>
  );
};

export default MusclesAndJoints;
