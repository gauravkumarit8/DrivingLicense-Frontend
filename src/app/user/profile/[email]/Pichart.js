import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Pichart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
      type: "pie",
      data: {
        labels: ["Trainging Completed", "Remaining Trainging Hours"],
        datasets: [
          {
            label: "Total Hours of Training ",
            data: [data, 20 - data],
            backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 205, 86)"],
            // hoverOffset: 4,
          },
        ],
      },
    });
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  });

  return (
    <div className="w-[400px] h-[400px] m-auto">
      <canvas ref={chartRef} />
    </div>
  );
};
export default Pichart;
