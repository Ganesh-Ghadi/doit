import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Homepage from './pages/HomePage/Homepage';
import Projects from './pages/Projects/Projects';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Error from './components/Error/Error';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setDarkMode(storedTheme === 'dark');
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? 'light' : 'dark';
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          errorElement={<Error />}
          path="/"
          element={<MainLayout toggleTheme={toggleTheme} darkMode={darkMode} />}
        >
          <Route index element={<Homepage />} />
          <Route path="/projects" element={<Projects />} />
        </Route>
        <Route errorElement={<Error />} path="/login" element={<Login />} />
        <Route
          errorElement={<Error />}
          path="/register"
          element={<Register />}
        />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
