import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";

import clsx from "clsx";
import dayjs from "dayjs";
import { CupSoda } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/Table";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";

export const meta: V2_MetaFunction = () => {
  return [{ title: "退室処理" }];
};

export async function loader({ params }: LoaderArgs) {
  const orders = await prisma.order.findMany({
    where: { guest_id: params.guest_id },
    include: { menu: true },
  });

  return json({ orders });
}

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData();
  const ordersFee = formData.get("orders-fee");

  const datetime = new Date();

  await prisma.guest.update({
    where: {
      id: params.guest_id,
    },
    data: {
      exit_at: datetime,
      fee: Number(ordersFee),
    },
  });

  return redirect("/console/enter");
}

export default function Exit() {
  const transition = useTransition();

  const { orders } = useLoaderData<typeof loader>();

  const amount = orders.reduce((acc, order) => {
    return acc + order.menu.price * order.count;
  }, 0);

  return (
    <Card className={cn("w-[380px]")}>
      <CardHeader>
        <CardTitle>精算処理</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableHead className="font-medium">番号札</TableHead>
              <TableCell>ばんごうふだ</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="font-medium">注文内容</TableHead>
              <TableCell>
                <ul>
                  {orders.map((order) => (
                    <li key={order.id}>
                      {order.menu.name}: {order.count}個
                    </li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="font-medium">金額</TableHead>
              <TableCell>{amount}円</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="font-medium">滞在時間</TableHead>
              <TableCell>
                {dayjs().diff(dayjs(orders[0].order_at), "second")}秒
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Form className={clsx("form-group", "py-3")} method="post">
          <div>
            <Label htmlFor="orders-fee">精算金額</Label>
            <Input
              defaultValue={amount}
              id="orders-fee"
              max={2000}
              min={100}
              name="orders-fee"
              type="number"
            />
          </div>

          <Button
            className={cn(
              "btn",
              "btn-primary",
              "w-full",
              "items-center",
              "mt-3"
            )}
            disabled={Boolean(transition.submission)}
            type="submit"
          >
            <CupSoda className={cn("mr-2", "h-4", "w-4")} />
            精算する
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
