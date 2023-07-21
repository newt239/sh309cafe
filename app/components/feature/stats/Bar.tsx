import { AreaChart, Card, Title } from "@tremor/react";

type Props = {
  data: {
    hour: string;
    total: number;
    "1": number;
    "2": number;
    "3": number;
    "4": number;
  }[];
  title: string;
};

const Hourly: React.FC<Props> = ({ data, title }) => {
  const editedData = data.map((d) => {
    return {
      hour: d.hour,
      計: d.total,
      抹茶: d["1"],
      ダークモカ: d["2"],
      キャラメル: d["3"],
      バニラ: d["4"],
    };
  });

  return (
    <Card decoration="top">
      <Title>{title}</Title>
      <AreaChart
        categories={["計", "抹茶", "ダークモカ", "キャラメル", "バニラ"]}
        className="mt-6"
        colors={["gray", "blue", "green", "yellow", "red"]}
        data={editedData}
        index="hour"
        yAxisWidth={48}
      />
    </Card>
  );
};

export default Hourly;
