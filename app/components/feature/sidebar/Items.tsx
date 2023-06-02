import clsx from "clsx";

import Item from "./Item";

export default function Items() {
  const items = [
    { to: "/console/enter", children: "入店処理" },
    { to: "/console/", children: "精算処理" },
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
