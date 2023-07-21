import { json, type V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import Hourly from "@/components/feature/stats/Bar";
import Pie from "@/components/feature/stats/Pie";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { menuList } from "@/lib/menus";
import prisma from "@/lib/prisma";
import { cn, getHourlyOrderCounts } from "@/lib/utils";

export const meta: V2_MetaFunction = () => {
  return [{ title: "統計" }];
};

export async function loader() {
  const orders = await prisma.order.groupBy({
    by: ["menu_id"],
    _sum: { count: true },
  });
  const hourlyOrderCounts = await getHourlyOrderCounts();

  return json({ orders, hourlyOrderCounts });
}

export default function Stats() {
  const { orders, hourlyOrderCounts } = useLoaderData<typeof loader>();

  const data = orders.map((order) => {
    const menu = menuList.find((menu) => menu.id === order.menu_id);
    return { name: menu?.name || "unknown", value: order._sum.count || 0 };
  });

  return (
    <ScrollArea className={cn("h-full", "p-3", "grow")}>
      <div className={cn("p-3", "flex", "flex-col", "gap-3")}>
        <Hourly data={hourlyOrderCounts} title="時間帯別売上" />
        <Pie data={data} title="売上比" />
      </div>
    </ScrollArea>
  );
}
