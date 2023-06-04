import EachOrder from "./EachOrder";

import type { Menu } from "@/lib/types";

import { cn } from "@/lib/utils";

export default function OrderInput({ menus }: { menus: Menu[] }) {
  return (
    <div className={cn("p-3", "pt-6", "mt-3", "rounded-md", "border")}>
      {menus.map((menu) => (
        <EachOrder key={menu.id} menu={menu} />
      ))}
    </div>
  );
}
