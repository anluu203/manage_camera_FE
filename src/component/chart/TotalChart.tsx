// import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const TotalChart: React.FC = () => {
//   const data = {
//     labels: ["User", "Camera", "Room"],
//     datasets: [
//       {
//         label: "Total",
//         backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
//         data: [5, 7, 4],
//       },
//     ],
//   };

//   const options = {
//     plugins: {
//       legend: {
//         display: false,
//       },
//       title: {
//         display: true,
//         text: "Chart categories in this project",
//       },
//     },
//     responsive: true,
//     maintainAspectRatio: false,
//   };

//   return (
//       <Bar data={data} options={options} />
//   );
// };

// export default TotalChart;



import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const TotalChart: React.FC = () => {
 const data = {
  labels: ['User', 'Camera', 'Room'],
  datasets: [
    {
      label: 'Total',
      data: [7, 4, 2],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Total categories in this project",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
return (
    <Doughnut data={data} options={options} />
);
}
export default TotalChart;

// export function App() {
//   return <Doughnut data={data} />;
// }
