import { Link } from "@remix-run/react";

import clsx from "clsx";

import Items from "@/components/feature/sidebar/Items";
import logo from "@/images/logo.jpg";

export default function SideBar() {
  return (
    <nav
      className={clsx("w-[250px]", "h-full", "bg-black", "text-white", "p-2")}
    >
      <Link to="/">
        <img alt="sh309cafe" src={logo} />
      </Link>
      <section className="menu-section">
        <Items />
      </section>
    </nav>
  );
}
