import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
// import {
//   Nav,
//   Links,
//   Bars,
//   NavMenu,
//   NavBtn,
//   NavBtnLink,
// } from "./NavbarElements.styled.js";
// import Measured_icon from "../../assets/Measured-Logo-120x120-orange.png";

const TopNav = () => {
  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-secondary p-6">
        <Link
          to="/"
          className="flex items-center flex-shrink-0 text-white mr-6"
        >
          <img
            src="https://www.allarium.com/wp-content/uploads/2021/11/cropped-logo-notext-30x26.png"
            alt="measured logo"
          />
          <span className="font-semibold mx-2 text-xl tracking-tight">
            Allarium
          </span>
        </Link>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link
              className="block mt-4 mx-2 p-3 lg:inline-block lg:mt-0 text-white hover:btn-primary-solid"
              to="/surveys"
            >
              Surveys
            </Link>
            <Link
              className="block mt-4 mx-2 p-3 lg:inline-block lg:mt-0 text-white hover:btn-primary-solid"
              to="/survey"
            >
              Survey
            </Link>
            <Link
              className="block mt-4 mx-2 p-3 lg:inline-block lg:mt-0 text-white hover:btn-primary-solid"
              to="/SurveyCreatorPage"
            >
              Survey Creator
            </Link>
          </div>
          <div>
            <Link
              className="btn-primary-border"
              onClick={() => {
                console.log("logout");
                Cookies.remove("token");
              }}
              to="/login"
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TopNav;
