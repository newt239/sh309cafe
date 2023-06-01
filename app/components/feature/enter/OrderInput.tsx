import { useEffect, useState } from "react";

import { Plus, Trash2 } from "lucide-react";

import type { Menu } from "@prisma/client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { cn } from "@/lib/utils";

export default function OrderInput({
  menus,
  refresh,
}: {
  menus: Menu[];
  refresh: boolean | undefined;
}) {
  const [answers, setAnswers] = useState([{ menu_id: 1, count: 1 }]);

  const addAnswerField = () => {
    setAnswers([...answers, { menu_id: 1, count: 1 }]);
  };

  useEffect(() => {
    setAnswers([{ menu_id: 1, count: 1 }]);
  }, [refresh]);

  return (
    <>
      {answers.map((answer, i) => (
        <div
          className={cn("p-3", "mt-3", "rounded-md", "border")}
          key={answer.menu_id}
        >
          <div
            className={cn("pb-3", "flex", "items-center", "justify-between")}
          >
            <span>オーダー {i + 1}</span>
            <Button
              className={cn("py-0", "px-3", "items-center")}
              variant="secondary"
            >
              <Trash2 className={cn("h-4", "w-4")} />
            </Button>
          </div>
          <div className={cn("pb-3")}>
            <Label htmlFor="menu">メニュー</Label>
            <RadioGroup
              id="menu"
              name="menu_id[]"
              value={String(answer.menu_id)}
            >
              {menus.map((menu) => (
                <div
                  className="flex items-center space-x-2"
                  key={`menu-${String(menu.id)}`}
                >
                  <RadioGroupItem
                    id={`menu-${String(menu.id)}`}
                    onClick={(e) => {
                      setAnswers(
                        answers.map((answer, n) => {
                          if (i === n) {
                            return {
                              menu_id: menu.id,
                              count: answer.count,
                            };
                          }
                          return answer;
                        })
                      );
                    }}
                    value={String(menu.id)}
                  />
                  <Label htmlFor={`menu-${String(menu.id)}`}>{menu.name}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="menu-count">品数</Label>
            <Input
              id="menu-count"
              max={4}
              min={1}
              name="menu_count[]"
              onChange={(e) => {
                setAnswers(
                  answers.map((answer, n) => {
                    if (i === n) {
                      return {
                        menu_id: answer.menu_id,
                        count: Number(e.target.value),
                      };
                    }
                    return answer;
                  })
                );
              }}
              type="number"
              value={answer.count}
            />
          </div>
        </div>
      ))}

      <Button
        className={cn("w-full", "mt-3")}
        onClick={addAnswerField}
        type="button"
        variant="ghost"
      >
        <Plus className={cn("mr-2", "h-4", "w-4")} />
        オーダーを追加
      </Button>
    </>
  );
}
