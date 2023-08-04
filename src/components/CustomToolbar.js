import React, { useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from "@mui/material";

function CustomToolbar ({addModal}) {
  const handleClick = () => {
    addModal();
  }
    return (
      <React.Fragment>
        <Tooltip title={"custom icon"}>
          <IconButton onClick={handleClick}>
            <AddIcon  />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
}

export default CustomToolbar;