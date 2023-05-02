import type { V2_MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "統計" }];
};

export default function Stats() {
  return (
    <>
      <h2>統計</h2>
      <Outlet />
    </>
  );
}
