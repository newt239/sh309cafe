import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import H3 from "@/components/common/H3";
import prisma from "@/lib/prisma";

export const meta: V2_MetaFunction = () => {
  return [{ title: "統計" }];
};

export async function loader() {
  const result = await prisma.$queryRaw`
    SELECT hours.hour,
    COALESCE(SUM(Order.count), 0) AS total_count
    FROM (
        SELECT DATE_FORMAT(CONVERT_TZ(DATE_ADD('2023-06-03 15:00:00', INTERVAL hours.hour HOUR), '+00:00', '+09:00'), '%Y-%m-%d %H:00:00') AS hour
        FROM (
            SELECT 0 AS hour
            UNION SELECT 1
            UNION SELECT 2
            UNION SELECT 3
            UNION SELECT 4
            UNION SELECT 5
            UNION SELECT 6
            UNION SELECT 7
            UNION SELECT 8
            UNION SELECT 9
            UNION SELECT 10
            UNION SELECT 11
            UNION SELECT 12
            UNION SELECT 13
            UNION SELECT 14
            UNION SELECT 15
            UNION SELECT 16
            UNION SELECT 17
            UNION SELECT 18
            UNION SELECT 19
            UNION SELECT 20
            UNION SELECT 21
            UNION SELECT 22
            UNION SELECT 23
        ) AS hours
    ) AS hours
    LEFT JOIN Order ON DATE_FORMAT(CONVERT_TZ(Order.order_at, '+00:00', '+09:00'), '%Y-%m-%d %H:00:00') = hours.hour
    GROUP BY hours.hour
    ORDER BY hours.hour;
  `;

  return json({ result });
}

export default function StatsBar() {
  const { result } = useLoaderData<typeof loader>();
  console.log(result);

  return (
    <>
      <H3>時間帯別売上</H3>
      WIP
    </>
  );
}
