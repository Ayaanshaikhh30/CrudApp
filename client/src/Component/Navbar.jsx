import React, { useState } from "react";
import { Link } from "react-router-dom";

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "lightskyblue",
    color: "black",
    position:"sticky",
    top: "0",
    left: "0",
    width: "100%",
    height: "60px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: "1000",
  },

  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  navItems: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  homeLink: {
    textDecoration: "none",
    color: "black",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "8px 12px",
    backgroundColor: "white",
    borderRadius: "8px",
    transition: "background 0.3s ease",
  },

  homeLinkHover: {
    backgroundColor: "black",
    color: "white",
  },
};

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={styles.navbar}>
      {/* Logo */}
      <h2
        style={styles.logo}
        onMouseEnter={(e) => (e.target.style.color = "red")}
        onMouseLeave={(e) => (e.target.style.color = "black")}
      >
        CRUD APP
      </h2>

      {/* Home Link */}
      <div style={styles.navItems}>
        <Link
          to="/"
          style={{ ...styles.homeLink, ...(isHovered ? styles.homeLinkHover : {}) }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
