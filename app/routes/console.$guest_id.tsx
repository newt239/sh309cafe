import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { CupSoda, RotateCw } from "lucide-react";

import { InputNumber } from "@/components/common/InputNumber";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/Table";
import { useIntervalBy1s } from "@/lib/hooks";
import { menus } from "@/lib/menus";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";

export const meta: V2_MetaFunction = () => {
  return [{ title: "退室処理" }];
};

export async function loader({ params }: LoaderArgs) {
  const guest = await prisma.guest.findFirst({
    where: { id: params.guest_id, exit_at: null, available: 1 },
    include: { Order: true },
  });

  return json({ guest });
}

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData();
  const ordersFee = formData.get("orders-fee");
  const hasCoupon = formData.get("has_coupon");
  const isShortStay = formData.get("is_short_stay");

  const datetime = new Date();

  await prisma.guest.update({
    where: {
      id: params.guest_id,
    },
    data: {
      exit_at: datetime,
      fee: Number(ordersFee),
      has_coupon: hasCoupon === "on" ? 1 : 0,
      is_short_stay: isShortStay === "on" ? 1 : 0,
    },
  });

  return redirect("/console/");
}

export default function Exit() {
  const transition = useTransition();
  const { guest } = useLoaderData<typeof loader>();
  const [hasCoupon, setHasCoupon] = useState(false);
  const [isShortStay, setIsShortStay] = useState(false);
  const seconds = dayjs().diff(dayjs(guest?.Order[0].order_at), "second");
  const [durationText, setDurationText] = useState(
    `${Math.floor(seconds / 60)} 分 ${seconds % 60} 秒`
  );

  const amount =
    guest?.Order.reduce((acc, order) => {
      return acc + menus[order.menu_id]?.price * order.count;
    }, 0) || 0;
  const orderCount = guest?.Order.reduce((acc, order) => {
    return acc + order.count;
  }, 0);

  const [fee, setFee] = useState(amount);

  useEffect(() => {
    if (guest !== null && amount && orderCount) {
      /*
      【クーポン割引】
      ・(注文数 * 50円)引き
      ・ただし注文数が人数より多い場合は人数分のみ割引く
      【短時間割引】
      ・(注文数 * 50円)引き
    */
      setFee(
        amount -
          (hasCoupon ? 50 : 0) * Math.min(guest.count, orderCount) -
          (isShortStay ? 50 : 0) * orderCount
      );
    }
  }, [guest, hasCoupon, isShortStay]);

  useIntervalBy1s(() => {
    const diff = dayjs().diff(dayjs(guest?.Order[0].order_at), "second");
    setDurationText(`${Math.floor(diff / 60)} 分 ${diff % 60} 秒`);
  });

  if (guest === null || !amount) return null;

  return (
    <Card className={cn("w-full", "lg:w-[380px]")}>
      <CardHeader>
        <CardTitle>精算処理</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableHead className="font-medium">番号札</TableHead>
              <TableCell>{guest.card_number}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="font-medium">人数</TableHead>
              <TableCell>{guest.count} 人</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="font-medium">注文内容</TableHead>
              <TableCell>
                <ul>
                  {guest.Order.map((order) => (
                    <li key={order.id}>
                      {menus[order.menu_id]?.name}: {order.count}個
                    </li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="font-medium">金額</TableHead>
              <TableCell>{amount} 円</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="font-medium">滞在時間</TableHead>
              {seconds / 60 <= 17 ? (
                <TableCell className={cn("text-red-500")}>
                  {durationText} (15分以内での退室)
                </TableCell>
              ) : (
                <TableCell>{durationText}</TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
        <Form className={cn("form-group", "py-3")} method="post">
          <div className={cn("flex", "items-center", "space-x-2", "pb-3")}>
            <Switch
              checked={hasCoupon}
              id="has_coupon"
              name="has_coupon"
              onCheckedChange={() => setHasCoupon((v) => !v)}
            />
            <Label htmlFor="has_coupon">クーポンを使う</Label>
          </div>
          <div className={cn("flex", "items-center", "space-x-2", "pb-3")}>
            <Switch
              checked={isShortStay}
              id="is_short_stay"
              name="is_short_stay"
              onCheckedChange={() => setIsShortStay((v) => !v)}
            />
            <Label htmlFor="is_short_stay">時間割引を使う</Label>
          </div>
          <div>
            <Label htmlFor="orders-fee">精算金額</Label>
            <InputNumber
              className={cn("text-lg", "h-auto")}
              max={4800}
              min={100}
              name="orders-fee"
              onChange={(e) => setFee(Number(e))}
              onInvalidNumber={(e) => console.error(e)}
              value={fee}
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
            {transition.submission ? (
              <RotateCw className={cn("mr-2", "h-4", "w-4", "animate-spin")} />
            ) : (
              <CupSoda className={cn("mr-2", "h-4", "w-4")} />
            )}
            精算する
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
