import type { ReactNode } from "react";

import clsx from "clsx";

export default function H2({ children }: { children: ReactNode }) {
  return <h2 className={clsx("text-4xl", "font-bold")}> {children}</h2>;
}
