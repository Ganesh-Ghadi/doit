import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Homepage from "./pages/HomePage/Homepage";
import Projects from "./pages/Projects/Projects";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Error from "./components/Error/Error";
import CreateProject from "./pages/Projects/CreateProject";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import GuestRoute from "./components/GuestRoute/GuestRoute";
import EditProject from "./pages/Projects/EditProject";
import Tasks from "./pages/Tasks/Tasks";
import CreateTask from "./pages/Tasks/CreateTask";
import EditTask from "./pages/Tasks/EditTask";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setDarkMode(storedTheme === "dark");
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          errorElement={<Error />}
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout toggleTheme={toggleTheme} darkMode={darkMode} />
            </ProtectedRoute>
          }
        >
          <Route index element={<Homepage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/add" element={<CreateProject />} />
          <Route path="/projects/:id/edit" element={<EditProject />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/add" element={<CreateTask />} />
          <Route path="/tasks/:id/edit" element={<EditTask />} />
        </Route>
        <Route
          errorElement={<Error />}
          path="/login"
          element={
            <GuestRoute>
              {" "}
              <Login />
            </GuestRoute>
          }
        />
        <Route
          errorElement={<Error />}
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
      </>
    )
  );

  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
