import { useState, useEffect } from "react";
import { Sale } from "solar-icon-set";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DUMMY_PURCHASE_DATA = ["10", "40", "30", "20"];
const DUMMY_DATES = [
  "2023-02-18T07:19:27.628Z",
  "2023-02-19T07:19:27.628Z",
  "2023-02-20T07:19:27.628Z",
  "2023-02-21T07:19:27.628Z",
];

const StatChartCard = () => {
  const [chartData, setChartData] = useState<any>("");
  const [chartOptions, setChartOptions] = useState<any>("");

  useEffect(() => {
    setChartData([
      {
        data: DUMMY_PURCHASE_DATA,
      },
    ]);

    setChartOptions({
      chart: {
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      grid: {
        show: false,
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      markers: {
        enabled: false,
      },

      colors: ["#eee"],
      dataLabels: {
        enabled: false,
        style: {
          opacity: 0,
          fontSize: 0,
          color: "#A9A9A9",
        },
        background: {
          borderRadius: 100,
        },
      },
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        colors: undefined,
        width: 2,
        dashArray: 0,
      },
      xaxis: {
        type: "datetime",
        categories: DUMMY_DATES,
        lines: {
          show: false,
        },
        labels: {
          show: false,
          style: {
            colors: "#fff",
          },
        },
      },
      yaxis: [
        {
          lines: {
            show: false,
          },
          labels: {
            show: false,
            formatter: (val: any) => parseFloat(val).toFixed(1),
            style: {
              colors: "#fff",
            },
          },
        },
      ],
      legend: {
        enabled: false,
        labels: {
          colors: "#A9A9A9",
        },
      },
      tooltip: {
        enabled: false,
        x: {
          format: "dd/MM/yy",
        },
        y: {
          formatter: (val: any) => parseFloat(val).toFixed(1),
        },
      },
    });
  }, []);

  return (
    <div className="flex w-full gap-3 p-4 bg-white rounded-2xl">
      <div className="flex items-center gap-4 text-blue-500">
        <Sale size={30} />
        <div>
          <span>
            ₹ <strong className="text-xl font-medium">1,231</strong>
          </span>
          <p className="text-xs text-gray-400">Total sales</p>
        </div>
        {chartData && chartOptions && (
          <Chart
            options={chartOptions}
            series={chartData}
            type="area"
            height={100}
            width="100%"
            style={{ marginBottom: "-1rem" }}
          />
        )}
      </div>
    </div>
  );
};

export default StatChartCard;
