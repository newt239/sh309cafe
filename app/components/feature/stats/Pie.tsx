import { Card, DonutChart, Legend, Title } from "@tremor/react";

import { COLORS } from "@/lib/const";
import { cn } from "@/lib/utils";

export type PieProps = {
  title: string;
  data: {
    name: string;
    value: number;
  }[];
};

const Pie: React.FC<PieProps> = ({ title, data }) => (
  <Card className={cn("w-full", "lg:w-2/3")} decoration="top">
    <Title>{title}</Title>
    <div className={cn("flex", "flex-row", "gap-1")}>
      <DonutChart
        category="value"
        colors={["blue", "green", "yellow", "red"]}
        data={data}
        index="name"
        variant="pie"
      />
      <Legend
        categories={data.map((d) => d.name)}
        className={cn("flex-col", "grow", "w-1/2")}
        colors={COLORS}
      />
    </div>
  </Card>
);

export default Pie;
