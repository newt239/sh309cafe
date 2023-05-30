import type { ActionArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";

import clsx from "clsx";

import Tab from "~/components/feature/asidebar/Tab";
import prisma from "~/libs/prisma";

export const meta: V2_MetaFunction = () => {
  return [{ title: "入室処理" }];
};

export async function loader() {
  const menus = await prisma.menus.findMany();

  return json({ menus });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const guestCount = formData.get("guest-count");
  const cardNumber = formData.get("card-number");
  const menuId = formData.get("menu");
  const menuCount = formData.get("menu-count");

  const datetime = new Date();

  await prisma.guests.create({
    data: {
      id: datetime.getTime(),
      count: Number(guestCount),
      card_number: Number(cardNumber),
      enter_at: datetime,
    },
  });
  await prisma.orders.create({
    data: {
      id: datetime.getTime() * 10 + Math.floor(Math.random() * 99),
      menu_id: Number(menuId),
      count: Number(menuCount),
      guest_id: datetime.getTime(),
      order_at: datetime,
    },
  });

  return { message: "success" };
}

export default function Enter() {
  const data = useLoaderData<typeof loader>();
  const transition = useTransition();

  return (
    <>
      <Tab type="enter" />
      <Form className={clsx("form-group", "py-3")} method="post">
        <div className={clsx("form-field")}>
          <label className={clsx("form-label")} htmlFor="guest-count">
            人数
          </label>
          <input
            className={clsx("input")}
            defaultValue={4}
            id="guest-count"
            max={4}
            min={0}
            name="guest-count"
            type="number"
          />
        </div>
        <div className={clsx("form-field")}>
          <label className={clsx("form-label")} htmlFor="card-numer">
            テーブル番号
          </label>
          <input
            className={clsx("input")}
            defaultValue={1}
            id="card-numer"
            max={30}
            min={1}
            name="card-number"
            type="number"
          />
        </div>
        <div className={clsx("form-field")}>
          <label className={clsx("form-label")} htmlFor="menu">
            メニュー
          </label>
          <select className={clsx("input")} id="menu" name="menu">
            {data.menus.map((menu) => (
              <option key={menu.id} value={menu.id}>
                {menu.name}
              </option>
            ))}
          </select>
        </div>
        <div className={clsx("form-field")}>
          <label className={clsx("form-label")} htmlFor="menu-count">
            品数
          </label>
          <input
            className={clsx("input")}
            defaultValue={1}
            id="menu-count"
            max={4}
            min={1}
            name="menu-count"
            type="number"
          />
        </div>

        <div className="form-field pt-5">
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