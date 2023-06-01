import type { V2_MetaFunction } from "@remix-run/node";

import H2 from "@/components/common/H2";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  return (
    <>
      <H2>ホーム</H2>
    </>
  );
}
