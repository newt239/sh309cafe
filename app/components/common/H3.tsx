import type { ReactNode } from "react";

import clsx from "clsx";

export default function H3({ children }: { children: ReactNode }) {
  return <h3 className={clsx("text-2xl", "font-bold", "pt-3")}> {children}</h3>;
}
