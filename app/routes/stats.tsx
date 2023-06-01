import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import clsx from "clsx";
import dayjs from "dayjs";

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
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";

export const meta: V2_MetaFunction = () => {
  return [{ title: "統計" }];
};

export async function loader() {
  const menus = await prisma.menu.findMany();
  const guests = await prisma.guest.findMany({
    take: 20,
    orderBy: [{ enter_at: "desc" }],
    include: { Order: true },
  });
  const orders = await prisma.order.groupBy({
    by: ["menu_id"],
    _sum: { count: true },
  });

  return json({ menus, guests, orders });
}

export default function Stats() {
  const { menus, guests, orders } = useLoaderData<typeof loader>();

  return (
    <ScrollArea className={clsx("p-3", "grow", "h-screen")}>
      <H2>統計</H2>
      <div className={cn("flex", "gap-3")}>
        <div className={cn("grow")}>
          <H3>注文履歴</H3>
          <ScrollArea className={cn("grow", "overflow-x-auto", "p-3")}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>番号札</TableHead>
                  <TableHead>人数</TableHead>
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
                      {dayjs().diff(guest.enter_at, "minutes")}分 (
                      {dayjs(guest.enter_at).format("HH:mm:ss")})
                    </TableCell>
                    <TableCell>
                      <Button variant="destructive">取り消す</Button>
                    </TableCell>
                  </TableRow>
                ))}
                {guests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Alert>現在、店内にはゲストがいません。</Alert>
                    </TableCell>
                  </TableRow>
                )}
              </tbody>
            </Table>
          </ScrollArea>
        </div>
        <div className={cn("min-w-[300px]")}>
          <H3>売上</H3>
          {orders.map((order) => {
            const menu = menus.find((menu) => menu.id === order.menu_id);
            return (
              <div key={order.menu_id}>
                {menu?.name} {order._sum.count} / {menu?.stock}
              </div>
            );
          })}
        </div>
      </div>
      <Outlet />
    </ScrollArea>
  );
}
