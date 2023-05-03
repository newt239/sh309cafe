import type { V2_MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import H2 from "~/components/common/H2";

export const meta: V2_MetaFunction = () => {
  return [{ title: "統計" }];
};

export default function Stats() {
  return (
    <>
      <H2>統計</H2>
      <Outlet />
    </>
  );
}
