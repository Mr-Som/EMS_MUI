import React from "react";
import {
  Box,
  Divider,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";

export default function OrganizationDetails() {
  const theme = useTheme();
  const [country, setCountry] = React.useState("");
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [orgType, setOrgType] = React.useState("");

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };
  const handleStateChange = (event) => {
    setState(event.target.value);
  };
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
  const handleZipChange = (event) => {
    setZip(event.target.value);
  };
  const handleOrgTypeChange = (event) => {
    setOrgType(event.target.value);
  };

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ spacing: 2 }}>
      <Grid container spacing={3}>
        <Grid item size={4}>
          <TextField
            fullWidth
            id="org_name"
            label="Organization Name"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item size={4}>
          <Select
            labelId="label_org_type"
            id="org_type"
            value={orgType}
            fullWidth
            size="small"
            onChange={handleOrgTypeChange}
            label="Organization Type"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Public">Public</MenuItem>
            <MenuItem value="Private">Private</MenuItem>
            <MenuItem value="Government">Government</MenuItem>
          </Select>
        </Grid>
        <Grid item size={4}></Grid>
        <Grid item size={4}>
          <TextField
            fullWidth
            id="org_pan"
            label="PAN Number"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item size={4}>
          <TextField
            fullWidth
            id="org_gst"
            label="GST Number"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item size={12}>
          <Divider />
        </Grid>
        <Grid item size={4}>
          <Typography variant="inherit">Billing Address</Typography>
        </Grid>
        <Grid item size={8}></Grid>
        <Grid item size={2}>
          Address line 1
        </Grid>
        <Grid item size={4}>
          <TextField
            fullWidth
            id="bill_street1"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item size={2}>
          <Typography variant="inherit">Address line 2</Typography>
        </Grid>
        <Grid item size={4}>
          <TextField
            fullWidth
            id="bill_street2"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item size={2}>
          <Typography variant="inherit">Country</Typography>
        </Grid>
        <Grid item size={4}>
          <Select
            id="bill_country"
            value={country}
            fullWidth
            size="small"
            onChange={handleCountryChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>India</MenuItem>
            <MenuItem value={2}>Others</MenuItem>
          </Select>
        </Grid>
        <Grid item size={2}>
          <Typography variant="inherit">State</Typography>
        </Grid>
        <Grid item size={4}>
          <Select
            id="bill_state"
            value={state}
            fullWidth
            size="small"
            onChange={handleStateChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Maharashtra</MenuItem>
            <MenuItem value={2}>Others</MenuItem>
          </Select>
        </Grid>
        <Grid item size={2}>
          <Typography variant="inherit">City</Typography>
        </Grid>
        <Grid item size={4}>
          <Select
            id="bill_city"
            value={city}
            fullWidth
            size="small"
            onChange={handleCityChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Pune</MenuItem>
            <MenuItem value={2}>Others</MenuItem>
          </Select>
        </Grid>
        <Grid item size={2}>
          <Typography variant="inherit">Zip Code</Typography>
        </Grid>
        <Grid item size={4}>
          <TextField
            fullWidth
            id="bill_zip"
            value={zip}
            variant="outlined"
            size="small"
            onChange={handleZipChange}
          />
        </Grid>
        <Grid item size={4}>
          <Typography variant="inherit">Shipping Address</Typography>
        </Grid>
        <Grid item size={8}></Grid>
        <Grid item size={2}>
          Address line 1
        </Grid>
        <Grid item size={4}>
          <TextField
            fullWidth
            id="ship_street1"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item size={2}>
          <Typography variant="inherit">Address line 2</Typography>
        </Grid>
        <Grid item size={4}>
          <TextField
            fullWidth
            id="ship_street2"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item size={2}>
          <Typography variant="inherit">Country</Typography>
        </Grid>
        <Grid item size={4}>
          <Select
            id="ship_country"
            value={country}
            fullWidth
            size="small"
            onChange={handleCountryChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>India</MenuItem>
            <MenuItem value={2}>Others</MenuItem>
          </Select>
        </Grid>
        <Grid item size={2}>
          <Typography variant="inherit">State</Typography>
        </Grid>
        <Grid item size={4}>
          <Select
            id="ship_state"
            value={state}
            fullWidth
            size="small"
            onChange={handleStateChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Maharashtra</MenuItem>
            <MenuItem value={2}>Others</MenuItem>
          </Select>
        </Grid>
        <Grid item size={2}>
          <Typography variant="inherit">City</Typography>
        </Grid>
        <Grid item size={4}>
          <Select
            id="ship_city"
            value={city}
            fullWidth
            size="small"
            onChange={handleCityChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Pune</MenuItem>
            <MenuItem value={2}>Others</MenuItem>
          </Select>
        </Grid>
        <Grid item size={2}>
          <Typography variant="inherit">Zip Code</Typography>
        </Grid>
        <Grid item size={4}>
          <TextField
            fullWidth
            id="ship_zip"
            value={zip}
            variant="outlined"
            size="small"
            onChange={handleZipChange}
          />
        </Grid>
        <Grid item size={12}>
          <Divider />
        </Grid>
      </Grid>
    </Box>
  );
}
