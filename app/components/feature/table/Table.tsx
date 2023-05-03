import clsx from "clsx";

type Props = {
  id: number;
  current: number;
  limit: number;
};

export default function Table({ id, current, limit }: Props) {
  return (
    <div className={clsx("card", "w-[100px]")}>
      <div className={clsx("card-body", "p-3")}>
        <span className="badge badge-primary">No. {id}</span>
        {current} / {limit}
      </div>
    </div>
  );
}
