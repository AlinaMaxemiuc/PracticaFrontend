import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

import Login from "../pages/Login";
import Rental from "../pages/Rental";
import Cars from "../pages/Cars";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cars />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Cars/>}/>
        <Route path="/cars" element={<Cars/>}/>
        <Route path="/rental" element={<Rental/>}/>
      </Routes>
    </BrowserRouter>
  );
}
