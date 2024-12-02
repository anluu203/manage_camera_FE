// src/router.tsx

import React from "react";
import {  Route, Routes, Navigate } from "react-router-dom";
import SignUpPage from "@/page/signup";
import LoginPage from "@/page/login";
import HomePage from "@/page/home";
import ManageRoom from "@/component/admin/ManageRoom";
import EventChart from "@/component/chart/EventChart";
import UsersPage from "@/page/users";

const AppRouter: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/users" element={<UsersPage/>} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/rooms" element={<ManageRoom/>} />
        <Route path="/chart" element={<EventChart/>} />
      </Routes>
  );
};

export default AppRouter;
