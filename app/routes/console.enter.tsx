import type { ActionArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";

import clsx from "clsx";
import { nanoid } from "nanoid";

import OrderInput from "~/components/feature/asidebar/OrderInput";
import Tab from "~/components/feature/asidebar/Tab";
import prisma from "~/libs/prisma";

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
  const menuIdList = formData.getAll("menu_id[]");
  const menuCountList = formData.getAll("menu_count[]");

  const datetime = new Date();

  const guestId = nanoid(10);

  await prisma.guest.create({
    data: {
      id: guestId,
      count: Number(guestCount),
      card_number: Number(cardNumber),
      enter_at: datetime,
    },
  });
  await prisma.order.createMany({
    data: menuIdList.map((menuId, index) => {
      return {
        id: nanoid(10),
        guest_id: guestId,
        menu_id: Number(menuId),
        count: Number(menuCountList[index]),
        order_at: datetime,
      };
    }),
  });

  return { message: "success" };
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
    <>
      <Tab type="enter" />
      <Form className={clsx("form-group", "py-3")} method="post" ref={formRef}>
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
            番号札
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
        <OrderInput menus={data.menus} refresh={isAdding} />

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
