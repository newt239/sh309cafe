import { Card, DonutChart, Title } from "@tremor/react";

import { cn } from "@/lib/utils";

export type PieProps = {
  title: string;
  data: {
    name: string;
    value: number;
  }[];
};

const Pie: React.FC<PieProps> = ({ title, data }) => (
  <Card className={cn("w-1/3")} decoration="top">
    <Title>{title}</Title>
    <DonutChart
      category="value"
      colors={["blue", "green", "yellow", "red"]}
      data={data}
      index="name"
      showLabel
      variant="pie"
    />
  </Card>
);

export default Pie;
