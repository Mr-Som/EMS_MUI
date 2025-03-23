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

export default function GatewayManagement() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [selected, setSelected] = useState([]);
  const [gateways, setGateways] = useState([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState({});
  const [loading, setLoading] = useState(true); // Added loading state

  // Fetch gateways on component mount
  useEffect(() => {
    fetchGateways();
  }, []);

  const fetchGateways = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API_URL}/api/gateways`,
        { withCredentials: true }
      );
      if (response.data.success) {
        const mappedGateways = response.data.data.map((gateway) => ({
          gatewayId: gateway.gateway_id,
          nickName: gateway.nick_name,
          projectName: gateway.project_name,
          location: gateway.location,
          macAddress: gateway.mac_address,
          connectedDevices: gateway.meter_count || 0,
          createTime: new Date(gateway.created_at).toLocaleDateString(),
          status: gateway.online ? "Online" : "Offline",
          enabled: true,
        }));
        setGateways(mappedGateways);
      } else {
        console.error("Failed to fetch gateways:", response.data.error);
      }
    } catch (error) {
      console.error(
        "Error fetching gateways:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = gateways.map((gateway) => gateway.gatewayId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (gatewayId) => {
    const selectedIndex = selected.indexOf(gatewayId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, gatewayId];
    } else {
      newSelected = selected.filter((id) => id !== gatewayId);
    }

    setSelected(newSelected);
  };

  const handleMenuClick = (event, gatewayId) => {
    setMenuAnchorEl({ ...menuAnchorEl, [gatewayId]: event.currentTarget });
  };

  const handleMenuClose = (gatewayId) => {
    setMenuAnchorEl({ ...menuAnchorEl, [gatewayId]: null });
  };

  const handleDeleteSelected = () => {
    setGateways(
      gateways.filter((gateway) => !selected.includes(gateway.gatewayId))
    );
    setSelected([]);
  };

  const handleToggleEnabled = (gatewayId) => {
    setGateways(
      gateways.map((gateway) =>
        gateway.gatewayId === gatewayId
          ? { ...gateway, enabled: !gateway.enabled }
          : gateway
      )
    );
  };

  const isSelected = (gatewayId) => selected.indexOf(gatewayId) !== -1;

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
              Gateway Management
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              Manage and Configure gateways
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
                  color="error"
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
                onClick={() => navigate(`/gatewayManagement/Add`)}
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
            <Table aria-labelledby="tableGateway">
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
                        selected.length > 0 && selected.length < gateways.length
                      }
                      checked={
                        gateways.length > 0 &&
                        selected.length === gateways.length
                      }
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "#fafafa", fontWeight: 600 }}>
                    Gateway ID
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
                    Location
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fafafa", fontWeight: 600 }}
                    align="center"
                  >
                    MAC Address
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fafafa", fontWeight: 600 }}
                    align="center"
                  >
                    Connected Devices
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
                    <TableCell colSpan={11} align="center">
                      <Typography>Loading...</Typography>
                    </TableCell>
                  </TableRow>
                ) : gateways.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} align="center">
                      <Typography>No gateway found.</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  gateways.map((gateway) => {
                    const isItemSelected = isSelected(gateway.gatewayId);
                    const isMenuOpen = Boolean(menuAnchorEl[gateway.gatewayId]);

                    return (
                      <TableRow
                        hover
                        key={gateway.gatewayId}
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
                            onClick={() => handleClick(gateway.gatewayId)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {gateway.gatewayId}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">
                            {gateway.nickName}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">
                            {gateway.projectName}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">
                            {gateway.location}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">
                            {gateway.macAddress}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">
                            {gateway.connectedDevices}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">
                            {gateway.createTime}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                gateway.status === "Online"
                                  ? theme.palette.success.main
                                  : theme.palette.error.main,
                              fontWeight: 500,
                            }}
                          >
                            {gateway.status}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Switch
                            checked={gateway.enabled}
                            onChange={() =>
                              handleToggleEnabled(gateway.gatewayId)
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
                              handleMenuClick(event, gateway.gatewayId)
                            }
                          >
                            Actions
                          </Button>
                          <Menu
                            anchorEl={menuAnchorEl[gateway.gatewayId]}
                            open={isMenuOpen}
                            onClose={() => handleMenuClose(gateway.gatewayId)}
                            PaperProps={{
                              elevation: 2,
                              sx: { borderRadius: "8px" },
                            }}
                          >
                            <MenuItem
                              sx={{ color: "text.secondary", pl: 2, pr: 5 }}
                              onClick={() => {
                                handleMenuClose(gateway.gatewayId);
                              }}
                            >
                              Edit
                            </MenuItem>
                            <MenuItem
                              sx={{ color: "text.secondary", pl: 2, pr: 5 }}
                              onClick={() => {
                                handleDeleteGateway(gateway.gatewayId);
                                handleMenuClose(gateway.gatewayId);
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

// Dummy handleDeleteGateway function
const handleDeleteGateway = (gatewayId) => {
  console.log(`Delete gateway: ${gatewayId}`);
};
