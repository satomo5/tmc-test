import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import { SIDEBAR_SIZE } from "../../libs/consts";
import { Search } from "@mui/icons-material";
import Iconify from "../atoms/Iconify";
import Dropdown from "../atoms/Dropdown";
import { useAuth } from "../../contexts/Auth";
import { updateStorageData } from "../../libs/storage";

/**
 * Navbar component that displays the application's navigation bar.
 * @param toggleSidebar - Function to toggle the sidebar.
 * @returns JSX.Element - The rendered Navbar component.
 */
export default function Navbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void; // Function to toggle the sidebar.
}): JSX.Element {
  // Get the user's avatar and name from the auth context.
  const { avatar, name } = useAuth();

  /**
   * Function to handle logout.
   * Removes the user data from local storage and redirects to the home page.
   */
  const handleLogout = () => {
    updateStorageData("user", null);
    window.location.href = "/";
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${SIDEBAR_SIZE}px)` }, // Adjust the width based on the sidebar size.
        ml: { md: `${SIDEBAR_SIZE}px` }, // Adjust the margin-left based on the sidebar size.
        backgroundColor: "#fff",
        zIndex: 110,
      }}
    >
      <Box
        display="flex"
        padding="14px 33px"
        justifyContent="space-between"
        gap="32px"
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => toggleSidebar()} // Toggle the sidebar when clicked.
          sx={{ display: { md: "none" } }} // Hide the button on medium and larger screens.
        >
          <Iconify icon="ci:hamburger-md" fontSize={30} color="#000000de" />
        </IconButton>
        <Box
          sx={{
            position: "relative",
            borderRadius: 1,
            bgcolor: "background.paper",
            display: "flex",
            alignItems: "center",
            padding: 0.5,
            flex: 1,
            backgroundColor: "#F1F3F4",
          }}
        >
          <Search sx={{ color: "action.active", marginLeft: 1 }} />
          <InputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            sx={{ ml: 1, flex: 1 }}
          />
        </Box>
        <Box display="flex" alignItems="center" gap="32px">
          <Iconify
            icon="majesticons:calendar-line"
            fontSize={30}
            color="#000000de"
          />
          <Dropdown
            trigger={
              <Box display="flex" gap={2}>
                <Box
                  textAlign="right"
                  sx={{
                    display: { xs: "none", lg: "block" },
                  }}
                >
                  <Typography fontSize="14px">{name}</Typography>
                  <Typography fontSize="12px" color="#828282">
                    Admin
                  </Typography>
                </Box>
                <Box position="relative">
                  <Avatar alt="Profile Picture" src={avatar} />
                  <Box
                    position="absolute"
                    bottom="-2px"
                    right="-2px"
                    width="15px"
                    height="15px"
                    borderRadius={100}
                    bgcolor="#26B941"
                    border="2px solid #fff"
                  />
                </Box>
              </Box>
            }
            options={[{ label: "Logout", onClick: () => handleLogout() }]} // Logout option.
          />
        </Box>
      </Box>
    </AppBar>
  );
}
