import { useEffect, useState } from "react";

import { Input } from "@/components/ui/Input";

type Props = {
  name?: string;
  value: number;
  onChange: (value: number) => void;
  onInvalidNumber: (value: string) => void;
  min?: number;
  max?: number;
  className?: string;
};

export const InputNumber = ({
  name,
  value,
  onChange,
  onInvalidNumber,
  min,
  max,
  className,
}: Props) => {
  const [localValue, setLocalValue] = useState<string>(`${value}`);

  useEffect(() => {
    setLocalValue(`${value}`);
  }, [value]);

  const isInRange = (v: number) => {
    const larger = min ? v >= min : true;
    const smaller = max ? v <= max : true;
    return larger && smaller;
  };

  const onChangeHandler = (value: string) => {
    const v = value.replace(/[０-９．]/g, (s) =>
      String.fromCharCode(s.charCodeAt(0) - 0xfee0)
    );
    if (!isNaN(Number(v))) {
      if (isInRange(Number(v))) {
        setLocalValue(value);
        onInvalidNumber(value);
        onChange(Number(v));
      } else {
        onInvalidNumber(`${v}は範囲外の数字です`);
      }
    } else {
      onInvalidNumber(`${v}は数字ではありません`);
    }
  };

  return (
    <Input
      className={className}
      id={name}
      inputMode="numeric"
      name={name}
      onChange={(e) => onChangeHandler(e.target.value)}
      type="text"
      value={localValue}
    />
  );
};
