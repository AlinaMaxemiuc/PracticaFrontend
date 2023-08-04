import { Children, useEffect, useState } from "react";
import home from "../assets/home.css";
import MUIDataTable from "mui-datatables";
import { request } from "../utils/utils.js";

import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EmojiTransportation from "@mui/icons-material/EmojiTransportation";
import TimeToLeave from "@mui/icons-material/TimeToLeave";
import Menu from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

export default function Home({children}) {
  const drawerWidth = 240;
  const navigator = useNavigate();
  const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
    },
  }));

  const [show, setShow] = useState(false);

  const showDrawer = () => {
    setShow(!show);
  };

  function handleItemClickCar(){
    navigator("/cars");
  }

  function handleItemClickRental(){
    navigator("/rental");
  }
  
  return (
    <div className="bgd">
      <StyledDrawer variant="permanent" anchor="left">
        <List>
          <ListItemButton divider onClick={showDrawer} open={show}>
            <ListItemIcon>
              <Menu />
            </ListItemIcon>
            <ListItemText primary="Menu" />
          </ListItemButton>
          <Drawer
            variant="persistent"
            anchor="left"
            open={show}
            PaperProps={{
              sx: {
                marginTop: 8,
              },
            }}
          >
            <List>
              <ListItemButton divider onClick={handleItemClickRental}>
                <ListItemIcon>
                  <EmojiTransportation />
                </ListItemIcon>
                <ListItemText primary="Rentals" />
              </ListItemButton>
            </List>
            <List>
              <ListItemButton divider onClick={handleItemClickCar}>
                <ListItemIcon>
                  <TimeToLeave />
                </ListItemIcon>
                <ListItemText primary="Cars" />
              </ListItemButton>
            </List>
          </Drawer>
        </List>
      </StyledDrawer>
      {children}
    </div>
  );
}
