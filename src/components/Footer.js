import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#282c34",
        color: "white",
        textAlign: "center",
        padding: "10px 0",
        position: "fixed",
        bottom: "0",
        width: "100%",
      }}
    >
      <p>&copy; {new Date().getFullYear()} React Sample Project. All rights reserved By Shyam.</p>
    </footer>
  );
};

export default Footer;
