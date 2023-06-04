import { useState } from "react";

import { Minus, Plus } from "lucide-react";

import type { Menu } from "@prisma/client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/utils";

type EachOrderProp = {
  menu: Menu;
};

const EachOrder: React.FC<EachOrderProp> = ({ menu }) => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Label className={cn("block", "pb-2")} htmlFor={`menu${menu.id}_count`}>
        {menu.name}
      </Label>
      <div className={cn("flex", "gap-3", "pb-3")}>
        <Button
          disabled={count === 0}
          onClick={() => {
            setCount(count - 1);
          }}
          type="button"
          variant="secondary"
        >
          <Minus />
        </Button>
        <Input
          id={`menu${menu.id}_count`}
          max={4}
          min={0}
          name={`menu${menu.id}_count`}
          onChange={(e) => {
            setCount(Number(e.target.value));
          }}
          size={1}
          type="number"
          value={count}
        />
        <Button
          disabled={count === 4}
          onClick={() => {
            setCount(count + 1);
          }}
          type="button"
          variant="secondary"
        >
          <Plus />
        </Button>
      </div>
    </>
  );
};

export default EachOrder;
