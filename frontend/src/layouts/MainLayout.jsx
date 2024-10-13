import React from 'react';
import Sidebar from '../components/SIdebar/Sidebar';
import { Outlet } from 'react-router-dom';
import MobileSidebar from '../components/SIdebar/MobileSidebar';
import { FaRegMoon } from 'react-icons/fa';
import { LuSunMedium } from 'react-icons/lu';

const MainLayout = ({ toggleTheme, darkMode }) => {
  return (
    <>
      <MobileSidebar darkMode={darkMode} toggleTheme={toggleTheme} />
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
          </div>

          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
