import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside
      style={{
        width: "250px",
        backgroundColor: "#282c34",
        color: "white",
        height: "100vh",
        position: "fixed",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2>Sidebar</h2>
      <nav>
        <ul style={{ listStyleType: "none", padding: "0" }}>
          <li style={{ marginBottom: "15px" }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Home
            </Link>
          </li>
          <li style={{ marginBottom: "15px" }}>
            <Link to="/calculator" style={{ color: "white", textDecoration: "none" }}>
              Calculator
            </Link>
          </li>
          <li style={{ marginBottom: "15px" }}>
            <Link to="/student" style={{ color: "white", textDecoration: "none" }}>
              Student
            </Link>

          </li>
          <li style={{ marginBottom: "15px" }}>
            <Link to="/employee" style={{ color: "white", textDecoration: "none" }}>
              Employee
            </Link>
          </li>
          <li style={{ marginBottom: "15px" }}>
            <Link to="/vechile" style={{ color: "white", textDecoration: "none" }}>
              Vechile
            </Link>
          
          </li>
          <li style={{ marginBottom: "15px" }}>
            <Link to="/library" style={{ color: "white", textDecoration: "none" }}>
              LibraryManagement
            </Link>
          
          </li>
          <li style={{ marginBottom: "15px" }}>
            <Link to="/Hotel" style={{ color: "white", textDecoration: "none" }}>
              HotelManagement
            </Link>
            </li>
            <li style={{ marginBottom: "15px" }}>
            <Link to="/Hotel" style={{ color: "white", textDecoration: "none" }}>
              MobileShopManagement
            </Link>
            </li>
            <li style={{ marginBottom: "15px" }}>
            <Link to="/Railwayticket" style={{ color: "white", textDecoration: "none" }}>
              RailwayTicketManagement
            </Link>
            </li>

            <li style={{ marginBottom: "15px" }}>
            <Link to="/Railwayticket" style={{ color: "white", textDecoration: "none" }}>
              
            </Link>
            </li>

            <li style={{ marginBottom: "15px" }}>
            <Link to="/HouseForm" style={{ color: "white", textDecoration: "none" }}>
              HouseForm
            </Link>
            </li>
            <li style={{ marginBottom: "15px" }}>
            <Link to="/Bookform" style={{ color: "white", textDecoration: "none" }}>
              BookForm
            </Link>
            </li>

            <li style={{ marginBottom: "15px" }}>
            <Link to="/BagInventory" style={{ color: "white", textDecoration: "none" }}>
              BagInventory
            </Link>
            </li>


            <li style={{ marginBottom: "15px" }}>
            <Link to="/ShopManagement" style={{ color: "white", textDecoration: "none" }}>
            ShopManagement
            </Link>
            </li>


          <li style={{ marginBottom: "15px" }}>
            <Link to="/about" style={{ color: "white", textDecoration: "none" }}>
              About
            </Link>
            </li>
          <li style={{ marginBottom: "15px" }}>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
