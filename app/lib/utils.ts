import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { twMerge } from "tailwind-merge";

import prisma from "@/lib/prisma";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function updateCrowdStatus(count: number) {
  const crowdNumber = Math.max(Math.min(Math.floor((count / 20) * 5), 5), 1);
  try {
    const url = `${process.env.CROWD_STATUS_SHEET_URL}?value=${crowdNumber}`;
    await fetch(url, {
      method: "POST",
      redirect: "manual",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export const getHourlyOrderCounts = async () => {
  const orders = await prisma.order.findMany({
    where: {
      AND: {
        order_at: {
          gte: new Date("2023-07-22T07:00:00"),
          lt: new Date("2023-07-23T17:00:00"),
        },
      },
    },
    select: {
      order_at: true,
      menu_id: true,
      count: true,
    },
    orderBy: {
      order_at: "asc",
    },
  });

  const orderCounts: {
    [key: string]: {
      [key: string]: number;
    };
  } = {};

  let time = dayjs("2023-07-22T07:00:00");
  while (time.isBefore(dayjs("2023-07-23T17:00:00"))) {
    orderCounts[time.format("YYYY-MM-DD HH:00:00")] = {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
    };
    time = time.add(1, "hour");
  }

  for (const order of orders) {
    const hour = dayjs(order.order_at)
      .utc()
      .utcOffset(9)
      .format("YYYY-MM-DD HH:00:00");
    if (!orderCounts[hour]) {
      orderCounts[hour] = {};
    }
    orderCounts[hour][order.menu_id] += order.count;
  }

  const result = Object.entries(orderCounts)
    .map(([hour, orderCount]) => ({
      hour,
      "1": orderCount["1"],
      "2": orderCount["2"],
      "3": orderCount["3"],
      "4": orderCount["4"],
    }))
    .map((hour) => ({
      ...hour,
      total: hour["1"] + hour["2"] + hour["3"] + hour["4"],
    }));

  return result;
};
