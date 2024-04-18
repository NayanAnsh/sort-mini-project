import React from "react";
import { Link, Outlet } from "react-router-dom";

const Main = () => {
  return (
    <>
      {/* Header */}
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Sorting Algorithm Visualizer</h1>
        </div>
      </header>

      {/* Navbar */}
      <nav className="bg-gray-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/Visualizer" className="hover:underline">
                Visualizer
              </Link>
            </li>
          </ul>
          {/* Add more links or components here */}
        </div>
      </nav>
      <div id="detail">
        <Outlet />
      </div>
      {/* Footer */}
      <footer className="bg-gray-800 fixed bottom-0 left-0 right-0  text-white py-4">
        <div className="container mx-auto px-4 text-center">
          &copy; 2024 Sorting Algorithm Visualizer
        </div>
      </footer>
    </>
  );
};

export default Main;
