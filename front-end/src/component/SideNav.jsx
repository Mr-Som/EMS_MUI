import * as React from "react";
import { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Box,
  Stack,
  Collapse,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

// ICON
import {
  MenuOpen as MenuOpenIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  ElectricMeter as ElectricMeterIcon,
  SsidChart as SsidChartIcon,
  Person as PersonIcon,
  Analytics as AnalyticsIcon,
  Summarize as SummarizeIcon,
  ReceiptLong as ReceiptLongIcon,
  Factory as FactoryIcon,
  NotificationsActive as NotificationActiveIcon,
  Engineering as EngineeringIcon,
  EvStation as EvStationIcon,
  SolarPower as SolarPowerIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  DeveloperMode as DeveloperModeIcon,
} from "@mui/icons-material";

//
import logo from "../assets/logo.png";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const NavigationList1 = [
  { segment: "Dashboard", title: "Dashboard", icon: <DashboardIcon /> },
  {
    segment: "RealTimeMonitoring",
    title: "Real-Time Monitoring",
    icon: <ElectricMeterIcon />,
  },
  {
    segment: "graphicalView",
    title: "Graphical View",
    icon: <SsidChartIcon />,
  },
  {
    segment: "energyAnalysis",
    title: "Energy Analysis",
    icon: <AnalyticsIcon />,
  },
  { segment: "battery", title: "Battery Management", icon: <EvStationIcon /> },
  { segment: "solarSystem", title: "Solar System", icon: <SolarPowerIcon /> },
  {
    segment: "reports",
    title: "Reports",
    icon: <SummarizeIcon />,
    children: [
      { segment: "sales", title: "Sales" },
      { segment: "traffic", title: "Traffic" },
    ],
  },
  {
    segment: "perpaidManagement",
    title: "Perpaid Management",
    icon: <ReceiptLongIcon />,
  },
  {
    segment: "carbonAnalysis",
    title: "Carbon Analysis",
    icon: <FactoryIcon />,
  },
];

const NavigationList2 = [
  { segment: "alarm", title: "Alarms", icon: <NotificationActiveIcon /> },
  {
    segment: "config",
    title: "Configurations",
    icon: <EngineeringIcon />,
    children: [
      { segment: "userManagement", title: "User Management" },
      { segment: "gatewayManagement", title: "Gateway Management" },
      { segment: "meterManagement", title: "Meter Management" },
    ],
  },
  {
    segment: "DeveloperMode",
    title: "Developers Only",
    icon: <DeveloperModeIcon />,
  },
];

const NavigationList3 = [
  {
    segment: "account",
    title: "Account",
    icon: <PersonIcon />,
    children: [
      { segment: "profile", title: "Profile" },
      { segment: "logout", title: "Log Out" },
    ],
  },
  {
    segment: "settings",
    title: "Settings",
    icon: <SettingsIcon />,
    children: [
      { segment: "general", title: "General" },
      { segment: "configure", title: "Configure" },
      { segment: "security", title: "Security" },
    ],
  },
  { segment: "signin", title: "Log Out", icon: <LogoutIcon /> },
];

// Drawer Component
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  alignItems: "center",
  padding: theme.spacing(0, 1),
  zIndex: 1,
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function SideNav({ open, handleDrawerToggle }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(null);

  // Close child items when drawer is minimized
  useEffect(() => {
    if (!open) {
      setExpanded(null);
    }
  }, [open]);

  const isActive = (segment) => {
    return location.pathname.startsWith(`/${segment}`);
  };

  const hasActiveChild = (children) => {
    return children?.some((child) => isActive(child.segment));
  };

  const handleClick = (segment, children) => {
    if (children) {
      setExpanded(expanded === segment ? null : segment);
    } else {
      navigate(`/${segment}`);
      setExpanded(null);
    }
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        "& .MuiDrawer-paper": {
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE and Edge
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari, and Opera
          },
        },
      }}
    >
      <DrawerHeader
        sx={{
          display: "flex",
          justifyContent: "space-between",
          position: "fixed",
          width: 240,
          overflow: "hidden",
          backgroundColor: "#fff",
          zIndex: 1,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ ...(!open && { display: "none" }) }}
        >
          <img src={logo} alt="" style={{ width: 100, height: 50 }} />
        </Stack>
        <IconButton onClick={handleDrawerToggle}>
          {theme.direction === "rtl" ? <MenuOpenIcon /> : <MenuOpenIcon />}
        </IconButton>
      </DrawerHeader>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "58px",
          height: "calc(100vh - 58px)",
          backgroundColor: theme.palette.background.default,
          overflowY: "auto",
          scrollbarWidth: 0,
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Divider />
        <List>
          {NavigationList1.map(({ segment, title, icon, children }) => (
            <React.Fragment key={segment}>
              <ListItem
                button
                onClick={() => handleClick(segment, children)}
                sx={{
                  backgroundColor:
                    isActive(segment) ||
                    hasActiveChild(children) ||
                    expanded === segment
                      ? theme.palette.primary.light
                      : "inherit",
                  color:
                    isActive(segment) ||
                    hasActiveChild(children) ||
                    expanded === segment
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.primary,
                  "&:hover": {
                    backgroundColor:
                      isActive(segment) ||
                      hasActiveChild(children) ||
                      expanded === segment
                        ? theme.palette.primary.light
                        : theme.palette.action.hover,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      isActive(segment) ||
                      hasActiveChild(children) ||
                      expanded === segment
                        ? theme.palette.primary.contrastText
                        : theme.palette.primary.main,
                    minWidth: "40px",
                  }}
                >
                  {React.cloneElement(icon, {
                    sx: { fontSize: "1.25rem" },
                  })}
                </ListItemIcon>
                <ListItemText primary={title} />
                {children &&
                  (expanded === segment ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  ))}
              </ListItem>
              {children && (
                <Collapse
                  in={expanded === segment && open} // Only show if drawer is open
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {children.map((child) => (
                      <ListItem
                        button
                        key={child.segment}
                        onClick={() => navigate(`/${child.segment}`)}
                        sx={{
                          pl: 4,
                          backgroundColor: isActive(child.segment)
                            ? theme.palette.primary.dark // Change to dark when active
                            : expanded === segment
                              ? theme.palette.primary.light // Keep light when parent expanded
                              : "inherit",
                          color:
                            isActive(child.segment) || expanded === segment
                              ? theme.palette.primary.contrastText
                              : theme.palette.text.primary,
                          "&:hover": {
                            backgroundColor:
                              isActive(child.segment) || expanded === segment
                                ? theme.palette.primary.dark
                                : theme.palette.action.hover,
                          },
                        }}
                      >
                        <ListItemText primary={child.title} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
        <Divider />
        <List>
          {NavigationList2.map(({ segment, title, icon, children }) => (
            <React.Fragment key={segment}>
              <ListItem
                button
                onClick={() => handleClick(segment, children)}
                sx={{
                  backgroundColor:
                    isActive(segment) ||
                    hasActiveChild(children) ||
                    expanded === segment
                      ? theme.palette.primary.light
                      : "inherit",
                  color:
                    isActive(segment) ||
                    hasActiveChild(children) ||
                    expanded === segment
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.primary,
                  "&:hover": {
                    backgroundColor:
                      isActive(segment) ||
                      hasActiveChild(children) ||
                      expanded === segment
                        ? theme.palette.primary.light
                        : theme.palette.action.hover,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      isActive(segment) ||
                      hasActiveChild(children) ||
                      expanded === segment
                        ? theme.palette.primary.contrastText
                        : theme.palette.primary.main,
                    minWidth: "40px",
                  }}
                >
                  {React.cloneElement(icon, {
                    sx: { fontSize: "1.25rem" },
                  })}
                </ListItemIcon>
                <ListItemText primary={title} />
                {children &&
                  (expanded === segment ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  ))}
              </ListItem>
              {children && (
                <Collapse
                  in={expanded === segment && open} // Only show if drawer is open
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {children.map((child) => (
                      <ListItem
                        button
                        key={child.segment}
                        onClick={() => navigate(`/${child.segment}`)}
                        sx={{
                          pl: 4,
                          backgroundColor: isActive(child.segment)
                            ? theme.palette.primary.dark // Change to dark when active
                            : expanded === segment
                              ? theme.palette.primary.light // Keep light when parent expanded
                              : "inherit",
                          color:
                            isActive(child.segment) || expanded === segment
                              ? theme.palette.primary.contrastText
                              : theme.palette.text.primary,
                          "&:hover": {
                            backgroundColor:
                              isActive(child.segment) || expanded === segment
                                ? theme.palette.primary.dark
                                : theme.palette.action.hover,
                          },
                        }}
                      >
                        <ListItemText primary={child.title} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <List>
          {NavigationList3.map(({ segment, title, icon, children }) => (
            <React.Fragment key={segment}>
              <ListItem
                button
                onClick={() => handleClick(segment, children)}
                sx={{
                  backgroundColor:
                    isActive(segment) ||
                    hasActiveChild(children) ||
                    expanded === segment
                      ? theme.palette.primary.light
                      : "inherit",
                  color:
                    isActive(segment) ||
                    hasActiveChild(children) ||
                    expanded === segment
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.primary,
                  "&:hover": {
                    backgroundColor:
                      isActive(segment) ||
                      hasActiveChild(children) ||
                      expanded === segment
                        ? theme.palette.primary.light
                        : theme.palette.action.hover,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      isActive(segment) ||
                      hasActiveChild(children) ||
                      expanded === segment
                        ? theme.palette.primary.contrastText
                        : theme.palette.primary.main,
                    minWidth: "40px",
                  }}
                >
                  {React.cloneElement(icon, {
                    sx: { fontSize: "1.25rem" },
                  })}
                </ListItemIcon>
                <ListItemText primary={title} />
                {children &&
                  (expanded === segment ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  ))}
              </ListItem>
              {children && (
                <Collapse
                  in={expanded === segment && open} // Only show if drawer is open
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {children.map((child) => (
                      <ListItem
                        button
                        key={child.segment}
                        onClick={() => navigate(`/${child.segment}`)}
                        sx={{
                          pl: 4,
                          backgroundColor: isActive(child.segment)
                            ? theme.palette.primary.dark // Change to dark when active
                            : expanded === segment
                              ? theme.palette.primary.light // Keep light when parent expanded
                              : "inherit",
                          color:
                            isActive(child.segment) || expanded === segment
                              ? theme.palette.primary.contrastText
                              : theme.palette.text.primary,
                          "&:hover": {
                            backgroundColor:
                              isActive(child.segment) || expanded === segment
                                ? theme.palette.primary.dark
                                : theme.palette.action.hover,
                          },
                        }}
                      >
                        <ListItemText primary={child.title} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default SideNav;
