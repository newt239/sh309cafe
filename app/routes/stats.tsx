import { json, type V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Card } from "@tremor/react";

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
  const sumOrderCount = orders.reduce((acc, order) => {
    return acc + (order._sum.count || 0);
  }, 0);
  const result = await prisma.guest.aggregate({
    _sum: { fee: true },
  });

  return json({
    orders,
    hourlyOrderCounts,
    sumOrderCount,
    sumFee: result._sum.fee,
  });
}

export default function Stats() {
  const { orders, hourlyOrderCounts, sumOrderCount, sumFee } =
    useLoaderData<typeof loader>();

  const data = orders.map((order) => {
    const menu = menuList.find((menu) => menu.id === order.menu_id);
    return { name: menu?.name || "unknown", value: order._sum.count || 0 };
  });

  return (
    <ScrollArea className={cn("h-full", "p-3", "grow")}>
      <div className={cn("p-3", "flex", "flex-col", "gap-3")}>
        <Hourly data={hourlyOrderCounts} title="時間帯別売上" />
        <div className={cn("flex", "flex-col", "lg:flex-row", "gap-3")}>
          <Pie data={data} title="売上比" />
          <Card
            className={cn("w-full", "sm:w-1/2", "lg:w-1/3")}
            decoration="top"
          >
            <div className={cn("flex", "flex-col", "gap-1")}>
              <span className={cn("text-gray-500")}>総売上</span>
              <span className={cn("text-2xl")}>
                {sumFee?.toLocaleString("en")} 円
              </span>
            </div>
            <div className={cn("flex", "flex-col", "gap-1", "pt-3")}>
              <span className={cn("text-gray-500")}>総注文数</span>
              <span className={cn("text-2xl")}>
                {sumOrderCount.toLocaleString("en")} 個
              </span>
            </div>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}
