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
    <li className={clsx("p-2")}>
      <Link to={to}>{children}</Link>
    </li>
  );
}
