import React, { memo, useCallback } from "react";
import differenceWith from "ramda/src/differenceWith";
import { bodyFront } from "./genderModel/bodyFront";
import { bodyBack } from "./genderModel/bodyBack";
import { bodyFemaleBack } from "./genderModel/bodyFemaleBack";
import { bodyFemaleFront } from "./genderModel/bodyFemaleFront";
import styles from "./humanBody.module.scss";

const comparison = (a, b) => a.slug === b.slug;

const SvgWrapper = ({ side, scale, children }) => {
  const viewBox = side === "front" ? "-50 -40 734 1538" : "756 0 774 1448";
  return (
    <svg viewBox={viewBox} height={400 * scale} width={200 * scale}>
      {children}
    </svg>
  );
};

const Body = ({
  colors = ["#197b5c", "#74b9ff"],
  data = [],
  scale = 1,
  side = "front",
  gender = "male",
  onBodyPartPress,
}) => {
  const mergedBodyParts = useCallback(
    (dataSource) => {
      const innerData = data
        .map((d) => dataSource.find((t) => t.slug === d.slug))
        .filter(Boolean);

      const coloredBodyParts = innerData.map((d) => {
        const bodyPart = data.find((e) => e.slug === d?.slug);
        let colorIntensity = 1;
        if (bodyPart?.intensity) colorIntensity = bodyPart.intensity;
        return { ...d, color: colors[colorIntensity - 1] };
      });

      const formattedBodyParts = differenceWith(comparison, dataSource, data);
      return [...formattedBodyParts, ...coloredBodyParts];
    },
    [data, colors]
  );

  const getColorToFill = (bodyPart) => {
    let color;
    if (bodyPart.intensity) color = colors[bodyPart.intensity];
    else color = bodyPart.color;
    return color;
  };

  const renderBodySvg = (data) => (
    <SvgWrapper side={side} scale={scale}>
      {mergedBodyParts(data).map((bodyPart) => {
        if (bodyPart.pathArray) {
          return bodyPart.pathArray.map((path, index) => (
            <path
              key={index}
              onClick={() => onBodyPartPress?.(bodyPart)}
              id={bodyPart.slug}
              fill={getColorToFill(bodyPart)}
              d={path}
              className={styles.bodyPart}
            />
          ));
        }
        return null;
      })}
    </SvgWrapper>
  );

  if (gender === "female") {
    return renderBodySvg(side === "front" ? bodyFemaleFront : bodyFemaleBack);
  }

  return renderBodySvg(side === "front" ? bodyFront : bodyBack);
};

export default memo(Body);
