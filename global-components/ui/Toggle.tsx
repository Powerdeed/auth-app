import { Dispatch, SetStateAction } from "react";

export default function Toggle({
  state,
  stateSetter,
}: {
  state: boolean;
  stateSetter: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`relative w-8 h-4 border rounded-2xl cursor-pointer duration-500 ${state ? "bg-(--secondary-blue) border-(--secondary-blue)" : null}`}
      onClick={() => stateSetter((prev) => !prev)}
    >
      <div
        className={`absolute w-3 h-3 rounded-full duration-500 translate-y-px ${
          state
            ? "translate-x-4.25 bg-white"
            : "translate-x-px bg-(--primary-grey)"
        }`}
        pointer-events-none="true"
      ></div>
    </div>
  );
}
