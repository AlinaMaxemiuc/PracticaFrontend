import { useEffect, useState } from "react";
import { request } from "../utils/utils.js";
import Home from "./Home.js";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@emotion/react";
import CustomToolbar from "../components/CustomToolbar.js";
import { TextField, createTheme } from "@mui/material";
import Modal from "../components/Modal.js";

export default function Rental() {
  const [data, setData] = useState([]);
  const rentalColumns = ["Name", "Brand", "Model", "Start date", "Stop date"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    console.log("s a deschis");
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const options = {
    filterType: "checkbox",
    customToolbar: () => {
      return <CustomToolbar addModal={() => openModal()} />;
    },
  };
  const getMuiTheme = () =>
    createTheme({
      components: {
        MuiTableCell: {
          styleOverrides: {
            root: {
              padding: "8px",
              width: "150px",
            },
          },
        },
        MuiToolbar: {
          styleOverrides: {
            regular: {
              minHeight: "8px",
              height: "150px",
            },
          },
        },
      },
    });

  useEffect(() => {
    handleItemClickRental();
  }, []);

  const handleItemClickRental = async () => {
    console.log("Item 'Rentals' clicked");
    const rentalUrl = "http://localhost:3001/rentals";
    try {
      const responseData = await request(rentalUrl, "GET", null);
      let formattedData = [];
      responseData.forEach((element) =>
        formattedData.push([
          element.name,
          element.brand,
          element.model,
          element.startDate,
          element.stopDate,
        ])
      );
      setData(formattedData);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const AddDialogRental = () => {
    const textField = {
      margin: "5px",
    };
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          style={textField}
          required
          id="outlined-required"
          label="Name"
          type="text"
        />
        <TextField
          style={textField}
          required
          id="outlined-required"
          label="Brand"
          type="text"
        />
        <TextField
          style={textField}
          required
          id="outlined-required"
          label="Model"
          type="text"
        />
        <TextField
           style={textField}
           required
           id="outlined-required"
           label="First day"
           type="date"
           InputLabelProps={{
             shrink: true,
           }}
        />
        <TextField
          style={textField}
          required
          id="outlined-required"
          label="Last day"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    );
  };
  return (
    <Home>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={"Rental List"}
          data={data}
          columns={rentalColumns}
          options={options}
        />
      </ThemeProvider>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={closeModal}
        title="Rental a car"
        children={AddDialogRental}
      />
    </Home>
  );
}
