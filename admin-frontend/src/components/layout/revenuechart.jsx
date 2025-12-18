import { useEffect } from "react";
import ApexCharts from "apexcharts";

const RevenueChart = () => {
  useEffect(() => {
    const chart = new ApexCharts(
      document.querySelector("#revenue-chart"),
      {
        chart: { type: "area", height: 300 },
        series: [
          { name: "Sales", data: [10, 20, 30, 40, 50] },
        ],
      }
    );

    chart.render();

    return () => chart.destroy();
  }, []);

  return <div id="revenue-chart"></div>;
};

export default RevenueChart;
