import type { V2_MetaFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";

import H2 from "@/components/common/H2";
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { cn } from "@/lib/utils";

export const meta: V2_MetaFunction = () => {
  return [{ title: "統計" }];
};

export default function Stats() {
  const links = [
    { to: "/stats/guests", text: "ゲスト一覧" },
    { to: "/stats/pie", text: "売上比" },
    { to: "/stats/bar", text: "時間帯別売上" },
  ];

  return (
    <ScrollArea className={cn("h-full", "p-3", "grow")}>
      <H2>統計</H2>
      <div>
        <ul className={cn("list-disc")}>
          {links.map((link) => (
            <li key={link.text}>
              <Button asChild variant="link">
                <Link to={link.to}>{link.text}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </ScrollArea>
  );
}
