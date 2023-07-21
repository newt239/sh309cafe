import type { V2_MetaFunction } from "@remix-run/node";

import H2 from "@/components/common/H2";
import { cn } from "@/lib/utils";

export const meta: V2_MetaFunction = () => {
  return [{ title: "2023栄東祭 3年9組 販売管理システム" }];
};

export default function Index() {
  return (
    <div className={cn("p-3", "grow")}>
      <H2>ホーム</H2>
      <p>2023栄東祭 3年9組 販売管理システム</p>
    </div>
  );
}
