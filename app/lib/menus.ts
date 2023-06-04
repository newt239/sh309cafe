import type { MenuObject } from "./types";

export const menus: MenuObject = {
  "1": {
    id: "1",
    name: "抹茶フラペチーノ",
    description: "",
    source: "",
    stock: 180,
    price: 300,
  },
  "2": {
    id: "2",
    name: "ダークモカフラペチーノ",
    description: "",
    source: "",
    stock: 180,
    price: 300,
  },
  "3": {
    id: "3",
    name: "キャラメルフラペチーノ",
    description: "",
    source: "",
    stock: 120,
    price: 300,
  },
  "4": {
    id: "4",
    name: "バニラフラペチーノ",
    description: "",
    source: "",
    stock: 120,
    price: 300,
  },
};

export const menuList = Object.values(menus);
