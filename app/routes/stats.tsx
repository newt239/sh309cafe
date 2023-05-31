import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import H2 from "~/components/common/H2";
import prisma from "~/libs/prisma";

export const meta: V2_MetaFunction = () => {
  return [{ title: "統計" }];
};

export async function loader() {
  const guests = await prisma.guest.findMany({
    take: 20,
    orderBy: [{ enter_at: "desc" }],
  });

  return json({ guests });
}

export default function Stats() {
  return (
    <>
      <H2>統計</H2>
      <Outlet />
    </>
  );
}
