import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import H3 from "@/components/common/H3";
import { getHourlyOrderCounts } from "@/lib/utils";

export const meta: V2_MetaFunction = () => {
  return [{ title: "統計" }];
};

export async function loader() {
  const result = await getHourlyOrderCounts();

  return json({ result });
}

export default function StatsBar() {
  const { result } = useLoaderData<typeof loader>();

  return (
    <>
      <H3>時間帯別売上</H3>
      <BarChart data={result} height={250} width={730}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="orderCount" fill="#8884d8" />
      </BarChart>
    </>
  );
}
