import { useState } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoLogoSlack } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const items = [
    {
      name: "Home",
      path: "/",
      logo: <IoLogoSlack />,
    },
    {
      name: "Projects",
      path: "/projects",
      logo: <IoLogoSlack />,
    },
    {
      name: "Tasks",
      path: "/tasks",
      logo: <IoLogoSlack />,
    },
    {
      name: "Services",
      path: "/services",
      logo: <IoLogoSlack />,
    },
    {
      name: "Contact",
      path: "/contact",
      logo: <IoLogoSlack />,
    },
  ];
  return (
    <>
      <div
        className={` ${
          isSidebarOpen ? "w-72" : "w-20"
        } hidden md:block duration-300 px-4 pt-3.5 relative h-screen bg-dark-purple`}
      >
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <IoIosArrowDropleft
            className={`absolute  bg-white rounded-full cursor-pointer -right-4 top-9 w-9 h-9 border-2 border-dark-purple ${
              !isSidebarOpen && "rotate-180"
            }`}
          />
        </button>
        <div className="flex gap-x-4 items-center">
          <p className="text-4xl p-1  text-sky-400">
            <IoLogoSlack />
          </p>
          <p
            className={`text-3xl duration-300 text-white ${
              !isSidebarOpen && "scale-0"
            }`}
          >
            Designer
          </p>
        </div>
        <ul className="mt-10 text-gray-300">
          {items.map((item, index) => {
            return (
              <NavLink
                className={({ isActive }) =>
                  `flex mb-4 p-2 rounded-md hover:bg-light-white items-center gap-4 ${
                    isActive ? "bg-light-white" : ""
                  }`
                }
                key={index}
                to={item.path}
              >
                {" "}
                <p className="text-2xl">{item.logo}</p>
                <p
                  className={`${
                    !isSidebarOpen && "scale-0"
                  } origin-left duration-300 text-sm`}
                >
                  {item.name}
                </p>
              </NavLink>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
