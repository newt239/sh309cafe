import type { ActionArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react";

import clsx from "clsx";
import dayjs from "dayjs";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

import H2 from "@/components/common/H2";
import H3 from "@/components/common/H3";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/ScrollArea";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { menuList } from "@/lib/menus";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";

export const meta: V2_MetaFunction = () => {
  return [{ title: "統計" }];
};

export async function loader() {
  const guests = await prisma.guest.findMany({
    take: 20,
    where: {
      available: 1,
    },
    orderBy: [{ enter_at: "desc" }],
    include: { Order: true },
  });
  const orders = await prisma.order.groupBy({
    by: ["menu_id"],
    _sum: { count: true },
  });

  return json({ guests, orders });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const guest_id = formData.get("action");
  if (guest_id !== null) {
    await prisma.guest.update({
      where: {
        id: guest_id.toString(),
      },
      data: {
        available: 0,
      },
    });
    await prisma.order.updateMany({
      where: {
        guest_id: guest_id.toString(),
      },
      data: {
        available: 0,
      },
    });
  }
  return { message: guest_id };
}

export default function Stats() {
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

  const { guests, orders } = useLoaderData<typeof loader>();

  const pie = orders.map((order) => {
    const menu = menuList.find((menu) => menu.id === order.menu_id);
    return { name: menu?.name, value: order._sum.count };
  });

  return (
    <ScrollArea className={clsx("p-3", "grow", "h-screen")}>
      <H2>統計</H2>
      <Tabs className={cn("w-full", "pt-3")} defaultValue="guests">
        <TabsList>
          <TabsTrigger value="guests">ゲスト一覧</TabsTrigger>
          <TabsTrigger value="pie">売上比</TabsTrigger>
        </TabsList>
        <TabsContent value="guests">
          <H3>ゲスト一覧</H3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>番号札</TableHead>
                <TableHead>人数</TableHead>
                <TableHead>入店時刻</TableHead>
                <TableHead>滞在時間</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <tbody>
              {guests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell>{guest.card_number}</TableCell>
                  <TableCell>{guest.count}</TableCell>
                  <TableCell>
                    {dayjs(guest.enter_at).format("HH:mm:ss")}
                  </TableCell>
                  <TableCell>
                    {guest.exit_at
                      ? dayjs(guest.exit_at).diff(guest.enter_at, "minutes") +
                        "分"
                      : "店内"}
                  </TableCell>
                  <TableCell>
                    <Form method="post">
                      <Button
                        name="action"
                        value={guest.id}
                        variant="destructive"
                      >
                        取り消す
                      </Button>
                    </Form>
                  </TableCell>
                </TableRow>
              ))}
              {guests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Alert>履歴がありません。</Alert>
                  </TableCell>
                </TableRow>
              )}
            </tbody>
          </Table>
        </TabsContent>
        <TabsContent value="pie">
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
        </TabsContent>
      </Tabs>
      <Outlet />
    </ScrollArea>
  );
}
