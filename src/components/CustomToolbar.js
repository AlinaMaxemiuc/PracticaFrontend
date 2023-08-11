import React, { useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Icon, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

function CustomToolbar ({addModal}) {
  const handleClick = () => {
    addModal();
  }

  const handleDelete=()=>{
    console.log("click!", this.props.selectedRows); 
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