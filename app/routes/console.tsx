import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import clsx from "clsx";

import H2 from "~/components/common/H2";
import Table from "~/components/feature/table/Table";
import prisma from "~/libs/prisma";

export const meta: V2_MetaFunction = () => {
  return [{ title: "店内管理" }];
};

export async function loader() {
  const data = await prisma.tables.findMany();
  console.log(data);

  return json({ tables: data });
}

export default function Console() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className={clsx("flex", "w-full")}>
      <div className={clsx("p-3", "grow")}>
        <H2>入退室管理</H2>
        <div className={clsx("p-3", "flex", "gap-3")}>
          {data.tables.map((table) => (
            <Table
              current={1}
              id={table.id}
              key={table.id}
              limit={table.limit}
            />
          ))}
        </div>
      </div>
      <div
        className={clsx(
          "m-6",
          "p-3",
          "w-[300px]",
          "border-solid",
          "border-2",
          "border-sky-500",
          "rounded-xl"
        )}
      >
        <Outlet />
      </div>
    </div>
  );
}
