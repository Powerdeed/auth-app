"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sort({
  sortOptions,
  selectedSortOptions,
  setSelectedSortOptions,
  dropdownWidth,
}: {
  sortOptions: string[];
  selectedSortOptions: string[];
  setSelectedSortOptions: Dispatch<SetStateAction<string[]>>;
  dropdownWidth?: string;
}) {
  const [unselectedSortOptions, setUnSelectedSortOptions] =
    useState(sortOptions);
  const [isClicked, setIsClicked] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setIsClicked(false);
      }
    };

    if (isClicked) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isClicked]);

  const selectOption = (filter: string) => {
    setSelectedSortOptions((prev) => {
      if (prev.includes(filter)) return prev;

      return [...prev, filter];
    });

    setUnSelectedSortOptions((prev) => {
      if (prev.includes(filter))
        return prev.filter((filterOption) => filterOption !== filter);

      return [...prev];
    });

    setIsClicked((prev) => !prev);
  };

  const removeFilter = (filter: string) => {
    setSelectedSortOptions((prev) => {
      if (prev.includes(filter))
        return prev.filter((filterOption) => filterOption !== filter);

      return [...prev];
    });

    setUnSelectedSortOptions((prev) => {
      if (prev.includes(filter)) return prev;

      return [...prev, filter];
    });
  };

  return (
    <div
      ref={selectorRef}
      className="relative horizontal-layout text-style__body"
    >
      <div
        className="containerize hover:bg-(--terciary-grey)/30 rounded-[10px] p-1 cursor-pointer"
        onClick={() => setIsClicked((prev) => !prev)}
      >
        <FontAwesomeIcon icon={["fas", "sort"]} />
        <div>Sort</div>
      </div>

      <div
        className={`absolute -top-2 left-0 ${dropdownWidth ? dropdownWidth : "w-40"}`}
      >
        {isClicked && (
          <ul className={`selector-dropdown`}>
            {unselectedSortOptions.map((option) => (
              <li
                key={option}
                className="selector-dropdown-option"
                onClick={() => selectOption(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedSortOptions.map((filter) => (
        <div key={filter} className="containerize rounded-[10px] p-1">
          <FontAwesomeIcon
            icon={["fas", "xmark"]}
            className="p-px rounded-[5px] hover:bg-(--terciary-grey)/30 hover:text-(--primary-red) cursor-pointer"
            onClick={() => removeFilter(filter)}
          />
          <div>{filter}</div>
        </div>
      ))}
    </div>
  );
}
