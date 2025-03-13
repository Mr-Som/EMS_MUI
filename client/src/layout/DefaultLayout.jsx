import * as React from "react";
import { styled } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";

//
import AppContent from "../component/AppContent.jsx";
import SideNav from "../component/SideNav.jsx";
import NavBar from "../component/NavBar.jsx";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function DefaultLayout() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#fafbff" }}>
      <CssBaseline />
      <NavBar open={open} handleDrawerToggle={handleDrawerToggle} />
      <SideNav open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{ flexGrow: 1, pt: 1, pb: 0, px: 1, minHeight: "100vh" }}
      >
        <DrawerHeader />
        <AppContent />
      </Box>
    </Box>
  );
}
