import React, { useState } from "react";
import Sidebar from "../components/SIdebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import MobileSidebar from "../components/SIdebar/MobileSidebar";
import { FaRegMoon } from "react-icons/fa";
import { LuSunMedium } from "react-icons/lu";
import logo from "../assets/react.svg";
import { TbLogout2 } from "react-icons/tb";
import { toast } from "react-toastify";
import axios from "axios";
import MemberSidebar from "../components/MemberSidebar/MemberSidebar";

const MainLayout = ({ toggleTheme, darkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const navigate = useNavigate();
  const logout = async () => {
    try {
      // Make API request with axios
      const response = await axios.get("http://127.0.0.1:8000/api/logout", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the Bearer token
        },
      });
      toast.success("Logged-out successfully");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        toast.error("logout failed: " + error.response.data); // Customize error message
      } else if (error.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error("An error occurred while logout.");
      }
    }
  };

  return (
    <>
      <MemberSidebar />
      <MobileSidebar
        logout={logout}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />
      <div className=" bg-gray-50 min-h-screen dark:bg-gray-900 flex md:flex-row flex-col ">
        <Sidebar />
        <div className="p-7  flex-1 h-screen text-2xl font-semibold">
          <div className=" flex justify-end">
            <button
              className="text-dark-purple hidden md:block mb-5 px-5 py-2 rounded dark:text-white"
              onClick={() => toggleTheme()}
            >
              {darkMode ? <LuSunMedium /> : <FaRegMoon />}
            </button>
            <button
              className=" hidden md:block mb-5 rounded-full"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              <img src={logo} alt="logo" />
            </button>
          </div>
          {isModalOpen && (
            <div className="md:block hidden">
              <div className="border text-dark-purple dark:text-white dark:text-white border rounded bg-slate-50 dark:bg-gray-900 w-48 h-16 absolute top-20 right-10 z-50">
                <button
                  onClick={() => {
                    logout();
                  }}
                  className="m-4 text-sm flex gap-4 items-center"
                >
                  <TbLogout2 />
                  Logout
                </button>
              </div>
            </div>
          )}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
