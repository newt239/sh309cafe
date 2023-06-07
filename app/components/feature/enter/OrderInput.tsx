import EachOrder from "./EachOrder";

import { menuList } from "@/lib/menus";
import { cn } from "@/lib/utils";

type OrderInputProp = {
  refresh: boolean;
};
const OrderInput: React.FC<OrderInputProp> = ({ refresh }) => {
  return (
    <div className={cn("p-3", "pt-6", "mt-3", "rounded-md", "border")}>
      {menuList.map((menu) => (
        <EachOrder key={menu.id} menu={menu} refresh={refresh} />
      ))}
    </div>
  );
};

export default OrderInput;
