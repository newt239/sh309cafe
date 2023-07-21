import type { ActionArgs, V2_MetaFunction } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";

import { CupSoda, Minus, Plus, RotateCw } from "lucide-react";
import { nanoid } from "nanoid";

import { InputNumber } from "@/components/common/InputNumber";
import OrderInput from "@/components/feature/enter/OrderInput";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";

export const meta: V2_MetaFunction = () => {
  return [{ title: "入店処理" }];
};

const MAX_CARD_NUMBER = 30;

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const guestCount = formData.get("guest-count");
  const cardNumber = formData.get("card-number");

  const guests = await prisma.guest.findMany({
    where: { exit_at: null, available: 1 },
  });
  const cardNumberList = guests.map((guest) => guest.card_number);

  if (cardNumberList.includes(Number(cardNumber))) {
    return {
      status: "error",
      id: "card-number",
      message: `番号札${cardNumber}は使用中です。`,
    };
  }

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
    const newCardNumber =
      Number(cardNumber) >= MAX_CARD_NUMBER ? 1 : Number(cardNumber) + 1;
    return { status: "success", newCardNumber };
  } else {
    return {
      status: "error",
      id: "no-item",
      message: "商品が選択されていません。",
    };
  }
}

export default function Enter() {
  const transition = useTransition();
  const actionData = useActionData();
  const formRef = useRef<HTMLFormElement>(null);

  const [guestCount, setGuestCount] = useState(2);
  const [cardNumber, setCardNumber] = useState(1);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    if (actionData?.status === "success") {
      formRef.current?.reset();
      setFlag((v) => !v);
      setGuestCount(2);
      setCardNumber(actionData?.newCardNumber);
    }
  }, [actionData]);

  return (
    <Card className={cn("w-full", "lg:w-[380px]")}>
      <CardHeader>
        <CardTitle>入店処理</CardTitle>
      </CardHeader>
      <CardContent>
        <Form method="post" ref={formRef}>
          <div>
            <div className={cn("pb-3")}>
              <Label htmlFor="guest-count">人数</Label>
              <div className={cn("flex", "gap-3")}>
                <Button
                  disabled={guestCount <= 1}
                  onClick={() => {
                    setGuestCount((v) => v - 1);
                  }}
                  type="button"
                >
                  <Minus />
                </Button>
                <InputNumber
                  max={4}
                  min={1}
                  name="guest-count"
                  onChange={(e) => {
                    setGuestCount(Number(e));
                  }}
                  onInvalidNumber={(e) => console.log(e)}
                  value={guestCount}
                />
                <Button
                  disabled={guestCount >= 4}
                  onClick={() => {
                    setGuestCount((v) => v + 1);
                  }}
                  type="button"
                >
                  <Plus />
                </Button>
              </div>
            </div>
            <div className={cn("pb-3")}>
              <Label htmlFor="card-numer">番号札</Label>
              <div className={cn("flex", "gap-3")}>
                <Button
                  disabled={cardNumber <= 1}
                  onClick={() => {
                    setCardNumber((v) => v - 1);
                  }}
                  type="button"
                >
                  <Minus />
                </Button>
                <InputNumber
                  max={MAX_CARD_NUMBER}
                  min={1}
                  name="card-number"
                  onChange={(e) => setCardNumber(e)}
                  onInvalidNumber={(e) => console.log(e)}
                  value={cardNumber}
                />
                <Button
                  disabled={cardNumber >= MAX_CARD_NUMBER}
                  onClick={() => {
                    setCardNumber((v) => v + 1);
                  }}
                  type="button"
                >
                  <Plus />
                </Button>
              </div>
              {actionData?.message && actionData?.id === "card-number" && (
                <p className="text-red-400">{actionData.message}</p>
              )}
            </div>
          </div>
          <OrderInput refresh={flag} />
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
            注文する
          </Button>
          {actionData?.message && actionData?.id === "no-item" && (
            <p className="text-red-400">{actionData.message}</p>
          )}
        </Form>
      </CardContent>
    </Card>
  );
}
