import React from "react";
import { Box, TextField } from "@mui/material";

import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";

export default function PersonalDetails() {
  const theme = useTheme();
  return (
    <Box component="form" noValidate autoComplete="off" sx={{ spacing: 2 }}>
      <Grid container spacing={3}>
        <Grid item size={4}>
          <TextField
            fullWidth
            id="first_name"
            label="First Name"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item size={4}>
          <TextField
            fullWidth
            id="mid_name"
            label="Middle Name"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item size={4}>
          <TextField
            fullWidth
            id="last_name"
            label="Last Name"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item size={4}>
          <TextField
            fullWidth
            id="department"
            label="Department"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item size={4}>
          <TextField
            fullWidth
            id="designation"
            label="Designation"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item size={4}></Grid>
        <Grid item size={4}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            size="small"
            helperText="Email Not Varified"
            FormHelperTextProps={{
              sx: {
                color: theme.palette.danger.main,
              },
            }}
          />
        </Grid>
        <Grid item size={8}></Grid>
        <Grid item size={4}>
          <TextField
            fullWidth
            id="phone"
            label="Phone Number"
            variant="outlined"
            size="small"
            helperText="Varified"
            FormHelperTextProps={{
              sx: {
                color: theme.palette.success.main,
              },
            }}
          />
        </Grid>
        <Grid item size={8}></Grid>
      </Grid>
    </Box>
  );
}
