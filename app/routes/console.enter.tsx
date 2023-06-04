import type { ActionArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { CupSoda } from "lucide-react";
import { nanoid } from "nanoid";

import OrderInput from "@/components/feature/enter/OrderInput";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";

export const meta: V2_MetaFunction = () => {
  return [{ title: "入室処理" }];
};

export async function loader() {
  const menus = await prisma.menu.findMany();

  return json({ menus });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const guestCount = formData.get("guest-count");
  const cardNumber = formData.get("card-number");

  const datetime = new Date();
  const guestId = nanoid(10);
  const orders = [];

  for (let i = 0; i < 4; i++) {
    const menuCount = formData.get(`menu${i + 1}_count`);
    if (Number(menuCount) > 0) {
      orders.push({
        id: nanoid(10),
        guest_id: guestId,
        menu_id: String(i + 1),
        count: Number(menuCount),
        order_at: datetime,
        available: 1,
      });
    }
  }

  if (orders.length > 0) {
    await prisma.guest.create({
      data: {
        id: guestId,
        count: Number(guestCount),
        card_number: Number(cardNumber),
        enter_at: datetime,
        available: 1,
      },
    });
    await prisma.order.createMany({
      data: orders,
    });
    return { message: "success" };
  } else {
    return { message: "error" };
  }
}

export default function Enter() {
  const data = useLoaderData<typeof loader>();
  const transition = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const isAdding =
    transition.submission &&
    transition.submission.formData.get("action") === "create";

  useEffect(() => {
    if (!isAdding) {
      formRef.current?.reset();
    }
  }, [isAdding]);

  return (
    <Card className={cn("w-full", "lg:w-[380px]")}>
      <CardHeader>
        <CardTitle>入店処理</CardTitle>
      </CardHeader>
      <CardContent>
        <Form method="post" ref={formRef}>
          <div className={cn("pb-3")}>
            <Label htmlFor="guest-count">人数</Label>
            <Input
              defaultValue={4}
              id="guest-count"
              max={4}
              min={0}
              name="guest-count"
              type="number"
            />
          </div>
          <div className={cn("pb-3")}>
            <Label htmlFor="card-numer">番号札</Label>
            <Input
              defaultValue={1}
              id="card-numer"
              max={30}
              min={1}
              name="card-number"
              type="number"
            />
          </div>
          <OrderInput menus={data.menus} refresh={isAdding} />

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
            登録する
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
