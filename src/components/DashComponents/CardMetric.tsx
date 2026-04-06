interface Props {
  title: string;
  value: number | string;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
}

export default function CardMetric({ 
  title, 
  value, 
  variant = "default" 
}: Props) {
  return (
    <div className={`card-metric ${variant}`}>
      <p className="card-metric-title">{title}</p>
      <h2 className="card-metric-value">{value}</h2>
    </div>
  );
}