import React from "react";
import { List, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";

function NavButton({
  open,
  sidebarItems,
  activeButton,
  handleButtonClick,
  isDarkMode,
  title,
}) {
  return (
    <div>
      {open && (
        <ListItem disablePadding sx={{ display: "block", mt: 1, pl: 1 }}>
          <div
            style={{
              opacity: 1,
              color: "var(--Drawer-color-theme)",
              fontSize: "16px",
              fontWeight: 600,
              marginBottom: "2px",
              lineHeight: "20px",
            }}
          >
            {title}
          </div>
        </ListItem>
      )}
      <List>
        {sidebarItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                bgcolor:
                  activeButton === item.name
                    ? "var(--Drawer-buttonActive-color-theme)" // Corrected CSS variable reference
                    : "transparent",
                m: 0.5,
                borderRadius: "10px",
              }}
              component={Link}
              to={item.link.toLowerCase().split(" ").join("-")}
              onClick={() => handleButtonClick(item.name)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <img
                  src={item.icon}
                  alt=""
                  style={{ width: "24px", height: "24px" }}
                />
              </ListItemIcon>
              {open && (
                <div
                  style={{
                    color: "var(--Drawer-color-theme)",
                    fontSize: "16px",
                    fontWeight: 600,
                    marginBottom: "2px",
                    lineHeight: "20px",
                  }}
                >
                  {item.pageName}
                </div>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default NavButton;
