import EachOrder from "./EachOrder";

import type { Menu } from "@prisma/client";

import { cn } from "@/lib/utils";

export default function OrderInput({
  menus,
  refresh,
}: {
  menus: Menu[];
  refresh: boolean | undefined;
}) {
  return (
    <div className={cn("p-3", "pt-6", "mt-3", "rounded-md", "border")}>
      {menus.map((menu) => (
        <EachOrder key={menu.id} menu={menu} />
      ))}
    </div>
  );
}
