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

export default function GatewayManagement() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [selected, setSelected] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentGateway, setCurrentGateway] = useState(null);
  const [gateways, setGateways] = useState([
    {
      gatewayId: "GW001",
      nickName: "Gateway 1",
      projectName: "Project A",
      location: "Location A",
      macAddress: "00:1A:2B:3C:4D:5E",
      connectedDevices: 1,
      createTime: "2025-03-05",
      status: "Online",
      enabled: true,
    },
    {
      gatewayId: "GW002",
      nickName: "Gateway 2",
      projectName: "Project B",
      location: "Location B",
      macAddress: "00:1A:2B:3C:4D:5F",
      connectedDevices: 1,
      createTime: "2025-03-04",
      status: "Offline",
      enabled: false,
    },
  ]);

  const [menuAnchorEl, setMenuAnchorEl] = useState({});

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
              Manage and Configutre gateways
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
                {gateways.map((gateway) => {
                  const isItemSelected = isSelected(gateway.gatewayId);
                  const isMenuOpen = Boolean(menuAnchorEl[gateway.gatewayId]);

                  return (
                    <TableRow
                      hover
                      key={gateway.gatewayId}
                      selected={isItemSelected}
                      sx={{
                        "&:hover": { backgroundColor: theme.palette.grey[50] },
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
                                : gateway.status === "Offline"
                                  ? theme.palette.error.main
                                  : gateway.status === "Enabled"
                                    ? theme.palette.info.main
                                    : theme.palette.warning.main,
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
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}

// Dummy handleDeleteGateway function to satisfy the reference
const handleDeleteGateway = (gatewayId) => {
  console.log(`Delete gateway: ${gatewayId}`);
};
