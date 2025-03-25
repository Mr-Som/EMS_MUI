import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
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
  Menu,
  MenuItem,
  Switch,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// Icons
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  DriveFileRenameOutline as EditIcon,
} from "@mui/icons-material";

export default function MeterManagement() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [selected, setSelected] = useState([]);
  const [meters, setMeters] = useState([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMeters();
  }, []);

  const fetchMeters = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API_URL}/api/meters`,
        { withCredentials: true }
      );
      if (response.data.success) {
        const mappedMeters = response.data.data.map((meter) => ({
          meterId: `M${meter.uid}`,
          meterUuid: meter.meter_id,
          nickName: meter.nick_name,
          projectName: meter.project_name || "N/A",
          installLocation: meter.location,
          connectedGatewayId: `GW${meter.gateway_uid || meter.gateway_id}`,
          modelName: meter.model_name,
          serialNumber: meter.serial_number,
          modbusId: meter.md_id,
          createTime: new Date(meter.created_at).toLocaleDateString(),
          status: meter.online ? "Online" : "Offline",
          enabled: true,
        }));
        setMeters(mappedMeters);
      } else {
        console.error("Failed to fetch meters:", response.data.error);
      }
    } catch (error) {
      console.error(
        "Error fetching meters:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = meters.map((meter) => meter.meterUuid);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (meterUuid) => {
    const selectedIndex = selected.indexOf(meterUuid);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, meterUuid];
    } else {
      newSelected = selected.filter((id) => id !== meterUuid);
    }

    setSelected(newSelected);
  };

  const handleMenuClick = (event, meterUuid) => {
    setMenuAnchorEl({ ...menuAnchorEl, [meterUuid]: event.currentTarget });
  };

  const handleMenuClose = (meterUuid) => {
    setMenuAnchorEl({ ...menuAnchorEl, [meterUuid]: null });
  };

  const handleDeleteSelected = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_API_URL}/api/meters`,
        {
          data: { meter_ids: selected },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setMeters(
          meters.filter((meter) => !selected.includes(meter.meterUuid))
        );
        setSelected([]);
      } else {
        console.error("Failed to delete meters:", response.data.error);
      }
    } catch (error) {
      console.error(
        "Error deleting meters:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleDeleteMeter = async (meterUuid) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_API_URL}/api/meters`,
        {
          data: { meter_ids: [meterUuid] },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setMeters(meters.filter((meter) => meter.meterUuid !== meterUuid));
      } else {
        console.error("Failed to delete meter:", response.data.error);
      }
    } catch (error) {
      console.error(
        "Error deleting meter:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleEditMeter = (meterUuid) => {
    navigate(`/meterManagement/Edit/${meterUuid}`);
  };

  const handleToggleEnabled = (meterUuid) => {
    setMeters(
      meters.map((meter) =>
        meter.meterUuid === meterUuid
          ? { ...meter, enabled: !meter.enabled }
          : meter
      )
    );
  };

  const isSelected = (meterUuid) => selected.indexOf(meterUuid) !== -1;

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
                  onClick={() => {
                    if (selected.length === 1) {
                      handleEditMeter(selected[0]);
                    } else {
                      console.log("Bulk edit not implemented");
                    }
                  }}
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
                  <TableCell
                    sx={{ color: "#fafafa", fontWeight: 600 }}
                    align="center"
                  >
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
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={13} align="center">
                      <Typography>Loading...</Typography>
                    </TableCell>
                  </TableRow>
                ) : meters.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={13} align="center">
                      <Typography>No meters found.</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  meters.map((meter) => {
                    const isItemSelected = isSelected(meter.meterUuid);
                    const isMenuOpen = Boolean(menuAnchorEl[meter.meterUuid]);

                    return (
                      <TableRow
                        hover
                        key={meter.meterUuid}
                        selected={isItemSelected}
                        sx={{
                          "&:hover": {
                            backgroundColor: theme.palette.grey[50],
                          },
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onClick={() => handleClick(meter.meterUuid)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {meter.meterId}
                          </Typography>
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
                                meter.status === "Online"
                                  ? theme.palette.success.main
                                  : theme.palette.error.main,
                              fontWeight: 500,
                            }}
                          >
                            {meter.status}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Switch
                            checked={meter.enabled}
                            onChange={() =>
                              handleToggleEnabled(meter.meterUuid)
                            }
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
                              handleMenuClick(event, meter.meterUuid)
                            }
                          >
                            Actions
                          </Button>
                          <Menu
                            anchorEl={menuAnchorEl[meter.meterUuid]}
                            open={isMenuOpen}
                            onClose={() => handleMenuClose(meter.meterUuid)}
                            PaperProps={{
                              elevation: 2,
                              sx: { borderRadius: "8px" },
                            }}
                          >
                            <MenuItem
                              sx={{ color: "text.secondary", pl: 2, pr: 5 }}
                              onClick={() => {
                                handleEditMeter(meter.meterUuid);
                                handleMenuClose(meter.meterUuid);
                              }}
                            >
                              Edit
                            </MenuItem>
                            <MenuItem
                              sx={{ color: "text.secondary", pl: 2, pr: 5 }}
                              onClick={() => {
                                handleDeleteMeter(meter.meterUuid);
                                handleMenuClose(meter.meterUuid);
                              }}
                            >
                              Delete
                            </MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}
