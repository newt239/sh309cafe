import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "退室処理" }];
};

export default function Exit() {
  return (
    <div>
      <div className="tabs tabs-boxed gap-1">
        <Link to="/console/enter">
          <input
            className="tab-toggle"
            id="toggle-enter"
            name="console-tab"
            type="radio"
          />
          <label className="tab" htmlFor="toggle-enter">
            入室処理
          </label>
        </Link>
        <input
          className="tab-toggle"
          defaultChecked
          id="toggle-exit"
          name="console-tab"
          type="radio"
        />
        <label className="tab" htmlFor="toggle-exit">
          退室処理
        </label>
      </div>
      <p>hey</p>
    </div>
  );
}
