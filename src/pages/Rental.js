import { useEffect, useState } from "react";
import { request } from "../utils/utils.js";
import Home from "./Home.js";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@emotion/react";
import CustomToolbar from "../components/CustomToolbar.js";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  createTheme,
} from "@mui/material";
import Modal from "../components/Modal.js";
import { FindInPage } from "@mui/icons-material";
import moment from "moment/moment.js";

export default function Rental() {
  const [data, setData] = useState([]);
  const [brands, setBrands] = useState([]);
  const rentalColumns = ["Name", "Brand", "Model", "Start date", "Stop date"];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [startDate, setStartDate] = useState("");
  const [stopDate, setStopDate] = useState("");

  const rentalHeader=[
    {
      label: "Name",
      name: "name",
    },
    {
      label: "Brand",
      name: "brand",
    },
    {
      label: "Model",
      name: "model",
    },
    {
      label: "First day",
      name: "startDate",
      options:{
        customBodyRender: (e)=>{
          return(moment(e).format('DD-MM-YYYY'));
        }
      }
    },
    {
      label: "Last day",
      name: "stopDate",
      options:{
        customBodyRender: (e)=>{
          return(moment(e).format('DD-MM-YYYY'));
        }
      }
    }
  ];
  const openModal = () => {
    console.log("s a deschis");
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete=async(rowsDeleted)=>{
    try {

        const url = `http://localhost:3001/rentals/${data[rowsDeleted.data[0].index][5]}`; 
        const response = await request(url, "DELETE", {});
  
        if (response.status !== 200) {
          console.log(`Failed to delete rental `);
  
      }
    } catch (error) {  
      console.log(error);
    }
  };

  const options = {
    filterType: "checkbox",
    customToolbar: () => {
      return <CustomToolbar addModal={() => openModal()} />;
    },
    rowsPerPageOptions: [],
    rowsPerPage: 8,
    selectableRows: true,
    onRowsDelete: (rowsDeleted)=>handleDelete(rowsDeleted),
  };
  const getMuiTheme = () =>
    createTheme({
      components: {
        // overrides:{
        //     MUIDataTable:{
        //       spacing:20,
        //     }
        //   },
        // MuiTableCell: {
        //   styleOverrides: {
        //     root: {
        //       padding: "8px",
        //       width: "150px",
        //     },
        //   },
        // },
        // MuiToolbar: {
        //   styleOverrides: {
        //     regular: {
        //       minHeight: "8px",
        //       height: "150px",
        //     },
        //   },
        // },
      },
    });

  useEffect(() => {
    handleItemClickRental();
    handleBrand();
  }, [isModalOpen]);

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
          element.idrentals
        ])
      );
      setData(formattedData);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const saveRental = async () => {
    try {
      console.log("msg");
      const rentalData = {
        iduser: JSON.parse(localStorage.getItem("user"))["idusers"],
        idcar: brand,
        // model: model,
        startDate: startDate,
        stopDate: stopDate,
      };
      const url = "http://localhost:3001/rentals";
      const response = await request(url, "POST", rentalData);
      if (response.status === 201) {
        const newRental = [
          rentalData.name,
          rentalData.brand,
          rentalData.model,
          rentalData.startDate,
          rentalData.stopDate,
        ];
        setData([data, newRental]);
      }
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  const handleBrand = async () => {
    const url = "http://localhost:3001/brand";
    try {
      const responseData = await request(url, "GET", null);
      let formattedData = [];
      responseData.forEach((element) =>
        formattedData.push([element.brand, element.model])
      );
      setBrands(responseData);
    } catch (error) {
      console.log(error);
    }
  };
  const AddDialogRental = () => {
    const textField = {
      margin: "5px",
      color: "black",
    };
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <FormControl fullWidth style={textField}>
          <InputLabel id="demo-simple-select-label">Car</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            required
            id="demo-simple-select"
            label="Car"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            {brands.map((brand,index) => {
              return (
                <MenuItem value={brand.idcars} key={index}>
                  {brand.brand + " " + brand.model}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          style={textField}
          required
          id="outlined-required"
          label="First day"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setStartDate(e.target.value)}
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
          onChange={(e) => setStopDate(e.target.value)}
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
          columns={rentalHeader}
          options={options}
        />
      </ThemeProvider>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={closeModal}
        title="Rental a car"
        children={AddDialogRental}
        onSave={saveRental}
      />
    </Home>
  );
}
