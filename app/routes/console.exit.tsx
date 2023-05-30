import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useTransition } from "@remix-run/react";

import clsx from "clsx";

import Tab from "~/components/feature/asidebar/Tab";
import prisma from "~/libs/prisma";

export const meta: V2_MetaFunction = () => {
  return [{ title: "退室処理" }];
};

export async function loader() {
  const tables = await prisma.tables.findMany();
  const guests = await prisma.guests.findMany({ where: { exit_at: null } });
  const currentTables = tables.map(() => 0);
  guests.map((guest) => (currentTables[guest.table_id - 1] += guest.count));

  return json({ tables, currentTables, guests });
}

export default function Exit() {
  const transition = useTransition();

  return (
    <>
      <Tab type="exit" />
      <Form className={clsx("form-group", "py-3")} method="post">
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
