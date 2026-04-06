"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { ReceitaMensal } from "@/types/dashboard";

interface Props {
  data: ReceitaMensal[];
}

export default function RevenueChart({ data }: Props) {
  return (
    <div className="revenue-chart">
      <h3 className="revenue-chart-title">Receita Mensal</h3>
      <div className="revenue-chart-wrapper">
        <LineChart width={500} height={300} data={data}>
          <XAxis dataKey="mes" stroke="#64748b" fontSize={12} tickLine={false} axisLine={{ stroke: "#334155" }} />
          <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={{ stroke: "#334155" }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#1e293b", 
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "0.75rem",
              color: "#f1f5f9"
            }} 
          />
          <Line 
            type="monotone" 
            dataKey="total" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: "#60a5fa" }}
          />
        </LineChart>
      </div>
    </div>
  );
}