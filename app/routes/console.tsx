import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import dayjs from "dayjs";
import { Calculator } from "lucide-react";

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
import { menus } from "@/lib/menus";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";

export const meta: V2_MetaFunction = () => {
  return [{ title: "店内管理" }];
};

export async function loader() {
  const guests = await prisma.guest.findMany({
    where: { exit_at: null, available: 1 },
    include: { Order: true },
  });

  // const guestCount = guests.reduce((acc, guest) => acc + guest.count, 0);

  return json({ guests });
}

export default function Console() {
  const { guests } = useLoaderData<typeof loader>();

  return (
    <div className={cn("grow")}>
      <div className={cn("flex", "flex-col-reverse", "lg:flex-row")}>
        <div className={cn("grow", "h-screen", "p-3")}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>番号札</TableHead>
                <TableHead>人数</TableHead>
                <TableHead>滞在時間</TableHead>
                <TableHead>注文内容</TableHead>
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
                    {guest.Order.map((order) => (
                      <div key={order.id}>
                        {menus[order.menu_id]?.name.replace("フラペチーノ", "")}
                        : {order.count}個
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button asChild variant="link">
                      <Link to={`/console/${guest.id}`}>
                        <Calculator className={cn("mr-2", "h-4", "w-4")} />
                        精算する
                      </Link>
                    </Button>
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
        </div>
        <ScrollArea className={cn("h-auto", "lg:h-screen", "p-3")}>
          <Outlet />
        </ScrollArea>
      </div>
    </div>
  );
}
