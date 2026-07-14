"use client";

import { SectionTitle } from "@global-components/ui/Title";
import useCallbackHook from "../hook/useCallbackHook";

export default function Callback() {
  const { states } = useCallbackHook();

  return (
    <main className="grid min-h-screen place-items-center bg-background p-5">
      <section className="feature-container-vertical w-full max-w-110 text-center">
        <SectionTitle title="PTR Identity" style="text-center" />

        <p
          className={`text-style__body ${
            states.exchangeError
              ? "text-(--primary-red)"
              : "text-(--primary-grey)"
          }`}
        >
          {states.exchangeError || states.status}
        </p>
      </section>
    </main>
  );
}
