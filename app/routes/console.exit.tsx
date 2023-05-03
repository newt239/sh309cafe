import type { V2_MetaFunction } from "@remix-run/node";

import Tab from "~/components/feature/asidebar/Tab";

export const meta: V2_MetaFunction = () => {
  return [{ title: "退室処理" }];
};

export default function Exit() {
  return (
    <>
      <Tab type="exit" />
      <p>hey</p>
    </>
  );
}
