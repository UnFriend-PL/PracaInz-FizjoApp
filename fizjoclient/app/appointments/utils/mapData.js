import { LanguageContext } from "@/app/contexts/lang/langContext";
import { useContext } from "react";

const mapData = (data) => {
  const { language } = useContext(LanguageContext);

  return data.map((section) => {
    const muscles = section.muscles.map((muscle) => ({
      section: section.name,
      label: language === "en" ? muscle.name : muscle.namePL,
      value: muscle.name.toLowerCase().replace(/\s+/g, "-"),
      bodySectionId: section.bodySectionId,
      viewId: section.viewId,
      muscleId: muscle.id,
    }));

    const joints = section.joints.map((joint) => ({
      section: section.name,
      label: language === "en" ? joint.name : joint.namePL,
      value: joint.name.toLowerCase().replace(/\s+/g, "-"),
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
