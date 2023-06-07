import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

import H3 from "@/components/common/H3";
import { menuList } from "@/lib/menus";
import prisma from "@/lib/prisma";

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

export default function StatsPie() {
  const COLORS = [
    "hsl(173 83.4% 32.5%)",
    "hsl(167 59.3% 63.1%)",
    "hsl(152 57.5% 37.6%)",
    "hsl(80 68.3% 46.9%)",
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: {
    [key: string]: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        dominantBaseline="central"
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        x={x}
        y={y}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const { orders } = useLoaderData<typeof loader>();

  const pie = orders.map((order) => {
    const menu = menuList.find((menu) => menu.id === order.menu_id);
    return { name: menu?.name, value: order._sum.count };
  });

  return (
    <>
      <H3>売上比</H3>
      <ResponsiveContainer height={500} width="100%">
        <PieChart>
          <Legend layout="vertical" />
          <Pie
            cx="50%"
            cy="50%"
            data={pie}
            dataKey="value"
            fill="#8884d8"
            label={renderCustomizedLabel}
          >
            {pie.map((menu, index) => (
              <Cell
                fill={COLORS[index % COLORS.length]}
                key={`cell-${index}`}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
