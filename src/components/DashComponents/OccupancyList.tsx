import { OccupancyItem } from "@/types/dashboard";

interface OccupancyListProps {
  data: OccupancyItem[];
}

export default function OccupancyList({ data }: OccupancyListProps) {
  const getStatus = (percentual: number) => {
    if (percentual >= 80) return 'high';
    if (percentual >= 50) return 'medium';
    return 'low';
  };

  return (
    <div className="occupancy-list">
      <div className="occupancy-list-header">
        <h3 className="occupancy-list-title">Ocupação das Salas</h3>
      </div>
      
      <div className="occupancy-list-items">
        {data.map((item, i) => {
          const status = getStatus(item.percentual);
          return (
            <div key={i} className="occupancy-item">
              <div className="occupancy-item-info">
                <div className="occupancy-item-sala">{item.sala}</div>
                <div className="occupancy-item-curso">{item.curso}</div>
              </div>
              
              <div className="occupancy-item-stats">
                <div className="occupancy-item-numbers">
                  {item.ocupacao}/{item.capacidade}
                </div>
                <span className={`occupancy-item-percent ${status}`}>
                  {item.percentual}%
                </span>
              </div>
              
              <div className="occupancy-item-bar">
                <div 
                  className={`occupancy-item-progress ${status}`}
                  style={{ width: `${item.percentual}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}