import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";

const GraphPreviewComponent = ({ selectedGraphType, xAxisLabel, xAxisKey, yAxes, mockData }) => {
  const getSeriesData = () => {
    return yAxes
      .map((axis) => {
        if (axis.key) {
          return {
            data: mockData.map((item) => item[axis.key]),
          };
        }
        return null;
      })
      .filter((series) => series !== null);
  };

  const xAxisConfig = [
    {
      label: xAxisLabel,
      scaleType: "band",
      data: mockData.map((item) => item[xAxisKey]),
    },
  ];

  const seriesData = getSeriesData();

  switch (selectedGraphType) {
    case "Bar":
      return (
        <BarChart
          xAxis={xAxisConfig}
          yAxis={yAxes.map((axis) => ({ label: axis.label }))}
          series={seriesData}
          width={500}
          height={300}
        />
      );
    case "Line":
      return (
        <LineChart
          xAxis={xAxisConfig}
          yAxis={yAxes.map((axis) => ({ label: axis.label }))}
          series={seriesData}
          width={500}
          height={300}
        />
      );
    default:
      
  }
};

export default GraphPreviewComponent;
