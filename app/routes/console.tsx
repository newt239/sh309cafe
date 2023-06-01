import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import dayjs from "dayjs";

import H2 from "@/components/common/H2";
import H3 from "@/components/common/H3";
import { Alert } from "@/components/ui/Alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
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
  const guests = await prisma.guest.findMany({ where: { exit_at: null } });

  return json({ guests });
}

export default function Console() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className={cn("flex", "gap-3", "p-3", "w-full")}>
      <div className={cn("grow")}>
        <H2>入退室管理</H2>
        <div>
          <H3>ゲスト一覧</H3>
          <div className="w-full overflow-x-auto p-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>番号札</TableHead>
                  <TableHead>人数</TableHead>
                  <TableHead>入店時刻</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <tbody>
                {data.guests.map((guest) => (
                  <TableRow key={guest.id}>
                    <TableCell>
                      <Link to={`/console/${guest.id}`}>
                        {guest.card_number}
                      </Link>
                    </TableCell>
                    <TableCell>{guest.count}</TableCell>
                    <TableCell>
                      {dayjs(guest.enter_at).format("DD日 HH:mm:ss")}
                    </TableCell>
                    <TableCell>
                      {dayjs().diff(guest.enter_at, "minute")}分
                    </TableCell>
                  </TableRow>
                ))}
                {data.guests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Alert />
                    </TableCell>
                  </TableRow>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <div>
        <Card className={cn("w-[380px]")}>
          <CardHeader>
            <CardTitle>入店処理</CardTitle>
          </CardHeader>
          <CardContent>
            <Outlet />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
