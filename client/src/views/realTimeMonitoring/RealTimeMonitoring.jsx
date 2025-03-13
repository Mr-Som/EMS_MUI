import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Popover,
  Paper,
  Box,
  FormControlLabel,
  Typography,
  Button,
  IconButton,
  Badge,
  Stack,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

// Custom Components
import EnhancedTable from "./TableView";
import GridView from "./GridView";
// Material UI Icons
import {
  FilterList as FilterListIcon,
  FilterListOff as FilterListOffIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  ViewColumn as ViewColumnIcon,
  CalendarViewDay as CalendarViewDayIcon,
} from "@mui/icons-material";

function RealTimeMonitoring() {
  const theme = useTheme();
  const [view, setView] = React.useState("table"); // Default to table view
  const [anchorEl, setAnchorEl] = useState(null);
  const [columns, setColumns] = useState({
    "Voltage (V1)": true,
    "Voltage (V2)": true,
    "Voltage (V3)": true,
    "Voltage (RY)": false,
    "Voltage (YB)": false,
    "Voltage (BR)": false,
    "Current (L1)": true,
    "Current (L2)": true,
    "Current (L3)": true,
    "Current (LN)": false,
    "Power Factor (Q1)": false,
    "Power Factor (Q2)": false,
    "Power Factor (Q3)": false,
    "Power Factor Avg.": true,
    Frequency: true,
    "Active Power": true,
    "Reactive Power": false,
  });

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColumnChange = (column) => {
    setColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  const open = Boolean(anchorEl);
  const id = open ? "column-popper" : undefined;

  return (
    <Box
      sx={{
        width: "100%",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 1,
      }}
    >
      <Grid container spacing={2} sx={{ width: "100%" }}>
        {/* Filter Section */}
        <Grid size={12}>
          <Paper
            elevation={0}
            sx={{
              p: 0,
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              backgroundColor: "inherit",
            }}
          >
            <Stack spacing={3} direction="row">
              <Badge badgeContent={30} color="primary">
                <Button
                  href="#"
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: theme.palette.primary.light,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                >
                  Online
                </Button>
              </Badge>
              <Badge badgeContent={10} color="warning">
                <Button
                  href="#"
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: theme.palette.warning.main,
                    "&:hover": {
                      backgroundColor: theme.palette.warning.dark,
                    },
                  }}
                >
                  Offline
                </Button>
              </Badge>
              <Badge badgeContent={20} color="danger">
                <Button
                  href="#"
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor:
                      theme.palette.danger?.light || theme.palette.error.light,
                    "&:hover": {
                      backgroundColor:
                        theme.palette.danger?.main || theme.palette.error.main,
                    },
                  }}
                >
                  Error
                </Button>
              </Badge>
            </Stack>
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction="row" spacing={2}>
              <Button
                variant={view === "table" ? "contained" : "outlined"}
                size="small"
                startIcon={<ViewListIcon />}
                onClick={() => handleViewChange("table")}
              >
                Table View
              </Button>
              <Button
                variant={view === "grid" ? "contained" : "outlined"}
                size="small"
                startIcon={<ViewModuleIcon />}
                onClick={() => handleViewChange("grid")}
              >
                Grid View
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<CalendarViewDayIcon />}
              >
                Group By
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<FilterListOffIcon />}
              >
                Filter
              </Button>
              <>
                <Button
                  sx={{ display: view === "table" ? "inline-flex" : "none" }}
                  variant="outlined"
                  size="small"
                  startIcon={<ViewColumnIcon />}
                  onClick={handleClick}
                  aria-describedby={id}
                >
                  Columns
                </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  sx={{ zIndex: 1300 }}
                >
                  <Paper
                    elevation={8}
                    sx={{
                      p: 2,
                      maxHeight: 400,
                      overflowY: "auto",
                      width: "auto",
                    }}
                  >
                    <Box>
                      {Object.entries(columns).map(([column, checked]) => (
                        <FormControlLabel
                          key={column}
                          control={
                            <Checkbox
                              checked={checked}
                              onChange={() => handleColumnChange(column)}
                              name={column}
                            />
                          }
                          label={column}
                          sx={{ display: "block" }}
                        />
                      ))}
                    </Box>
                  </Paper>
                </Popover>
              </>
            </Stack>
          </Paper>
        </Grid>

        {/* Content Section */}
        <Grid size={12}>
          <Paper elevation={0} sx={{ p: 0, backgroundColor: "inherit" }}>
            {view === "table" ? <EnhancedTable /> : <GridView />}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RealTimeMonitoring;
