import { Link } from "@remix-run/react";

import clsx from "clsx";

import Items from "./Items";

export default function SideBar() {
  return (
    <nav
      className={clsx(
        "w-[250px]",
        "h-full",
        "bg-slate-500",
        "text-white",
        "p-2"
      )}
    >
      <Link to="/">
        <h1 className={clsx("font-bold", "text-3xl")}>sh309cafe</h1>
      </Link>
      <section className="menu-section">
        <Items />
      </section>
    </nav>
  );
}
