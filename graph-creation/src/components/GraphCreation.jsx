import React, { useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { ScatterChart } from "@mui/x-charts/ScatterChart";
import { AppBar, colors, Toolbar, Typography } from "@mui/material";
import { FiBarChart2 } from "react-icons/fi";
import mockData from "../components/MOCK_DATA.json";
import additionalData from "../components/mock2.json"; // Example additional data file
import newData from "../components/mock3.json";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';




const GraphCreation = () => {
  const dataFiles = {
    MockData: mockData,
  NewData: newData,
    AdditionalData: additionalData, // Add more data files here
  };

  const [selectedDataSource, setSelectedDataSource] = useState("MockData");
  const [selectedGraphType, setSelectedGraphType] = useState("");
  const [graphTitle, setGraphTitle] = useState("");
  const [xAxisLabel, setXAxisLabel] = useState("Category");
  const [xAxisKey, setXAxisKey] = useState("category");
  const [yAxes, setYAxes] = useState([{ label: "Values", key: "value1" }]);

  const handleAddYAxis = () => {
    setYAxes([...yAxes, { label: "New Y-Axis", key: "" }]);
  };
  const handleDeleteYAxis = (indexToDelete) => {
    setYAxes(yAxes.filter((_, index) => index !== indexToDelete));
  };

  const getSeriesData = () => {
    const data = dataFiles[selectedDataSource];
    return yAxes
      .map((axis) => {
        if (axis.key) {
          return {
            data: data.map((item) => item[axis.key]),
            label: axis.label || axis.key,
          };
        }
        return null;
      })
      .filter((series) => series !== null);
  };

  const renderPreview = () => {
    const data = dataFiles[selectedDataSource];
    const renderTitle = () => (
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
        {graphTitle || "Graph Title"}
      </h3>
    );

    if (!selectedGraphType) {
      return (
        <>
          {renderTitle()}
          <p></p>
        </>
      );
    }

    const xAxisConfig = [
      {
        label: xAxisLabel,
        scaleType: "band",
        data: data.map((item) => item[xAxisKey]),
        axisLineStyle: { stroke: "#ffffff" }, // White X-axis line
      tickStyle: { fill: "#ffffff" }, // White X-axis ticks
    
      },
    ];

    const seriesData = getSeriesData();
    const yAxisConfig = yAxes.map((axis) => ({
      label: axis.label,
      axisLineStyle: { stroke: "#ffffff" }, // White Y-axis line
      tickStyle: { fill: "#ffffff" }, // White Y-axis ticks
    }));

    switch (selectedGraphType) {
      case "Bar":
        return (
          <>
            {renderTitle()}
            <BarChart
              xAxis={xAxisConfig}
              yAxis={yAxes.map((axis) => ({ label: axis.label }))}
              series={seriesData}
              width={500}
              height={300}
            />
          </>
        );
      case "Line":
        return (
          <>
            {renderTitle()}
            <LineChart style={{
              axisLineStyle: {stroke: '#ffffff'},
               tickStyle: { fill: '#ffffff' }, 
            }}
              xAxis={xAxisConfig}
              yAxis={yAxes.map((axis) => ({ label: axis.label }))}
              series={seriesData}
              width={500}
              height={300}
            />
          </>
        );
        case "gauge":
          return(
            <>
            {renderTitle()}
            <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
      <Gauge
        value={72} // Value to display
        startAngle={0} // Start angle for the gauge (in degrees)
        endAngle={360} // End angle for the gauge (in degrees)
        innerRadius="80%" // Inner radius of the gauge as a percentage of its size
        outerRadius="100%" // Outer radius of the gauge
        thickness={12} // Thickness of the gauge bar
        color="blue" // Color of the gauge
        trackColor="lightgray" // Background color of the track
        textDisplayType="percentage" // Type of text display ("value", "percentage", or "none")
        valueLabelDisplay="auto" // Whether to show the value label
      />
    </div>
            </>
          );
      case "Pie":
        const pieData = data.map((item) => ({
          id: item[xAxisKey]?.toString() || "Unknown",
          value: item[yAxes[0]?.key] ? Number(item[yAxes[0]?.key]) : 0,
        }));

        if (pieData.some((d) => isNaN(d.value))) {
          return (
            <>
              {renderTitle()}
              <p>Invalid data for Pie chart. Please check your Y-Axis key.</p>
            </>
          );
        }

        return (
          <>
            {renderTitle()}
            <PieChart
              series={[
                {
                  data: pieData,
                  arcLabel: (item) => `${item.value}%`,
                  arcLabelMinAngle: 35,
                  arcLabelRadius: "60%",
                },
              ]}
              width={500}
              height={300}
            />
          </>
        );
      case "Scatter":
        const scatterDataX = data.map((item) => Number(item[xAxisKey]));
        const scatterDataY = data.map((item) => Number(item[yAxes[0]?.key]));
        if (scatterDataX.some(isNaN) || scatterDataY.some(isNaN)) {
          return (
            <>
              {renderTitle()}
              <p style={{textAlign:"center"}}>
                Invalid data for Scatter chart. Ensure X and Y keys have numeric
                values.
              </p>
            </>
          );
        }
        return (
          <>
            {renderTitle()}
           <ScatterChart
      width={600}
      height={300}
      series={[
        {
          label: 'Series A',
          data: data.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
        },
        {
          label: 'Series B',
          data: data.map((v) => ({ x: v.x2, y: v.y2, id: v.id })),
        },
      ]}
    />
          </>
        );
      default:
        return (
          <>
            {renderTitle()}
            <p>Unsupported graph type.</p>
          </>
        );
    }
  };

  return (
    <div>
      <AppBar
        position="static"
        style={{
          width: "auto",
          height: "50px",
          background: "none",
          
          
          borderRadius: "0px",
         boxshadow:"0px 4px 10px rgba(0, 0, 0, 0.3)",
          backgroundColor: "",
          zIndex: 1,
        }}
      >
        <Toolbar style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <FiBarChart2 size={24} style={{ color: "black" }} />
          </Typography>
        </Toolbar>
      </AppBar>

      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "20px",
        }}
      >
        <div
          style={{
            
            marginLeft: "30px",
            marginTop: "30px",
            marginRight: "50px",
            borderRadius: "20px",
            overflowY: "auto",
            padding: "60px",
            backgroundColor:"#42d7f5",
            height: "60vh",
            width: "36vw",
          }}
        >
          <h2 style={{ fontSize: "26px", fontWeight: "bold" }}>Graph Settings</h2>

          
          <label style={{ fontSize: "20px", display: "block" }}>
            Graph Title:
            <input
              type="text"
              value={graphTitle}
              onChange={(e) => setGraphTitle(e.target.value)}
              placeholder="Enter graph title"
              style={{
                width: "400px",
                padding: "10px",
                borderRadius: "8px",
                marginTop: "10px",
                border: "1px solid black",
              }}
            />
          </label>
          <br />
          
          <label style={{ fontSize: "20px", display: "block" }}>
            Select Data Source:
            <select
              value={selectedDataSource}
              onChange={(e) => setSelectedDataSource(e.target.value)}
              style={{
                width: "420px",
                padding: "10px",
                borderRadius: "8px",
                marginTop: "10px",
                border: "1px solid black",
              }}
            >
              {Object.keys(dataFiles).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label style={{ fontSize: "20px", display: "block" }}>
            Graph Type:
            <select
              value={selectedGraphType}
              onChange={(e) => setSelectedGraphType(e.target.value)}
              style={{
                width: "420px",
                padding: "10px",
                borderRadius: "8px",
                marginTop: "10px",
                border: "1px solid black",
                marginBottom: "10px",
              }}
            >
              <option value="">Select</option>
              <option value="Bar">Bar</option>
              <option value="Line">Line</option>
              <option value="Pie">Pie</option>
              <option value="Scatter">Scatter</option>
              <option value="gauge">Gauge</option>
            </select>
          </label>
          {selectedGraphType && (
            <>
              <label
                style={{ fontSize: "20px", marginTop: "10px", display: "block" }}
              >
                X-Axis Label:
                <input
                  type="text"
                  value={xAxisLabel}
                  onChange={(e) => setXAxisLabel(e.target.value)}
                  placeholder="Enter X-axis label"
                  style={{
                    width: "400px",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid black",
                    marginTop: "10px",
                  }}
                />
              </label>
              <br />
              <label style={{ fontSize: "20px", display: "block" }}>
                Select X-Axis Key:
                <select
                  value={xAxisKey}
                  onChange={(e) => setXAxisKey(e.target.value)}
                  style={{
                    width: "420px",
                    padding: "10px",
                    borderRadius: "8px",
                    marginTop: "10px",
                    border: "1px solid black",
                  }}
                >
                  <option value="">Select</option>
                  {Object.keys(dataFiles[selectedDataSource][0]).map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </label>
              <br />
              {yAxes.map((axis, index) => (
                <div key={index}>
                  <label
                    style={{
                      fontSize: "20px",
                      marginTop: "5px",
                      display: "block",
                      color:"black",

                    }}
                  >
                    Y-Axis Label:
                    <input
                      type="text"
                      value={axis.label}
                      onChange={(e) =>
                        setYAxes(
                          yAxes.map((a, i) =>
                            i === index ? { ...a, label: e.target.value } : a
                          )
                        )
                      }
                      placeholder="Enter Y-axis label"
                      style={{
                        width: "400px",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid black",
                        marginTop: "10px",
                      }}
                    />
                  </label>
                  <br />
                  <label
                    style={{
                      fontSize: "20px",
                      display: "block",
                      marginTop: "10px",
                    }}
                  >
                    Select Y-Axis Key:
                    <select
                      value={axis.key}
                      onChange={(e) =>
                        setYAxes(
                          yAxes.map((a, i) =>
                            i === index ? { ...a, key: e.target.value } : a
                          )
                        )
                      }
                      style={{
                        width: "420px",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid black",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <option value="">Select</option>
                      {Object.keys(dataFiles[selectedDataSource][0]).map((key) => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleDeleteYAxis(index)}
                    style={{
                      marginTop: "10px",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      color: "white",
                      backgroundColor: "red",
                      border: "none",
                    }}
                  >
                    Delete Y-Axis
                  </button>
                </div>
              ))}
               
              <button
                type="button"
                onClick={handleAddYAxis}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  borderRadius: "8px",
                 color:"white",
                  backgroundColor: "blue",
                  border: "none",
                }}
              >
                Add Y-Axis
              </button>
             
            </>
          )}
        </div>

        <div
          style={{
            color:"black",
            borderRadius: "20px",
            padding: "40px",
            marginTop: "30px",
            marginRight:"30px",
            height: "65vh",
            width: "50vw",
            alignItems:"center",
            backgroundColor:"#42d7f5",
          }}
        >
          <h2 style={{ fontSize: "26px", fontWeight: "bold", padding: "10px" ,color:"black"}}>
            Graph Preview
          </h2>
          <div>{renderPreview()}</div>
        </div>
      </div>
    </div>
  );
};

export default GraphCreation;
