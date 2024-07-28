import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

/**
 * Navigation component that includes a Navbar and Sidebar.
 * Toggles the Sidebar's mobileOpen state when the Navbar's button is clicked.
 */
export default function Navigation() {
  // State to track whether the Sidebar is open on mobile screens
  const [mobileOpen, setMobileOpen] = useState(false);

  /**
   * Toggles the mobileOpen state when the Navbar's button is clicked.
   */
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* Render the Navbar component */}
      <Navbar toggleSidebar={handleDrawerToggle} />
      {/* Render the Sidebar component with mobileOpen state and toggleSidebar function */}
      <Sidebar toggleSidebar={handleDrawerToggle} mobileOpen={mobileOpen} />
    </>
  );
}
