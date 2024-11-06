import { useState, useCallback } from "react";

const useNavigation = (totalItems) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNavigation = useCallback(
    (direction) => {
      setCurrentIndex((prevIndex) => {
        return direction === "prev"
          ? (prevIndex - 1 + totalItems) % totalItems
          : (prevIndex + 1) % totalItems;
      });
    },
    [totalItems]
  );

  return { currentIndex, handleNavigation };
};

export default useNavigation;
