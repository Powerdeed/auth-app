"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchBar({
  placeholder,
  val,
  changeFunc,
}: {
  placeholder: string;
  val: string;
  changeFunc: (val: string) => void;
}) {
  return (
    <div className="flex-1 border border-(--terciary-grey) p-2 rounded-[10px] focus:shadow-[0_0_0_1px_var(--secondary-blue)] focus-within:shadow-[0_0_0_1px_var(--secondary-blue)] transition-shadow flex items-center text-style__body">
      <FontAwesomeIcon
        icon={["fas", "magnifying-glass"]}
        className="text-(--terciary-grey) px-1.25"
      />

      <input
        type="text"
        placeholder={placeholder}
        className="w-full outline-none"
        value={val}
        onChange={(e) => changeFunc(e.target.value)}
      />
    </div>
  );
}
