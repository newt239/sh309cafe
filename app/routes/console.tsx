import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import dayjs from "dayjs";
import { Calculator } from "lucide-react";

import H2 from "@/components/common/H2";
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
  return [{ title: "店内管理" }];
};

export async function loader() {
  const guests = await prisma.guest.findMany({
    where: { exit_at: null, available: 1 },
  });

  return json({ guests });
}

export default function Console() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className={cn("grow")}>
      <div className={cn("flex")}>
        <ScrollArea
          className={cn("grow", "overflow-x-auto", "h-screen", "p-3")}
        >
          <H2>ゲスト管理</H2>
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
              {data.guests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell>{guest.card_number}</TableCell>
                  <TableCell>{guest.count}</TableCell>
                  <TableCell>
                    {dayjs().diff(guest.enter_at, "minutes")}分 (
                    {dayjs(guest.enter_at).format("HH:mm:ss")})
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
              {data.guests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Alert>現在、店内にはゲストがいません。</Alert>
                  </TableCell>
                </TableRow>
              )}
            </tbody>
          </Table>
        </ScrollArea>
        <ScrollArea className={cn("h-screen", "p-3")}>
          <Outlet />
        </ScrollArea>
      </div>
    </div>
  );
}
