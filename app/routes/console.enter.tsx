import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "入室処理" }];
};

export default function Enter() {
  return (
    <div>
      <div className="tabs tabs-boxed gap-1">
        <input
          className="tab-toggle"
          defaultChecked
          id="toggle-enter"
          name="console-tab"
          type="radio"
        />
        <label className="tab" htmlFor="toggle-enter">
          入室処理
        </label>
        <Link to="/console/exit">
          <input
            className="tab-toggle"
            id="toggle-exit"
            name="console-tab"
            type="radio"
          />
          <label className="tab" htmlFor="toggle-exit">
            退室処理
          </label>
        </Link>
      </div>
      <p>hey</p>
    </div>
  );
}
