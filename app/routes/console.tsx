import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import clsx from "clsx";

import H2 from "~/components/common/H2";
import H3 from "~/components/common/H3";
import Table from "~/components/feature/table/Table";
import prisma from "~/libs/prisma";

export const meta: V2_MetaFunction = () => {
  return [{ title: "店内管理" }];
};

export async function loader() {
  const tables = await prisma.tables.findMany();
  const guests = await prisma.guests.findMany();

  return json({ tables, guests });
}

export default function Console() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className={clsx("flex", "w-full")}>
      <div className={clsx("p-3", "grow")}>
        <H2>入退室管理</H2>
        <H3>テーブル一覧</H3>
        <div className={clsx("p-3", "flex", "flex-wrap", "gap-3")}>
          {data.tables.map((table) => (
            <Table
              current={1}
              id={table.id}
              key={table.id}
              limit={table.limit}
            />
          ))}
        </div>
        <div>
          <H3>ゲスト一覧</H3>
          <div className="w-full overflow-x-auto p-3">
            <table className="table">
              <thead>
                <tr>
                  <th>テーブル番号</th>
                  <th>人数</th>
                  <th>入店時刻</th>
                </tr>
              </thead>
              <tbody>
                {data.guests.map((guest) => (
                  <tr key={guest.id}>
                    <td>{guest.table_id}</td>
                    <td>{guest.count}</td>
                    <td>{guest.enter_at}</td>
                  </tr>
                ))}
                {data.guests.length === 0 && (
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
        </div>
      </div>
      <div className={clsx("p-3", "w-[350px]")}>
        <div
          className={clsx(
            "p-3",
            "border-solid",
            "border-2",
            "border-sky-500",
            "bg-sky-50",
            "rounded-xl"
          )}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
