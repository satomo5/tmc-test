/** @jsxImportSource @emotion/react */
import {
  Box,
  css,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { SIDEBAR_SIZE } from "../../libs/consts";
import Iconify from "../atoms/Iconify";
import { Link } from "react-router-dom";

const MENU_SIDEBAR = [
  {
    menu: "Dashboard",
    icon: <Iconify icon="fluent:home-24-regular" fontSize={20} />,
    path: "/dashboard",
  },
  {
    menu: "Todo",
    icon: (
      <Iconify icon="fluent:clipboard-task-list-rtl-20-regular" fontSize={20} />
    ),
    path: "/dashboard",
  },
];

const SidebarMenu = (
  <Box>
    <Toolbar
      css={css`
        margin-bottom: 20px;
        padding: 20px;
      `}
    >
      <img
        src="/images/logo-todo.png"
        alt="logo"
        css={css`
          width: 122px;
        `}
      />
    </Toolbar>
    <List>
      {MENU_SIDEBAR.map((item, index) => (
        <Link key={`sidebar-menu-${index}`} to={item.path}>
          <ListItem button key={`sidebar-menu-${index}`}>
            <ListItemIcon
              css={css`
                min-width: 30px;
              `}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.menu} />
          </ListItem>
        </Link>
      ))}
    </List>
  </Box>
);

/**
 * Sidebar component that includes a mobile and permanent sidebar.
 * Toggles the mobile sidebar's open state when the toggleSidebar function is called.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} props.mobileOpen - Whether the mobile sidebar is open or not.
 * @param {Function} props.toggleSidebar - The function to call when the mobile sidebar should be toggled.
 * @return {JSX.Element} The Sidebar component.
 */
export default function Sidebar({
  mobileOpen,
  toggleSidebar,
}: {
  mobileOpen: boolean;
  toggleSidebar: () => void;
}) {
  return (
    // Box component that wraps the drawer components
    <Box
      component="nav"
      sx={{ width: { md: SIDEBAR_SIZE }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      {/* Temporary sidebar for mobile screens */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => toggleSidebar()} // Call toggleSidebar function when the sidebar is closed
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: "block", md: "none" }, // Display sidebar on mobile screens, hide on larger screens
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: SIDEBAR_SIZE, // Set the width of the sidebar
          },
        }}
      >
        {SidebarMenu}
      </Drawer>
      {/* Permanent sidebar for larger screens */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" }, // Hide sidebar on mobile screens, display on larger screens
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: SIDEBAR_SIZE, // Set the width of the sidebar
          },
        }}
        open
      >
        {SidebarMenu}
      </Drawer>
    </Box>
  );
}
