import { LanguageContext } from "@/app/contexts/lang/langContext";
import { useContext } from "react";

const mapData = (data) => {
  const { language } = useContext(LanguageContext);

  return data.map((section) => {
    const viewName =
      section.viewName ||
      (section.viewId === 1
        ? "front"
        : section.viewId === 3
        ? "front"
        : "back");

    const muscles = section.muscles.map((muscle) => ({
      section: `${section.name}_${viewName}`,
      label: language === "en" ? muscle.name : muscle.namePL,
      value: `${muscle.name.toLowerCase().replace(/\s+/g, "-")}_${viewName}`,
      bodySectionId: section.bodySectionId,
      viewId: section.viewId,
      muscleId: muscle.id,
    }));

    const joints = section.joints.map((joint) => ({
      section: `${section.name}_${viewName}`,
      label: language === "en" ? joint.name : joint.namePL,
      value: `${joint.name.toLowerCase().replace(/\s+/g, "-")}_${viewName}`,
      bodySectionId: section.bodySectionId,
      viewId: section.viewId,
      jointId: joint.id,
    }));

    return {
      sectionName: `${section.name} ${viewName}`,
      sectionNamePL: `${section.namePL} ${viewName}`,
      muscles,
      joints,
    };
  });
};

export default mapData;
