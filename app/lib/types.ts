export type Menu = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  source: string;
};

export type MenuObject = {
  [key: string]: Menu;
};
