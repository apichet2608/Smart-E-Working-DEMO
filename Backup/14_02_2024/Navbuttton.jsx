import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function Navbuttton({
  open,
  sidebarItems,
  activeButton,
  handleButtonClick,
  isDarkMode,
}) {
  return (
    <div>
      {open ? (
        <ListItem disablePadding sx={{ display: "block", mt: 1, pl: 1 }}>
          <div
            fontWeight="bold"
            style={{
              opacity: open ? 1 : 0,
              color: "#616161",
              fontSize: "16px",
              // fontWeight: 500,
            }}
          >
            Title
          </div>
        </ListItem>
      ) : null}
      <List>
        {sidebarItems.map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                bgcolor:
                  activeButton === text.name
                    ? isDarkMode
                      ? "#E0E4E5"
                      : "#42a5f5"
                    : "transparent",
                m: 0.5,
                borderRadius: "10px",
              }}
              component={Link}
              to={`${text.link.toLowerCase().split(" ").join("-")}`}
              onClick={() => handleButtonClick(text.name)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <img
                  style={{ width: "24px", height: "24px" }}
                  src={text.icon}
                />
              </ListItemIcon>
              <div
                style={{
                  display: open ? "block" : "none",
                  color: "#616161",
                  fontSize: "16px",
                  fontWeight: 600, // Correctly placed inside the style attribute
                  marginBottom: "2px",
                  lineHeight: "20px",
                }}
              >
                {text.name}
              </div>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Navbuttton;
