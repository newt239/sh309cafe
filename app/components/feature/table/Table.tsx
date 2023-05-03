type Props = {
  id: number;
  current: number;
  limit: number;
};

export default function Table({ id, current, limit }: Props) {
  return (
    <div className="card">
      <div className="card-body">
        {current} / {limit}
      </div>
    </div>
  );
}
