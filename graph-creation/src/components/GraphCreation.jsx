import React, { useState } from "react";
import AppBarComponent from "../components/AppBarComponent";
import GraphSettingsComponent from "../components/GraphSettingsComponent";
import GraphPreviewComponent from "../components/GraphPreviewComponent";

const GraphCreation = () => {
  const [selectedGraphType, setSelectedGraphType] = useState("");
  const [graphTitle, setGraphTitle] = useState("");
  const [xAxisLabel, setXAxisLabel] = useState("Category");
  const [xAxisKey, setXAxisKey] = useState("category");
  const [yAxes, setYAxes] = useState([{ label: "Values", key: "value1" }]);

  const mockData = [
    { category: "A", value1: 4, value2: 9, value3: 2 },
    { category: "B", value1: 8, value2: 6, value3: 5 },
    { category: "C", value1: 5, value2: 3, value3: 1 },
  ];

  const handleAddYAxis = () => {
    setYAxes([...yAxes, { label: "", key: "" }]);
  };

  return (
    <div>
      <AppBarComponent />
      <div
        style={{
          marginTop: "64px",
          display: "flex",
          height: "calc(100vh - 64px)",
          gap: "20px",
          padding: "20px",
        }}
      >
        <GraphSettingsComponent
          graphTitle={graphTitle}
          setGraphTitle={setGraphTitle}
          selectedGraphType={selectedGraphType}
          setSelectedGraphType={setSelectedGraphType}
          xAxisLabel={xAxisLabel}
          setXAxisLabel={setXAxisLabel}
          xAxisKey={xAxisKey}
          setXAxisKey={setXAxisKey}
          yAxes={yAxes}
          setYAxes={setYAxes}
          handleAddYAxis={handleAddYAxis}
        />
        <div style={{ flex: 1, padding: "60px", width: "80%" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "bold" }}>Preview</h2>
          {graphTitle && <h3>{graphTitle}</h3>}
          <div
            style={{
              height: "70%",
              border: "2px solid black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "20px",
            }}
          >
            <GraphPreviewComponent
              selectedGraphType={selectedGraphType}
              xAxisLabel={xAxisLabel}
              xAxisKey={xAxisKey}
              yAxes={yAxes}
              mockData={mockData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphCreation;
