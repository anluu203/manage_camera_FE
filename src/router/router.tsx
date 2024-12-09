// src/router.tsx

import React from "react";
import {  Route, Routes, Navigate } from "react-router-dom";
import SignUpPage from "@/page/signup";
import LoginPage from "@/page/login";
import HomePage from "@/page/home";
import ManageRoom from "@/component/admin/ManageRoom";
import EventChart from "@/component/chart/EventChart";
import UsersPage from "@/page/users";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";
const AppRouter: React.FC = () => {
  return (
      <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<PublicRoute component={LoginPage} />} />
            <Route path="/signUp" element={<PublicRoute component={SignUpPage} />} />
            <Route path="/home" element={<PrivateRoute component={HomePage} />} />
            <Route path="/users" element={<PrivateRoute component={UsersPage} />} />
            <Route path="/rooms" element={<PrivateRoute component={ManageRoom} />} />
            <Route path="/chart" element={<PrivateRoute component={EventChart} />} />
      </Routes>
  );
};

export default AppRouter;
