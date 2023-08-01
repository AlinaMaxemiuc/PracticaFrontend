import { useEffect, useState } from "react";
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

export default function Home() {
  const drawerWidth = 240;

  const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
    },
  }));

  const [data, setData] = useState([]);

  const [show,setShow]=useState(false);

  const columns = ["Brand", "Model", "Color", "Range"];

  const options = {
    filterType: "checkbox",
  };
  useEffect(() => {
    const url = "http://localhost:3001/car";
    try {
      const fetchData = async () => {
        const responseData = await request(url, "GET", null);
        let formattedData = [];
        responseData.forEach((element) =>
          formattedData.push([
            element.brand,
            element.model,
            element.culoare,
            element.range,
          ])
        );

        setData(formattedData);
      };

      fetchData();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  const handleItemClick = () => {
    console.log("Item clicked");
  };
  const showDrawer =()=>{
    setShow(!show);
  };

  return (
    <div className="bgd">
      <StyledDrawer variant="permanent" anchor="left">
        <List>
          <ListItemButton divider onClick={showDrawer} open={show}>
            <ListItemIcon>
              <Menu ></Menu>

            </ListItemIcon>
            <ListItemText primary="Menu" />
          </ListItemButton>
          <Drawer variant = "persistent"  anchor="left" open={show}  PaperProps={{
    sx: {
      marginTop: 8
    }
  }}>
          <List>
            <ListItemButton divider onClick={handleItemClick}>
              <ListItemIcon>
                <EmojiTransportation />
              </ListItemIcon>
              <ListItemText primary="Rentals" />
            </ListItemButton>
          </List>
          <List>
            <ListItemButton divider onClick={handleItemClick}>
              <ListItemIcon>
                <TimeToLeave />
              </ListItemIcon>
              <ListItemText primary="Cars" />
            </ListItemButton>
          </List>
        </Drawer>
        </List>

      </StyledDrawer>
      <MUIDataTable
        title={"Cars List"}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
}
