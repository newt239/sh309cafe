import type { V2_MetaFunction } from "@remix-run/node";

import H2 from "@/components/common/H2";
import { cn } from "@/lib/utils";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  return (
    <div className={cn("p-3", "grow")}>
      <H2>ホーム</H2>
    </div>
  );
}
