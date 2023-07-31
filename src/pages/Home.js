import { useEffect, useState } from "react";
import home from "../assets/home.css";
import MUIDataTable from "mui-datatables";
import { request } from "../utils/utils.js";

export default function Home() {

  const[data,setData]=useState([]);
  const columns = ["Brand", "Model", "Color", "Range"];

  const options = {
    filterType: 'checkbox',
  };
  useEffect(() => {
    const url = "http://localhost:3001/car";
    try {
      const responseData = request(url, "GET", setData(data));
      //localStorage.setItem("user", JSON.stringify(responseData));
      console.log(responseData);
    } catch (error) {
      console.error(error);
      throw error;
    }

    // fetch('http://localhost:3001/get')
    // .then(res=>{

    //   let data=res.json();
    //   console.log(data);
    // });
  }, []);
  return (
    <div className="bgd">
      {/* <div className="homePage">Coming soon</div> */}
      <MUIDataTable
        title={"Cars List"}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
}
