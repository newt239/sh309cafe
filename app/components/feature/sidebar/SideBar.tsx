import { Link } from "@remix-run/react";

import Items from "@/components/feature/sidebar/Items";
import logo from "@/images/logo.svg";
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
      <Link className={cn("m-auto", "my-0")} to="/">
        <img alt="sh309cafe" className={cn("w-[200px]")} src={logo} />
      </Link>
      <section className="menu-section">
        <Items />
      </section>
    </nav>
  );
}
