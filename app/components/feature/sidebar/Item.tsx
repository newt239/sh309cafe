import { Link } from "@remix-run/react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function Item({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <Button
      asChild
      className={cn("w-full", "text-white", "justify-start")}
      variant="link"
    >
      <Link to={to}>{children}</Link>
    </Button>
  );
}
