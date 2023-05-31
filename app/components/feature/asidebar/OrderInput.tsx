import { useEffect, useState } from "react";

import clsx from "clsx";

import type { Menu } from "@prisma/client";

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
        <>
          <div className={clsx("form-field")}>
            <label className={clsx("form-label")} htmlFor="menu">
              メニュー {i + 1}
            </label>
            <select
              className={clsx("input")}
              id="menu"
              name="menu_id[]"
              onChange={(e) => {
                setAnswers(
                  answers.map((answer, n) => {
                    if (i === n) {
                      return {
                        menu_id: Number(e.target.value),
                        count: answer.count,
                      };
                    }
                    return answer;
                  })
                );
              }}
              value={answer.menu_id}
            >
              {menus.map((menu) => (
                <option key={menu.id} value={menu.id}>
                  {menu.name}
                </option>
              ))}
            </select>
          </div>
          <div className={clsx("form-field")}>
            <label className={clsx("form-label")} htmlFor="menu-count">
              品数 {i + 1}
            </label>
            <input
              className={clsx("input")}
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
        </>
      ))}

      <button onClick={addAnswerField} type="button">
        Add Answer Field
      </button>
    </>
  );
}
