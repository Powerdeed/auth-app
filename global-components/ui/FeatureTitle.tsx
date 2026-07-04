"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { convertLinkToLabel } from "@globals";
import { FEATURE_OPTIONS } from "@lib";

export default function FeatureTitle({ children }: { children?: ReactNode }) {
  const currentMenu = convertLinkToLabel(usePathname().slice(1));
  const targetNav = FEATURE_OPTIONS.find((nav) => nav.label === currentMenu);

  return (
    <div className={`${children && "horizontal-layout"} justify-between`}>
      <div className="vertical-layout__inner">
        <div className="flex gap-2.5 items-center text-style__heading text-(--primary-blue)">
          <FontAwesomeIcon
            icon={[
              targetNav?.IconPrefix as IconPrefix,
              targetNav?.IconName as IconName,
            ]}
          />
          <div className="">{targetNav?.label}</div>
        </div>
        <div className="text-style__body">{targetNav?.description}</div>
      </div>
      {children}
    </div>
  );
}
