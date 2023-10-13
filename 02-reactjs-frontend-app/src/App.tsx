import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ToastifyContainerUI from "./modules/employees/components/toastify-ui/ToastifyContainerUI";
import NavBar from "./layout/pages/NavBar";
import RegisterUser from "./modules/employees/pages/register-employee/RegisterEmployee";
import ViewEmployee from "./modules/employees/pages/view-employee/ViewEmployee";
import UpdateEmployee from "./modules/employees/pages/update-employee/UpdateEmployee";
import ListEmployees from "./modules/employees/pages/list-employees/ListEmployees";
import NotFound404 from "./modules/employees/components/not-found/NotFound404";

function App() {
  return (
    <div className="">
      <ToastifyContainerUI />
      <NavBar />
      <Routes>
        <Route path="/" element={<ListEmployees />} />
        <Route path="/employees" element={<ListEmployees />} />
        <Route path="/register-employee" element={<RegisterUser />} />
        <Route path="/view-employee/:id" element={<ViewEmployee />} />
        <Route path="/update-employee/:id" element={<UpdateEmployee />} />
        <Route path="/*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
}

export default App;
