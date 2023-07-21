import { json, type V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import H2 from "@/components/common/H2";
import H3 from "@/components/common/H3";
import { cn } from "@/lib/utils";

export const meta: V2_MetaFunction = () => {
  return [{ title: "2023栄東祭 3年9組 販売管理システム" }];
};

export async function loader() {
  return json({
    ENV: {
      LINK_OF_MANUAL: process.env.LINK_OF_MANUAL,
      LINK_OF_SHIFT_TABLE: process.env.LINK_OF_SHIFT_TABLE,
    },
  });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className={cn("p-3", "grow")}>
      <H2>ホーム</H2>
      <div className={cn("pt-3")}>
        <H3>割引</H3>
        <ul className={cn("list-disc", "pl-5", "pt-2")}>
          <li>
            クーポン: 1グループ1枚までで「
            <b className={cn("text-red-500")}>注文数 x 50円引</b>
            」。ただし注文数が人数より多い場合は人数分のみ割引く
          </li>
          <li>
            時間割: 20分以内の退店で「
            <b className={cn("text-red-500")}>注文数 x 50円引</b>
            」（客には15分と説明する）
          </li>
          <li>
            家庭科部: 「<b className={cn("text-red-500")}>人数 x 150円引</b>
            」。クーポンや時間割があればそれも適用
          </li>
          <li>
            3年10組: 「<b className={cn("text-red-500")}>人数 x 50円引</b>
            」。クーポンや時間割があればそれも適用
          </li>
        </ul>
      </div>
      <div className={cn("pt-3")}>
        <H3>リンク集</H3>
        <ul className={cn("list-disc", "pl-5", "pt-2")}>
          <li>
            <a
              className={cn(
                "text-blue-600",
                "dark:text-blue-500",
                "hover:underline"
              )}
              href={data.ENV.LINK_OF_MANUAL}
              rel="noreferrer"
              target="_blank"
            >
              マニュアル
            </a>
          </li>
          <li>
            <a
              className={cn(
                "text-blue-600",
                "dark:text-blue-500",
                "hover:underline"
              )}
              href={data.ENV.LINK_OF_SHIFT_TABLE}
              rel="noreferrer"
              target="_blank"
            >
              シフト表
            </a>
          </li>
        </ul>
      </div>
      <div className={cn("pt-3")}>
        <H3>アプリ情報</H3>
        <ul className={cn("list-disc", "pl-5", "pt-2")}>
          <li>2023栄東祭 3年9組 販売管理システム</li>
          <li>v1.4.0</li>
          <li>最終更新: 2023/07/21 20:30</li>
        </ul>
      </div>
    </div>
  );
}
