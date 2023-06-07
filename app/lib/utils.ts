import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import prisma from "@/lib/prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getHourlyOrderCounts = async () => {
  const orders = await prisma.order.findMany({
    select: {
      order_at: true,
      count: true,
    },
    where: {},
  });

  const orderCounts: {
    [key: string]: number;
  } = {};
  for (const order of orders) {
    const hour = order.order_at.toISOString().slice(0, 13);
    if (!orderCounts[hour]) {
      orderCounts[hour] = 0;
    }
    orderCounts[hour] += order.count;
  }

  const result = Object.entries(orderCounts).map(([hour, orderCount]) => ({
    hour,
    orderCount,
  }));

  return result;
};
