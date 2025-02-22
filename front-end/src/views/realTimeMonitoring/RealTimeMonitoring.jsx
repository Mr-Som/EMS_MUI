import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Paper,
  Box,
  Typography,
  Button,
  IconButton,
  Badge,
  Stack,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import EnhancedTable from "./TableView";
// Material UI Icons
import {
  FilterAltOutlined as FilterAltOutlinedIcon,
  FilterAltOff as FilterAltOffIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
} from "@mui/icons-material";

function RealTimeMonitoring() {
  const theme = useTheme();
  const [group, setGroup] = React.useState("");

  const handleChange = (event) => {
    setGroup(event.target.value);
  };

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
        <Grid item size={12}>
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
                    backgroundColor: theme.palette.danger.light,
                    "&:hover": {
                      backgroundColor: theme.palette.danger.main,
                    },
                  }}
                >
                  Error
                </Button>
              </Badge>
            </Stack>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ minWidth: 200, marginRight: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="group-select-label">Group By</InputLabel>
                <Select
                  labelId="group-select-label"
                  id="group-select"
                  value={group}
                  label="Group By"
                  onChange={handleChange}
                >
                  <MenuItem value={"Project"}>Project</MenuItem>
                  <MenuItem value={"Location"}>Location</MenuItem>
                  <MenuItem value={"Meter Type"}>Meter Type</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                size="small"
                startIcon={<ViewListIcon />}
              >
                Table View
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<ViewModuleIcon />}
              >
                Box View
              </Button>
              <IconButton size="small" aria-label="filter" color="primary">
                <FilterAltOffIcon />
              </IconButton>
            </Stack>
          </Paper>
        </Grid>

        {/* Content Section */}
        <Grid item size={12}>
          <Paper elevation={0} sx={{ p: 0 }}>
            <EnhancedTable />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RealTimeMonitoring;
