import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Wrapper from "../assets/wrappers/Overview";

// Sample data
const data = [
  { month: "January", value: 10000 },
  { month: "February", value: 5000 },
  { month: "March", value: 2000 },
  { month: "April", value: 1000 },
  { month: "May", value: 3000 },
  { month: "June", value: 20000 },
  { month: "July", value: 100000 },
  { month: "August", value: 5000 },
  { month: "September", value: 1000 },
  { month: "October", value: 500 },
  { month: "November", value: 300 },
  { month: "December", value: 200 },
];

const overview = () => {
    return (
      <Wrapper>
        <div className="overview-container">
          <h2 className="flex justify-start text-xl font-semibold  text-black font-popping">
            Overview
          </h2>
          <ResponsiveContainer>
            <AreaChart
              data={data}
              margin={{ top: 20, right: 0, bottom: 20, left: 20 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tick={{ fill: "#00000087", fontSize: 12, fontWeight: "700" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tick={{ fill: "#00000087", fontSize: 12, fontWeight: "700" }}
                tickFormatter={(value) => {
                  if (value >= 1_000_000) return `${value / 1_000_000}M`;
                  if (value >= 1_000) return `${value / 1_000}K`;
                  return value;
                }}
              />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#1d4ed8"
                fillOpacity={1}
                fill="url(#colorValue)"
                strokeWidth={4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Wrapper>
    );
};

export default overview;
