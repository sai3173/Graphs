import React from "react";

const GraphSettingsComponent = ({
  graphTitle,
  setGraphTitle,
  selectedGraphType,
  setSelectedGraphType,
  xAxisLabel,
  setXAxisLabel,
  xAxisKey,
  setXAxisKey,
  yAxes,
  setYAxes,
  handleAddYAxis,
}) => {
  return (
    <div
      style={{
        border: "2px solid black",
        borderRadius: "20px",
        overflowY: "auto",
        padding: "50px",
        height: "70%",
        width: "30%",
      }}
    >
      <h2
        style={{
          fontSize: "26px",
          fontWeight: "bold",
          display: "block",
        }}
      >
        Graph Settings
      </h2>
      <label
        style={{
          fontSize: "20px",
          display: "block",
        }}
      >
        Graph Title:
        <input
          type="text"
          value={graphTitle}
          onChange={(e) => setGraphTitle(e.target.value)}
          placeholder="Enter graph title"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            marginTop: "10px",
            border: "1px solid black",
          }}
        />
      </label>
      <br />
      <label
        style={{
          fontSize: "20px",
          display: "block",
        }}
      >
        Graph Type:
        <select
          value={selectedGraphType}
          onChange={(e) => setSelectedGraphType(e.target.value)}
          style={{
            width: "106%",
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
        </select>
      </label>
      {selectedGraphType && (
        <>
          <div style={{ display: "flex", gap: "35px", marginTop: "10px" }}>
            <div style={{ width: "48%" }}>
              <label
                style={{
                  fontSize: "20px",
                  display: "block",
                }}
              >
                X-Axis Label:
                <input
                  type="text"
                  value={xAxisLabel}
                  onChange={(e) => setXAxisLabel(e.target.value)}
                  placeholder="Enter X-axis label"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid black",
                    marginTop: "10px",
                  }}
                />
              </label>
            </div>

            <div style={{ width: "48%" }}>
              <label
                style={{
                  fontSize: "20px",
                  display: "block",
                }}
              >
                X-Axis Key:
                <input
                  type="text"
                  value={xAxisKey}
                  onChange={(e) => setXAxisKey(e.target.value)}
                  placeholder="Enter X-axis key"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid black",
                    marginTop: "10px",
                  
                  }}
                />
              </label>
            </div>
          </div>
          <br />
          {yAxes.map((axis, index) => (
            <div key={index} style={{ display: "flex", gap: "35px", marginTop: "10px" }}>
              <div style={{ width: "48%" }}>
                <label
                  style={{
                    fontSize: "20px",
                    display: "block",
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
                      width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid black",
                    marginTop: "10px",
                    marginBottom:"10px",
                    }}
                  />
                </label>
              </div>

              <div style={{ width: "48%" }}>
                <label
                  style={{
                    fontSize: "20px",
                    display: "block",
                  }}
                >
                  Y-Axis Key:
                  <input
                    type="text"
                    value={axis.key}
                    onChange={(e) =>
                      setYAxes(
                        yAxes.map((a, i) =>
                          i === index ? { ...a, key: e.target.value } : a
                        )
                      )
                    }
                    placeholder="Enter Y-axis key"
                    style={{
                      width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid black",
                    marginTop: "10px",
                    marginBottom:"10px",
                    }}
                  />
                </label>
              </div>
            </div>
          ))}
          <button
            onClick={handleAddYAxis}
            style={{
              width: "30%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid black",
              marginTop: "20px",
            }}
          >
            Add Y-Axis
          </button>
        </>
      )}
    </div>
  );
};

export default GraphSettingsComponent;
