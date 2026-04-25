// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Sidebar from "./components/Sidebar";
// import Home from "./pages/Home";
// import Calculator from "./pages/Calculator";

// const App = () => {
//   return (
//     <Router>
//       <Header />
//       <Sidebar/>
//       <Routes>
//         <Route path="/home" element={<Home />} />
//         <Route path="/calculator" element={<Calculator />} />
//       </Routes>
//       <Footer/>
//     </Router>
//   );
// };

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import StudentForm from "./pages/StudentForm";
import EmployeeForm from "./pages/EmployeeForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import VehicleManagement from "./pages/VehicleManagement";
import LibraryManagement from "./pages/librarymanagement.js";
import HotelManagement from "./pages/Hotelmanagement.js";
import MobileShopManagement from "./pages/Mobileshopmanagement.js";
import RailwayTicketManagement from "./pages/Railwayticketmanagement.js";
import HouseForm from "./pages/HouseForm.js";
import BookForm from "./pages/BookForm.js";
import BagInventory from "./pages/BagInventory.js";
import ShopManagement from "./pages/ShopManagement";
import Vegetable from "./pages/Vegitable.js";


const App = () => {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* Header */}
        <Header />

        <div style={{ display: "flex", flex: "1", overflow: "hidden" }}>
          {/* Sidebar */}
          <Sidebar />
   
          {/* Main Content */}
          <main
            style={{
              flex: "1",
              padding: "20px",
              overflowY: "auto",
              marginLeft: "250px", // Adjust if sidebar width changes
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/student" element={<StudentForm />} />
              <Route path="/employee" element={<EmployeeForm />} />
              <Route path="/vechile" element={<VehicleManagement />} />
              <Route path="/library" element={<LibraryManagement />} />
              <Route path="/Hotel" element={<HotelManagement />} />   
              <Route path="/Mobileshop" element={<MobileShopManagement />} />
              <Route path="/Railwayticket" element={<RailwayTicketManagement />} />
              <Route path="/HouseForm" element={<HouseForm />} />
              <Route path="/Bookform" element={<BookForm />} />
              <Route path="/BagInventory" element={<BagInventory />} />
              <Route path="/ShopManagement" element={<ShopManagement />} />
              <Route path="/ShopManagement" element={<Vegetable/>} />
      
      
            </Routes>
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;

