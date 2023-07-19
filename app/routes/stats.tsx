import { json, type V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import Pie from "@/components/feature/stats/Pie";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { menuList } from "@/lib/menus";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";

export const meta: V2_MetaFunction = () => {
  return [{ title: "統計" }];
};

export async function loader() {
  const orders = await prisma.order.groupBy({
    by: ["menu_id"],
    _sum: { count: true },
  });

  return json({ orders });
}

export default function Stats() {
  const { orders } = useLoaderData<typeof loader>();

  const data = orders.map((order) => {
    const menu = menuList.find((menu) => menu.id === order.menu_id);
    return { name: menu?.name || "unknown", value: order._sum.count || 0 };
  });

  return (
    <ScrollArea className={cn("h-full", "p-3", "grow")}>
      <Pie data={data} title="売上比" />
    </ScrollArea>
  );
}
