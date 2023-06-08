import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import prisma from "@/lib/prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function updateCrowdStatus(count: number) {
  const crowdNumber = Math.max(Math.min(Math.floor((count / 20) * 5), 5), 1);
  console.log(crowdNumber);
  try {
    const url = `${process.env.CROWD_STATUS_SHEET_URL}?value=${crowdNumber}`;
    const res = await fetch(url, {
      method: "POST",
      redirect: "manual",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
  } catch (error) {
    console.error(error);
  }
}

export const getHourlyOrderCounts = async () => {
  const orders = await prisma.order.findMany({
    select: {
      order_at: true,
      count: true,
    },
    orderBy: {
      order_at: "asc",
    },
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
