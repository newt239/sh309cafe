import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import clsx from "clsx";
import dayjs from "dayjs";

import H2 from "~/components/common/H2";
import H3 from "~/components/common/H3";
import prisma from "~/libs/prisma";

export const meta: V2_MetaFunction = () => {
  return [{ title: "統計" }];
};

export async function loader() {
  const menus = await prisma.menu.findMany();
  const guests = await prisma.guest.findMany({
    take: 20,
    orderBy: [{ enter_at: "desc" }],
    include: { Order: true },
  });
  const orders = await prisma.order.groupBy({
    by: ["menu_id"],
    _sum: { count: true },
  });

  return json({ menus, guests, orders });
}

export default function Stats() {
  const { menus, guests, orders } = useLoaderData<typeof loader>();

  return (
    <div className={clsx("p-3", "grow")}>
      <H2>統計</H2>
      <H3>売上</H3>
      {orders.map((order) => {
        const menu = menus.find((menu) => menu.id === order.menu_id);
        return (
          <div key={order.menu_id}>
            {menu?.name} {order._sum.count} / {menu?.stock}
          </div>
        );
      })}
      <H3>注文履歴</H3>
      <div className="w-full overflow-x-auto p-3">
        <table className="table">
          <thead>
            <tr>
              <th>番号札</th>
              <th>人数</th>
              <th>入店時刻</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest.id}>
                <td>{guest.card_number}</td>
                <td>{guest.count}</td>
                <td>{dayjs(guest.enter_at).format("DD日 HH:mm:ss")}</td>
                <td>{dayjs().diff(guest.enter_at, "minute")}分</td>
              </tr>
            ))}
            {guests.length === 0 && (
              <tr>
                <td colSpan={3}>
                  <div className="alert alert-error w-full">
                    <svg
                      fill="none"
                      height="48"
                      viewBox="0 0 48 48"
                      width="48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clip-rule="evenodd"
                        d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM24 26C22.9 26 22 25.1 22 24V16C22 14.9 22.9 14 24 14C25.1 14 26 14.9 26 16V24C26 25.1 25.1 26 24 26ZM26 34H22V30H26V34Z"
                        fill="#E92C2C"
                        fill-rule="evenodd"
                      />
                    </svg>
                    <div className="flex w-full justify-between">
                      <div className="flex flex-col">
                        <span className="text-content2">
                          現在ゲストがいません
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Outlet />
    </div>
  );
}
