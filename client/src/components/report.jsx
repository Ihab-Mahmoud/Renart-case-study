// DonutChart.jsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ReportElement } from ".";
import Wrapper from "../assets/wrappers/Report";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);
function getSum(arr) {
  return arr.reduce((total, num) => total + num, 0);
}

//  Custom plugin for center text
const centerTextPlugin = {
  id: "centerText",
  beforeDraw: (chart) => {
    const { width, height, ctx } = chart;
    ctx.save();

    const sumText = `${getSum([7087, 2272, 76, 2230])}`;
    const secondaryText = "PCS";

    // Common settings
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // First line (sumText)
    ctx.font = `25px sans-serif`; // Larger
    ctx.fillStyle = "#1f2937";
    ctx.fillText(sumText, width / 2, height / 2);

    // Second line (secondaryText)
    ctx.font = `bold 10px sans-serif`; // Smaller or styled differently
    ctx.fillStyle = "#00000047";
    ctx.fillText(secondaryText, width / 2, height / 2 + 20);

    ctx.restore();
  },
};

const Report = () => {
  const labels = [
    "Karton",
    "r_hdpe",
    "aerosol",
    "pet",
    "Karton",
    "r_hdpe",
    "aerosol",
    "pet",
  ];
  const backgroundColor = [
    "#e40b90",
    "#0097ff",
    "#33d397",
    "#ff6e5f",
    "#e40b90",
    "#0097ff",
    "#33d397",
    "#ff6e5f",
  ];

  const dataSet = [7087, 2272, 76, 2230, 7087, 2272, 76, 2230];
  const combined = labels.map((label, i) => ({
    label,
    value: dataSet[i],
    color: backgroundColor[i],
  }));
  const data = {
    labels: labels,
    datasets: [
      {
        label: "",
        data: dataSet,
        backgroundColor: backgroundColor,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    cutout: "70%", // Controls the donut hole
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        display: false,
      },
    },
  };

  return (
    <Wrapper>
      <div className="rep-container ">
        <h2 className="flex justify-start text-xl font-semibold font-popping text-black">
          Report
        </h2>
        <div className="flex  items-center overflow-hidden pb-4 justify-around">
          <div className="w-[150px] h-[150px]">
            <Doughnut
              data={data}
              options={options}
              plugins={[centerTextPlugin]}
            />
          </div>

          <div className="space-y-2 flex flex-col gap-3 overflow-auto  scroll-container">
            {combined.map((element, index) => {
              return (
                <ReportElement
                  value={element.value}
                  color={element.color}
                  label={element.label}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Report;
