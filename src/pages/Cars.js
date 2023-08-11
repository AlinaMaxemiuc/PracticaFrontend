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


  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [culoare, setCuloare] = useState("");
  const [km, setKm] = useState("");
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
      // components: {
      //   MuiTableCell: {
      //     styleOverrides: {
      //       root: {
      //         padding: "8px",
      //         width: "100px",
              
      //       },
      //     },
      //   },
      //   MuiToolbar: {
      //     styleOverrides: {
      //       regular: {
      //         minHeight: "8px",
      //         height: "100px",
      //       },
      //     },
      //   },
      //   MuiTable:{
      //     root: {
      //         padding: "8px",
      //         height: "90px",
      //     },
      //     header:{
      //       padding: "8px",
      //         height: "90px",
      //     },
      //     footer:{
      //       padding: "8px",
      //         height: "90px",
      //     }
      //   },
      // },
      // overrides:{
      //   MUIDataTable:{
      //     height:"120px",
      //   }
      // },
    });
  

    const handleDelete=async(rowsDeleted)=>{
      try {
 
          const url = `http://localhost:3001/car/${data[rowsDeleted.data[0].index][4]}`; 
          const response = await request(url, "DELETE", {});
    
          if (response.status !== 200) {
            console.log(`Failed to delete car with brand `);
    
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
            element.idcars
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
  }, [isModalOpen]);
  const saveCar = async () => {
    try {
      const carData = {
        brand: brand,
        model: model,
        culoare: culoare,
        km: km,
      };
      const url = "http://localhost:3001/car";
      const response = await request(url, "POST", carData);
      if (response.status === 201) {
        const newCar = [
          carData.brand,
          carData.model,
          carData.culoare,
          carData.km,
        ];
        setData([data, newCar]);
      }
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  const AddDialogCars = () => {
    const textField = {
      margin: "5px",
    };
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          style={textField}
          required
          id="outlined-required"
          label="Brand"
          type="text"
          onChange={(e) => setBrand(e.target.value)}
        />
        <TextField
          style={textField}
          required
          id="outlined-required"
          label="Model"
          type="text"
          onChange={(e) => setModel(e.target.value)}
        />
        <TextField
          style={textField}
          required
          id="outlined-required"
          label="Color"
          type="text"
          onChange={(e) => setCuloare(e.target.value)}
        />
        <TextField
          style={textField}
          required
          id="outlined-required"
          label="Range"
          type="text"
          onChange={(e) => setKm(e.target.value)}
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
        onSave={saveCar}
      />
    </Home>
  );
}
