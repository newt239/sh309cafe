import type { V2_MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "店内管理" }];
};

export default function Console() {
  return (
    <>
      <h2>入退室管理</h2>
      <Outlet />
    </>
  );
}
