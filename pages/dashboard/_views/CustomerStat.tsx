import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DUMMY_PURCHASE_DATA = ["10", "40", "30", "20"];
const DUMMY_DATES = [
  "2023-02-18T07:19:27.628Z",
  "2023-02-19T07:19:27.628Z",
  "2023-02-20T07:19:27.628Z",
  "2023-02-21T07:19:27.628Z",
];

const CustomerStat = () => {
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
    <>
      <div className="flex items-center justify-between w-full mb-4">
        <h3 className="text-xl font-medium ">Customer stats</h3>
        <div className="px-5 py-2 bg-gray-200 cursor-pointer hover:underline rounded-xl">
          <p className="text-xs text-orange-600">View all</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between w-full bg-white rounded-2xl">
        <p className="mt-6 ml-6 text-gray-400 text-sm">
          <span className="text-4xl text-green-600 mr-1">27</span>7 day avg
        </p>
        {chartData && chartOptions && (
          <Chart options={chartOptions} series={chartData} type="area" />
        )}
      </div>
    </>
  );
};

export default CustomerStat;
