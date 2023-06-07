import type { ActionArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import dayjs from "dayjs";

import H3 from "@/components/common/H3";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import prisma from "@/lib/prisma";

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

  return json({ guests });
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

export default function StatsGuests() {
  const { guests } = useLoaderData<typeof loader>();

  return (
    <>
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
                {dayjs(guest.enter_at).format("DD日 HH:mm:ss")}
              </TableCell>
              <TableCell>
                {guest.exit_at
                  ? dayjs(guest.exit_at).diff(guest.enter_at, "minutes") + "分"
                  : "店内"}
              </TableCell>
              <TableCell>
                <Form method="post">
                  <Button name="action" value={guest.id} variant="destructive">
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
    </>
  );
}
