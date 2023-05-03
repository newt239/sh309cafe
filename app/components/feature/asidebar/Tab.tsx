import { Link } from "@remix-run/react";

import clsx from "clsx";

type Props = {
  type: "enter" | "exit";
};

export default function Tab({ type }: Props) {
  return (
    <div className={clsx("tabs", "tabs-boxed", "gap-1", "m-auto")}>
      <Link to="/console/enter">
        <input
          className="tab-toggle"
          defaultChecked={type === "enter"}
          id="toggle-enter"
          name="console-tab"
          type="radio"
        />
        <label className="tab" htmlFor="toggle-enter">
          入室処理
        </label>
      </Link>
      <Link to="/console/exit">
        <input
          className="tab-toggle"
          defaultChecked={type === "exit"}
          id="toggle-exit"
          name="console-tab"
          type="radio"
        />
        <label className="tab" htmlFor="toggle-exit">
          退室処理
        </label>
      </Link>
    </div>
  );
}
