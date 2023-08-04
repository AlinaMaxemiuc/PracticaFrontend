import { useEffect, useState } from "react";
import Home from "./Home";
import { request } from "../utils/utils";
import MUIDataTable from "mui-datatables";
import CustomToolbar from "../components/CustomToolbar";
import { Box, TextField, createTheme, makeStyles } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import Modal from "../components/Modal";

export default function Cars() {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const carColumns = ["Brand", "Model", "Color", "Range"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    console.log("s a deschis");
    setIsModalOpen(true);
  };
  const closeModal = () => {
    console.log("close modal");
    setIsModalOpen(false);
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
  const options = {
    filterType: "checkbox",
    customToolbar: () => {
      return <CustomToolbar addModal={() => openModal()} />;
    },
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
            element.km,
          ])
        );

        setData(formattedData);
        setColumns(carColumns);
      };

      fetchData();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  const AddDialogCars = () => {
    const textField={
      margin:"5px"
    }
    return (
        <div style={{display: "flex",
          flexDirection: "column"}}>
          <TextField style={textField}
            required
            id="outlined-required"
            label="Brand"
            type="text"
          />
          <TextField style={textField}
            required
            id="outlined-required"
            label="Model"
            type="text"
          />
          <TextField style={textField}
            required
            id="outlined-required"
            label="Color"
            type="text"
          />
          <TextField style={textField}
            required
            id="outlined-required"
            label="Range"
            type="text"
          />
        </div>
    );
  
  };
  return (
    <Home>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={"Cars List"}
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
      <Modal 
          isModalOpen={isModalOpen}
          setIsModalOpen={closeModal}
          title="Add new car"
          children={AddDialogCars}
        />
    </Home>
  );
}
