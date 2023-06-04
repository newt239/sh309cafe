type MenuProp = {
  [key: string]: {
    id: string;
    name: string;
    price: number;
  };
};

export const menus: MenuProp = {
  "1": {
    id: "1",
    name: "抹茶フラペチーノ",
    price: 300,
  },
  "2": {
    id: "2",
    name: "ダークモカフラペチーノ",
    price: 300,
  },
  "3": {
    id: "3",
    name: "キャラメルフラペチーノ",
    price: 300,
  },
  "4": {
    id: "4",
    name: "バニラフラペチーノ",
    price: 300,
  },
};
