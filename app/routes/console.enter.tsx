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
  const tableId = formData.get("table-number");
  const menu = formData.get("menu");
  const menuCount = formData.get("menu-count");

  const datetime = new Date();

  const data = await prisma.guests.create({
    data: {
      id: datetime.getTime(),
      count: Number(guestCount),
      table_id: Number(tableId),
      enter_at: datetime,
    },
  });
  console.log(data);

  return { menu };
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
          <label className={clsx("form-label")} htmlFor="table-numer">
            テーブル番号
          </label>
          <input
            className={clsx("input")}
            defaultValue={1}
            id="table-numer"
            max={6}
            min={1}
            name="table-number"
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
