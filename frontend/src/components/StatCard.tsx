import "./comp-styles/StatCard.css";

type StatCardProps = {
  label: string,
  value: string
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="stat-tile">
      <p className="stat-value">{value}</p>
      <p className="stat-label">{label}</p>
    </div>
  );
}

export default StatCard;