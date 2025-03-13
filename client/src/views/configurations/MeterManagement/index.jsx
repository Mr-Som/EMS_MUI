import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Avatar,
  Menu,
  MenuItem,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";

// Icons
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  DriveFileRenameOutline as EditIcon,
} from "@mui/icons-material";

export default function MeterManagement() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentMeter, setCurrentMeter] = useState(null);
  const [meters, setMeters] = useState([
    {
      meterId: "M001",
      nickName: "Meter 1",
      projectName: "Project 1",
      installLocation: "Location A",
      connectedGatewayId: "GW001",
      modelName: "Model X",
      serialNumber: "SN123456",
      modbusId: "MB001",
      createTime: "2025-03-08",
      status: "Active",
      enabled: true,
    },
    {
      meterId: "M002",
      nickName: "Meter 2",
      projectName: "Project 2",
      installLocation: "Location B",
      connectedGatewayId: "GW002",
      modelName: "Model Y",
      serialNumber: "SN654321",
      modbusId: "MB002",
      createTime: "2025-03-07",
      status: "Inactive",
      enabled: false,
    },
  ]);

  const [menuAnchorEl, setMenuAnchorEl] = useState({});

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = meters.map((meter) => meter.meterId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (meterId) => {
    const selectedIndex = selected.indexOf(meterId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, meterId];
    } else {
      newSelected = selected.filter((id) => id !== meterId);
    }

    setSelected(newSelected);
  };

  const handleMenuClick = (event, meterId) => {
    setMenuAnchorEl({ ...menuAnchorEl, [meterId]: event.currentTarget });
  };

  const handleMenuClose = (meterId) => {
    setMenuAnchorEl({ ...menuAnchorEl, [meterId]: null });
  };

  const handleDeleteSelected = () => {
    setMeters(meters.filter((meter) => !selected.includes(meter.meterId)));
    setSelected([]);
  };

  const handleToggleEnabled = (meterId) => {
    setMeters(
      meters.map((meter) =>
        meter.meterId === meterId
          ? { ...meter, enabled: !meter.enabled }
          : meter
      )
    );
  };

  const isSelected = (meterId) => selected.indexOf(meterId) !== -1;

  return (
    <Grid container spacing={1} sx={{ flexGrow: 1, width: "100%", p: 3 }}>
      <Grid size={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Stack direction="column">
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              Meter Management
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              Manage and Configure meters
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            {selected.length > 0 ? (
              <>
                <Typography variant="body2" sx={{ alignSelf: "center" }}>
                  {selected.length} row(s) selected
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                    px: 2,
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="danger"
                  startIcon={<DeleteIcon />}
                  onClick={handleDeleteSelected}
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                    px: 2,
                  }}
                >
                  Delete
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate(`/meterManagement/Add`)}
                sx={{
                  borderRadius: "8px",
                  textTransform: "none",
                  px: 2,
                }}
              >
                Add
              </Button>
            )}
          </Stack>
        </Stack>
      </Grid>

      <Grid size={12}>
        <Paper
          elevation={2}
          sx={{
            width: "100%",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          }}
        >
          <TableContainer>
            <Table aria-labelledby="tableMeter">
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      sx={{
                        color: theme.palette.primary.contrastText,
                        "&.Mui-checked": {
                          color: theme.palette.primary.contrastText,
                        },
                        "&.MuiCheckbox-indeterminate": {
                          color: theme.palette.primary.contrastText,
                        },
                      }}
                      indeterminate={
                        selected.length > 0 && selected.length < meters.length
                      }
                      checked={
                        meters.length > 0 && selected.length === meters.length
                      }
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "#fafafa", fontWeight: 600 }}>
                    Meter ID
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fafafa", fontWeight: 600 }}
                    align="center"
                  >
                    Nickname
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fafafa", fontWeight: 600 }}
                    align="center"
                  >
                    Project Name
                  </TableCell>
                  <TableCell sx={{ color: "#fafafa", fontWeight: 600 }}>
                    Install Location
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fafafa", fontWeight: 600 }}
                    align="center"
                  >
                    Gateway ID
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fafafa", fontWeight: 600 }}
                    align="center"
                  >
                    Model Name
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fafafa", fontWeight: 600 }}
                    align="center"
                  >
                    Serial Number
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fafafa", fontWeight: 600 }}
                    align="center"
                  >
                    Modbus ID
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fafafa", fontWeight: 600 }}
                    align="center"
                  >
                    Create Time
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fafafa", fontWeight: 600 }}
                    align="center"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fafafa", fontWeight: 600 }}
                    align="center"
                  >
                    Enabled
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fafafa", fontWeight: 600 }}
                    align="right"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {meters.map((meter) => {
                  const isItemSelected = isSelected(meter.meterId);
                  const isMenuOpen = Boolean(menuAnchorEl[meter.meterId]);

                  return (
                    <TableRow
                      hover
                      key={meter.meterId}
                      selected={isItemSelected}
                      sx={{
                        "&:hover": { backgroundColor: theme.palette.grey[50] },
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={() => handleClick(meter.meterId)}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{meter.meterId}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">
                          {meter.nickName}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">
                          {meter.projectName}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">
                          {meter.installLocation}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">
                          {meter.connectedGatewayId}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">
                          {meter.modelName}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">
                          {meter.serialNumber}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">
                          {meter.modbusId}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">
                          {meter.createTime}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body2"
                          sx={{
                            color:
                              meter.status === "Active"
                                ? theme.palette.success.main
                                : meter.status === "Inactive"
                                  ? theme.palette.error.main
                                  : theme.palette.warning.main,
                            fontWeight: 500,
                          }}
                        >
                          {meter.status}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Switch
                          checked={meter.enabled}
                          onChange={() => handleToggleEnabled(meter.meterId)}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          endIcon={<KeyboardArrowDownIcon />}
                          aria-label="more"
                          sx={{
                            borderRadius: "8px",
                            textTransform: "none",
                            px: 2,
                            ...(isMenuOpen && {
                              backgroundColor: theme.palette.primary[100],
                              borderColor: theme.palette.primary[100],
                            }),
                          }}
                          onClick={(event) =>
                            handleMenuClick(event, meter.meterId)
                          }
                        >
                          Actions
                        </Button>
                        <Menu
                          anchorEl={menuAnchorEl[meter.meterId]}
                          open={isMenuOpen}
                          onClose={() => handleMenuClose(meter.meterId)}
                          PaperProps={{
                            elevation: 2,
                            sx: { borderRadius: "8px" },
                          }}
                        >
                          <MenuItem
                            sx={{ color: "text.secondary", pl: 2, pr: 5 }}
                            onClick={() => {
                              handleMenuClose(meter.meterId);
                            }}
                          >
                            Edit
                          </MenuItem>
                          <MenuItem
                            sx={{ color: "text.secondary", pl: 2, pr: 5 }}
                            onClick={() => {
                              handleDeleteMeter(meter.meterId);
                              handleMenuClose(meter.meterId);
                            }}
                          >
                            Delete
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}

// Dummy handleDeleteMeter function to satisfy the reference
const handleDeleteMeter = (meterId) => {
  console.log(`Delete meter: ${meterId}`);
};
