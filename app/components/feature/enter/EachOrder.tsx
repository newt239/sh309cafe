import { useEffect, useState } from "react";

import { Minus, Plus } from "lucide-react";

import type { Menu } from "@/lib/types";

import { InputNumber } from "@/components/common/InputNumber";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/utils";

type EachOrderProp = {
  menu: Menu;
  refresh: boolean;
};

const EachOrder: React.FC<EachOrderProp> = ({ menu, refresh }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
  }, [refresh]);

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
        >
          <Minus />
        </Button>
        <InputNumber
          max={4}
          min={0}
          name={`menu${menu.id}_count`}
          onChange={(e) => {
            setCount(Number(e));
          }}
          onInvalidNumber={(e) => console.log(e)}
          value={count}
        />
        <Button
          disabled={count === 4}
          onClick={() => {
            setCount(count + 1);
          }}
          type="button"
        >
          <Plus />
        </Button>
      </div>
    </>
  );
};

export default EachOrder;
