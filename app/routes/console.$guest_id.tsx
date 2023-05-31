import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";

import clsx from "clsx";
import dayjs from "dayjs";

import Tab from "~/components/feature/asidebar/Tab";
import prisma from "~/libs/prisma";

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

  console.log(orders);

  const amount = orders.reduce((acc, order) => {
    return acc + order.menu.price * order.count;
  }, 0);

  return (
    <>
      <Tab type="exit" />
      <Form className={clsx("form-group", "py-3")} method="post">
        <div className="form-field pt-5">
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                {order.menu.name}: {order.count}個
              </li>
            ))}
          </ul>
          <h3>金額</h3>
          <p>{amount}円</p>
          <h3>滞在時間</h3>
          <p>{dayjs().diff(dayjs(orders[0].order_at), "second")}秒</p>

          <div className={clsx("form-field")}>
            <label className={clsx("form-label")} htmlFor="orders-fee">
              支払い
            </label>
            <input
              className={clsx("input")}
              defaultValue={amount}
              id="orders-fee"
              max={2000}
              min={100}
              name="orders-fee"
              type="number"
            />
          </div>
          <div className="form-control justify-between">
            <button
              className="btn btn-primary w-full"
              disabled={Boolean(transition.submission)}
              type="submit"
            >
              送信
            </button>
          </div>
        </div>
      </Form>
    </>
  );
}
