import { Link } from "@remix-run/react";
import type { ReactNode } from "react";

import clsx from "clsx";

export default function Item({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <Link to={to}>
      <li className={clsx("p-2", "rounded-xl", "hover:bg-slate-400")}>
        {children}
      </li>
    </Link>
  );
}
