import type { V2_MetaFunction } from "@remix-run/node";

import H2 from "@/components/common/H2";
import H3 from "@/components/common/H3";
import { cn } from "@/lib/utils";

export const meta: V2_MetaFunction = () => {
  return [{ title: "2023栄東祭 3年9組 販売管理システム" }];
};

export default function Index() {
  return (
    <div className={cn("p-3", "grow")}>
      <H2>ホーム</H2>
      <p>2023栄東祭 3年9組 販売管理システム</p>
      <div className={cn("pt-3")}>
        <H3>割引</H3>
        <ul className={cn("list-disc", "pl-5", "pt-2")}>
          <li>
            クーポン: 1グループ1枚までで「注文数 x
            50円引」。ただし注文数が人数より多い場合は人数分のみ割引く
          </li>
          <li>
            時間割: 20分以内の退店で「注文数 x 50円引」（客には15分と説明する）
          </li>
          <li>家庭科部: 一律で「注文数 x 200円引」</li>
          <li>
            3年10組: クーポンや時間割があれば適用し、その上で「注文数 x 50円引」
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
              href={process.env.LINK_OF_MANUAL}
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
              href={process.env.LINK_OF_SHIFT_TABLE}
              rel="noreferrer"
              target="_blank"
            >
              シフト表
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
