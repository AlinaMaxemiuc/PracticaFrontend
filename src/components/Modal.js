import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  createTheme,
} from "@mui/material";
import { useState } from "react";

export default function Modal({
  setIsModalOpen,
  isModalOpen,
  title,
  children,
  onSave,
}) {
  const [data, setData] = useState();
  const handleCloseModal = () => {
    console.log("close modal");
    setIsModalOpen(false);
  };

  const saveInfo = (data) => {
    console.log("save");
    setIsModalOpen(true);
    setData(data);
  };
  return (

      <Dialog open={isModalOpen} sx={{ width: "100vw",
      height: "100vh"  }}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children()}</DialogContent>
        <DialogActions>
          <Button onClick={onSave}>Save</Button>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>

  );
}
