import * as React from "react";
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
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";

// Icons
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  DriveFileRenameOutline as EditIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";

export default function UserManagement() {
  const theme = useTheme();
  const [selected, setSelected] = React.useState([]);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState({}); // Track menu state for each row
  const [openDialog, setOpenDialog] = React.useState(false); // For edit dialog (not implemented fully here)

  // Sample user data
  const users = [
    {
      fullName: "John Doe",
      email: "johndoe@example.com",
      role: "Admin",
      lastLogin: "2025-03-05",
      department: "Engineering",
      phoneNumber: "+1 123-456-7890",
      status: "Active",
    },
    {
      fullName: "Jane Doe",
      email: "janedoe@example.com",
      role: "User",
      lastLogin: "2025-03-04",
      department: "Marketing",
      phoneNumber: "+1 987-654-3210",
      status: "Inactive",
    },
  ];

  // Checkbox handlers
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = users.map((user) => user.email);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (email) => {
    const selectedIndex = selected.indexOf(email);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, email];
    } else {
      newSelected = selected.filter((item) => item !== email);
    }

    setSelected(newSelected);
  };

  // Menu handlers
  const handleMenuClick = (event, email) => {
    setMenuAnchorEl({ ...menuAnchorEl, [email]: event.currentTarget });
  };

  const handleMenuClose = (email) => {
    setMenuAnchorEl({ ...menuAnchorEl, [email]: null });
  };

  const handleDeleteSelected = () => {
    // Delete selected users
    const updatedUsers = users.filter((user) => !selected.includes(user.email));
    console.log("Deleted users:", selected);
    setSelected([]); // Clear selection
  };

  const isSelected = (email) => selected.indexOf(email) !== -1;

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Predefined light colors for avatars
  const avatarColors = [
    theme.palette.amber[300],
    theme.palette.purple[300],
    theme.palette.indigo[300],
    theme.palette.lightGreen[300],
    theme.palette.blue[300],
  ];

  return (
    <Grid
      container
      spacing={1}
      sx={{
        flexGrow: 1,
        width: "100%",
        p: 3,
      }}
    >
      <Grid size={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Stack direction="column">
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              User Management
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              Manage your team members and their access
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
                sx={{
                  borderRadius: "8px",
                  textTransform: "none",
                  px: 2,
                }}
              >
                Add User
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
            <Table aria-labelledby="tableUser">
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
                        selected.length > 0 && selected.length < users.length
                      }
                      checked={
                        users.length > 0 && selected.length === users.length
                      }
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "#fafafa", fontWeight: 600 }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ color: "#fafafa", fontWeight: 600 }}>
                    Email
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fafafa", fontWeight: 600 }}
                    align="center"
                  >
                    Role
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fafafa", fontWeight: 600 }}
                    align="center"
                  >
                    Department
                  </TableCell>
                  <TableCell
                    sx={{ color: "#fafafa", fontWeight: 600 }}
                    align="center"
                  >
                    Phone Number
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
                    Last Login
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
                {users.map((user, index) => {
                  const isItemSelected = isSelected(user.email);
                  const isMenuOpen = Boolean(menuAnchorEl[user.email]);
                  const avatarColor = avatarColors[index % avatarColors.length];

                  return (
                    <TableRow
                      hover
                      key={user.email}
                      selected={isItemSelected}
                      sx={{
                        "&:hover": { backgroundColor: theme.palette.grey[50] },
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={() => handleClick(user.email)}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar
                            sx={{
                              bgcolor: avatarColor,
                              width: 36,
                              height: 36,
                              fontSize: "14px",
                            }}
                          >
                            {getInitials(user.fullName)}
                          </Avatar>
                          <Typography variant="body2">
                            {user.fullName}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {user.email}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">{user.role}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">
                          {user.department}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">
                          {user.phoneNumber}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body2"
                          sx={{
                            color:
                              user.status === "Active"
                                ? theme.palette.success.main
                                : theme.palette.error.main,
                            fontWeight: 500,
                          }}
                        >
                          {user.status}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" color="text.secondary">
                          {user.lastLogin}
                        </Typography>
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
                              borderColor: theme.palette.primary.main,
                            }),
                          }}
                          onClick={(event) =>
                            handleMenuClick(event, user.email)
                          }
                        >
                          Actions
                        </Button>
                        <Menu
                          anchorEl={menuAnchorEl[user.email]}
                          open={isMenuOpen}
                          onClose={() => handleMenuClose(user.email)}
                          PaperProps={{
                            elevation: 2,
                            sx: { borderRadius: "8px" },
                          }}
                        >
                          <MenuItem
                            sx={{ color: "text.secondary", pl: 2, pr: 5 }}
                            onClick={() => handleMenuClose(user.email)}
                          >
                            Edit
                          </MenuItem>
                          <MenuItem
                            sx={{ color: "text.secondary", pl: 2, pr: 5 }}
                            onClick={() => {
                              handleDeleteSelected();
                              handleMenuClose(user.email);
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
