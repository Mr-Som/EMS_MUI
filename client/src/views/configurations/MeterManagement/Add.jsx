import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  Tabs,
  Tab,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import { useNavigate, useLocation } from "react-router-dom";

import {
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const DefaultThumbnail = () => (
  <svg
    width="80"
    viewBox="0 0 900 900"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M328.063 589.559C293.977 589.559 263.656 567.734 252.646 535.242L251.902 532.794C249.305 524.19 248.217 516.954 248.217 509.714V364.541L196.563 536.966C189.92 562.327 205.059 588.62 230.459 595.626L559.701 683.799C563.811 684.863 567.92 685.374 571.967 685.374C593.172 685.374 612.548 671.3 617.979 650.559L637.161 589.559H328.063Z"
      fill="#DCE5F1"
    />
    <path
      d="M386.618 365.991C410.104 365.991 429.2 346.892 429.2 323.406C429.2 299.92 410.104 280.82 386.618 280.82C363.132 280.82 344.032 299.92 344.032 323.406C344.032 346.892 363.132 365.991 386.618 365.991Z"
      fill="#DCE5F1"
    />
    <path
      d="M652.768 216.944H333.385C304.047 216.944 280.156 240.835 280.156 270.177V504.388C280.156 533.73 304.047 557.621 333.385 557.621H652.768C682.11 557.621 706.001 533.73 706.001 504.388V270.177C706.001 240.835 682.11 216.944 652.768 216.944V216.944ZM333.385 259.529H652.768C658.647 259.529 663.415 264.297 663.415 270.177V421.33L596.155 342.845C589.02 334.478 578.692 330.006 567.6 329.753C556.571 329.815 546.224 334.712 539.155 343.188L460.074 438.106L434.311 412.406C419.749 397.844 396.049 397.844 381.507 412.406L322.741 471.152V270.177C322.741 264.297 327.510 259.529 333.385 259.529V259.529Z"
      fill="#DCE5F1"
    />
  </svg>
);

export default function Add() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    meterId: "MT608977",
    description: "",
    model: "",
    thumbnail: null,
    nickName: "",
    serialNumber: "",
    gatewayId: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleReset = () => {
    setFormData({
      meterId: "",
      description: "",
      model: "",
      thumbnail: null,
      nickName: "",
      serialNumber: "",
      gatewayId: "",
      location: "",
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        thumbnail: URL.createObjectURL(file),
      });
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <Button
        variant="text"
        onClick={() => navigate(`/meterManagement/`)}
        startIcon={<ArrowBackIcon />}
      >
        Back
      </Button>
      <Box
        sx={{
          p: 4,
          maxWidth: { xs: "100%", xl: 1320 },
          m: "auto",
          display: "flex",
          gap: 5,
        }}
      >
        {/* Left Section */}
        <Box
          sx={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            justifyContent: "space-between",
          }}
        >
          {/* Model Selection */}
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Model
            </Typography>
            <FormControl fullWidth size="small">
              <InputLabel>Select Model</InputLabel>
              <Select
                name="model"
                value={formData.model}
                onChange={handleChange}
                label="Select Model"
              >
                <MenuItem value="ELITE 100">ELITE 100</MenuItem>
                <MenuItem value="ELITE 300">ELITE 300</MenuItem>
                <MenuItem value="ELITE 440">ELITE 440</MenuItem>
                <MenuItem value="ELITE 500">ELITE 500</MenuItem>
                <MenuItem value="PRIMIER 300">PRIMIER 300</MenuItem>
                <MenuItem value="APEX 100">APEX 100</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
              First Select Model Name.
            </Typography>
          </Paper>

          {/* Thumbnail Upload */}
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                mb: 2,
                width: "100%",
                textAlign: "left",
              }}
            >
              Thumbnail
            </Typography>

            <Box
              sx={{
                position: "relative",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  border: "2px dashed",
                  borderColor: theme.palette.divider,
                  borderRadius: 2,
                  height: 200,
                  width: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "background.default",
                  mb: 2,
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                {formData.thumbnail ? (
                  <>
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 2,
                        backgroundColor: "rgba(255,255,255,0.7)",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.9)",
                        },
                      }}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, thumbnail: null }))
                      } // Fixed line
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                    <img
                      src={formData.thumbnail}
                      alt="Thumbnail preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </>
                ) : (
                  <Box sx={{ textAlign: "center" }}>
                    <DefaultThumbnail />
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mt: 1 }}
                    >
                      Click to upload
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="thumbnail-upload"
            />
            <label htmlFor="thumbnail-upload" style={{ width: "100%" }}>
              <Button
                variant="outlined"
                component="span"
                fullWidth
                sx={{ py: 1 }}
              >
                Choose File
              </Button>
            </label>

            <Typography
              variant="caption"
              color="textSecondary"
              sx={{
                mt: 1,
                display: "block",
                textAlign: "center",
                width: "100%",
              }}
            >
              PNG, JPG, JPEG (Max 5MB)
            </Typography>
          </Paper>
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="standard"
              sx={{ mb: 3 }}
            >
              <Tab sx={{ pt: 0 }} label="General" />
              <Tab sx={{ pt: 0 }} label="Advanced" />
            </Tabs>

            <Paper elevation={2} sx={{ mt: 4 }}>
              <TabPanel value={tabValue} index={0}>
                <Grid container spacing={2}>
                  <Grid item size={2}>
                    <Typography variant="body2" gutterBottom>
                      Meter Id
                    </Typography>
                  </Grid>
                  <Grid item size={4}>
                    <TextField
                      disabled
                      size="small"
                      fullWidth
                      placeholder="Meter Id"
                      name="meterId"
                      value={formData.meterId}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item size={2}>
                    <Typography variant="body2" gutterBottom>
                      Meter Name
                    </Typography>
                  </Grid>
                  <Grid item size={4}>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Meter Name"
                      name="nickName"
                      value={formData.nickName}
                      onChange={handleChange}
                      required
                      helperText="Ex: main panel meter"
                    />
                  </Grid>
                  <Grid item size={2}>
                    <Typography variant="body2" gutterBottom>
                      Serial Number
                    </Typography>
                  </Grid>
                  <Grid item size={4}>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Serial Number"
                      name="serialNumber"
                      value={formData.serialNumber}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item size={2}>
                    <Typography variant="body2" gutterBottom>
                      Gateway ID
                    </Typography>
                  </Grid>
                  <Grid item size={4}>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Gateway ID"
                      name="gatewayId"
                      value={formData.gatewayId}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item size={2}>
                    <Typography variant="body2">CT Primary</Typography>
                  </Grid>
                  <Grid item size={4}>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="CT Primary"
                      name="ctPrimary"
                      value={formData.ctPrimary}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item size={2}>
                    <Typography variant="body2">CT Secondary</Typography>
                  </Grid>
                  <Grid item size={4}>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="CT Secondary"
                      name="ctSecondary"
                      value={formData.ctSecondary}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item size={2}>
                    <Typography variant="body2">PT Primary</Typography>
                  </Grid>
                  <Grid item size={4}>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="PT Primary"
                      name="ptPrimary"
                      value={formData.ptPrimary}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item size={2}>
                    <Typography variant="body2">PT Secondary</Typography>
                  </Grid>
                  <Grid item size={4}>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="PT Secondary"
                      name="ptSecondary" // Fixed typo: ptPrimary → ptSecondary
                      value={formData.ptSecondary}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item size={2}>
                    <Typography variant="body2">Modbus Id</Typography>
                  </Grid>
                  <Grid item size={4}>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Modbus Id"
                      name="modbusId"
                      value={formData.modbusId}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item size={2}>
                    <Typography variant="body2">Protocol</Typography>
                  </Grid>
                  <Grid item size={4}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Select Protocol</InputLabel>
                      <Select
                        name="communicationProtocol"
                        value={formData.communicationProtocol}
                        onChange={handleChange}
                        label="Select Protocol"
                      >
                        <MenuItem value="Modbus RTU">Modbus RTU</MenuItem>
                        <MenuItem value="Modbus TCP">Modbus TCP</MenuItem>
                        <MenuItem value="Modbus ASCII">Modbus ASCII</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item size={2}>
                    <Typography variant="body2" gutterBottom>
                      Location
                    </Typography>
                  </Grid>
                  <Grid item size={10}>
                    <TextField
                      required
                      size="small"
                      fullWidth
                      placeholder="Location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Grid container spacing={2}>
                  <Grid item size={2}>
                    <Typography variant="body2">Phase Type</Typography>
                  </Grid>
                  <Grid item size={4}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Select Phase Type</InputLabel>
                      <Select
                        name="phaseType"
                        value={formData.phaseType}
                        onChange={handleChange}
                        label="Select Phase Type"
                      >
                        <MenuItem value="Single Phase">1P2W</MenuItem>
                        <MenuItem value="Three Phase Three Wire">3P3W</MenuItem>
                        <MenuItem value="Three Phase with Neutral">
                          3P4W
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item size={6}></Grid>
                  <Grid item size={2}>
                    <Typography variant="body2">Voltage MF</Typography>
                  </Grid>
                  <Grid item size={4}>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Voltage MF"
                      name="voltageMF"
                      value={formData.voltageMF}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item size={2}>
                    <Typography variant="body2">Current MF</Typography>
                  </Grid>
                  <Grid item size={4}>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Current MF"
                      name="currentMF"
                      value={formData.currentMF}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item size={2}>
                    <Typography variant="body2">Energy MF</Typography>
                  </Grid>
                  <Grid item size={4}>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Energy MF"
                      name="energyMF"
                      value={formData.energyMF}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item size={6}></Grid>
                  <Grid item size={2}>
                    <Typography variant="body2">Load Type</Typography>
                  </Grid>
                  <Grid item size={4}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Select Load Type</InputLabel>
                      <Select
                        name="loadType"
                        value={formData.loadType}
                        onChange={handleChange}
                        label="Select Load Type"
                      >
                        <MenuItem value="Residential">Residential</MenuItem>
                        <MenuItem value="Commercial">Commercial</MenuItem>
                        <MenuItem value="Industrial">Industrial</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item size={2}>
                    <Typography variant="body2">Contract Load (kW)</Typography>
                  </Grid>
                  <Grid item size={4}>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Contract Load (kW)"
                      name="contractLoad"
                      value={formData.contractLoad}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </TabPanel>
            </Paper>
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 3,
            }}
          >
            <Button
              variant="text"
              size="large"
              onClick={handleReset}
              sx={{ px: 4, borderRadius: 2 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              sx={{ px: 4, borderRadius: 2 }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
