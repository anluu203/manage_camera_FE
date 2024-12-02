import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Typography } from "@mui/material";

const fakeEvents = [
  { id: 1, timeStamp: "2024-11-01", resultCount: 5 },
  { id: 2, timeStamp: "2024-11-02", resultCount: 8 },
  { id: 3, timeStamp: "2024-11-03", resultCount: 12 },
];

const EventChart: React.FC = () => {
  const handleBarClick = (data: { timeStamp: string; resultCount: number }) => {
    alert(`Xem ảnh liên quan: ${data.timeStamp}`);
  };

  return (
    <div className="p-4">
      <Typography variant="h5" className="mb-4">
        Biểu đồ Sự kiện
      </Typography>
      <div className="bg-white shadow-md p-4 rounded-md">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={fakeEvents}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            onClick={(data) => {
              if (data && data.activePayload) {
                handleBarClick(data.activePayload[0].payload);
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timeStamp" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="resultCount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EventChart;
