import clsx from "clsx";

import Item from "./Item";

export default function Items() {
  const items = [
    { to: "/", children: "ホーム" },
    { to: "/console/enter", children: "入退室管理" },
    { to: "/stats", children: "統計" },
  ];

  return (
    <ul className={clsx("p-3")}>
      {items.map((item) => (
        <Item key={item.to} to={item.to}>
          {item.children}
        </Item>
      ))}
    </ul>
  );
}
