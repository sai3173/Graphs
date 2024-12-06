import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { FiBarChart2 } from "react-icons/fi";

const AppBarComponent = () => {
  return (
    <AppBar
      position="absolute"
      style={{
        width: "100%",
        height: "50px",
        background: "none",
        marginTop: "6px",
        borderRadius: "10px",
        boxShadow: "none",
        border: "2px solid black",
        zIndex: 1,
      }}
    >
      <Toolbar style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <FiBarChart2 size={24} style={{ color: "black" }} />
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
