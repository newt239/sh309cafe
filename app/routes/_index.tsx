import type { V2_MetaFunction } from "@remix-run/node";

import { clsx } from "clsx";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  return (
    <div className={clsx("p-3")}>
      <h1 className={clsx("font-bold", "text-4xl")}>sh309cafe</h1>
    </div>
  );
}
