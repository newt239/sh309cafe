import { Link } from "@remix-run/react";

import Items from "@/components/feature/sidebar/Items";
import logo from "@/images/logo.jpg";
import { cn } from "@/lib/utils";

export default function SideBar() {
  return (
    <nav
      className={cn(
        "w-full",
        "lg:w-[250px]",
        "h-full",
        "bg-black",
        "text-white",
        "p-2",
        "flex",
        "flex-col-reverse",
        "lg:flex-col"
      )}
    >
      <Link to="/">
        <img alt="sh309cafe" className={cn("m-auto")} src={logo} />
      </Link>
      <section className="menu-section">
        <Items />
      </section>
    </nav>
  );
}
