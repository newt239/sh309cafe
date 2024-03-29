import clsx from "clsx";

import Item from "@/components/feature/sidebar/Item";

export default function Items() {
  const items = [
    { to: "/", children: "ホーム" },
    { to: "/console/enter", children: "入店処理" },
    { to: "/console/", children: "精算処理" },
    { to: "/history", children: "注文履歴" },
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
