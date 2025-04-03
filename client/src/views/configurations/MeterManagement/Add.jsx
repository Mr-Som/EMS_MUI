import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { useNavigate } from "react-router-dom";
import DefaultThumbnail from "../../../assets/default-thumbnail.svg";
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

export default function Add() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [submitError, setSubmitError] = useState("");
  const [gateways, setGateways] = useState([]);
  const [formData, setFormData] = useState({
    serialNumber: "",
    modelName: "",
    thumbnail: null, // Holds file preview URL
    thumbnailFile: null, // Holds the actual file object
    nickName: "",
    gatewayId: "",
    macAddress: "",
    location: "",
    mdProtocol: "Modbus RTU",
    mdId: "",
    ctPrimary: "",
    ctSecondary: "",
    ptPrimary: "",
    ptSecondary: "",
    voltageMf: "",
    currentMf: "",
    energyMf: "",
    phaseType: "",
    loadType: "",
    contractKw: "",
  });

  useEffect(() => {
    fetchGateways();
  }, []);

  const fetchGateways = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API_URL}/api/gateways`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setGateways(response.data.data);
        console.log("Fetched gateways:", response.data.data); // Debug log
      } else {
        console.error("Failed to fetch gateways:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching gateways:", error);
    }
  };

  const handleGatewayChange = (event) => {
    const selectedGatewayId = event.target.value;
    handleChange(event);

    const selectedGateway = gateways.find(
      (g) => g.gateway_id === selectedGatewayId
    );

    if (selectedGateway) {
      setFormData((prev) => ({
        ...prev,
        macAddress: selectedGateway.mac_address || "",
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setSubmitError("");
  };

  const handleReset = () => {
    setFormData({
      serialNumber: "",
      modelName: "",
      thumbnail: null,
      thumbnailFile: null,
      nickName: "",
      gatewayId: "",
      macAddress: "",
      location: "",
      mdProtocol: "Modbus RTU",
      mdId: "",
      ctPrimary: "",
      ctSecondary: "",
      ptPrimary: "",
      ptSecondary: "",
      voltageMf: "",
      currentMf: "",
      energyMf: "",
      phaseType: "",
      loadType: "",
      contractKw: "",
    });
    setSubmitError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setSubmitError("File size exceeds 5MB limit");
        return;
      }
      setFormData({
        ...formData,
        thumbnail: URL.createObjectURL(file),
        thumbnailFile: file,
      });
      setSubmitError("");
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const validateForm = () => {
    const requiredFields = [
      "serialNumber",
      "modelName",
      "nickName",
      "gatewayId",
      "location",
      "mdId",
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        return `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`;
      }
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("gateway_id", formData.gatewayId);
    formDataToSend.append("mac_address", formData.macAddress);
    formDataToSend.append("serial_number", formData.serialNumber);
    formDataToSend.append("model_name", formData.modelName);
    formDataToSend.append("nick_name", formData.nickName);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("md_protocol", formData.mdProtocol);
    formDataToSend.append("md_id", formData.mdId);
    formDataToSend.append("ct_primary", formData.ctPrimary || "");
    formDataToSend.append("ct_secondary", formData.ctSecondary || "");
    formDataToSend.append("pt_primary", formData.ptPrimary || "");
    formDataToSend.append("pt_secondary", formData.ptSecondary || "");
    formDataToSend.append("voltage_mf", formData.voltageMf || "");
    formDataToSend.append("current_mf", formData.currentMf || "");
    formDataToSend.append("energy_mf", formData.energyMf || "");
    formDataToSend.append("phase_type", formData.phaseType || "");
    formDataToSend.append("load_type", formData.loadType || "");
    formDataToSend.append("contract_kw", formData.contractKw || "");
    if (formData.thumbnailFile) {
      formDataToSend.append("thumbnail", formData.thumbnailFile);
    }

    // Debug log FormData contents
    for (let pair of formDataToSend.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/api/meters`,
        formDataToSend,
        { withCredentials: true }
      );

      if (response.data.success) {
        navigate("/meterManagement");
      } else {
        setSubmitError(response.data.error || "Failed to add meter");
      }
    } catch (error) {
      console.error("Submit error:", error.response?.data);
      setSubmitError(
        error.response?.data?.message ||
          "Failed to add meter. Please try again."
      );
    }
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
                name="modelName"
                value={formData.modelName}
                onChange={handleChange}
                label="Select Model"
                required
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
                        setFormData((prev) => ({
                          ...prev,
                          thumbnail: null,
                          thumbnailFile: null,
                        }))
                      }
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
                    <img
                      src={DefaultThumbnail}
                      alt="Default Thumbnail"
                      style={{ width: 80, height: 80 }}
                    />
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
                    <FormControl fullWidth size="small">
                      <InputLabel>Select Gateway</InputLabel>
                      <Select
                        name="gatewayId"
                        value={formData.gatewayId}
                        onChange={handleGatewayChange}
                        label="Select Gateway"
                        required
                      >
                        {gateways.map((gateway) => (
                          <MenuItem
                            key={gateway.gateway_id}
                            value={gateway.gateway_id}
                          >
                            GW{gateway.uid} - {gateway.nick_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item size={2}>
                    <Typography variant="body2" gutterBottom>
                      MAC Address
                    </Typography>
                  </Grid>
                  <Grid item size={4}>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="MAC Address"
                      name="macAddress"
                      value={formData.macAddress || ""}
                      onChange={handleChange}
                      type="text"
                      InputProps={{
                        readOnly: true,
                      }}
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
                      type="number"
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
                      type="number"
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
                      type="number"
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
                      name="ptSecondary"
                      value={formData.ptSecondary}
                      onChange={handleChange}
                      type="number"
                    />
                  </Grid>
                  <Grid item size={2}>
                    <Typography variant="body2">Modbus ID</Typography>
                  </Grid>
                  <Grid item size={4}>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Modbus ID"
                      name="mdId"
                      value={formData.mdId}
                      onChange={handleChange}
                      type="number"
                      required
                    />
                  </Grid>
                  <Grid item size={2}>
                    <Typography variant="body2">Protocol</Typography>
                  </Grid>
                  <Grid item size={4}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Select Protocol</InputLabel>
                      <Select
                        name="mdProtocol"
                        value={formData.mdProtocol}
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
                        <MenuItem value="1P2W">Single Phase</MenuItem>
                        <MenuItem value="3P3W">Three Phase Three Wire</MenuItem>
                        <MenuItem value="3P4W">
                          Three Phase with Neutral
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
                      name="voltageMf"
                      value={formData.voltageMf}
                      onChange={handleChange}
                      type="number"
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
                      name="currentMf"
                      value={formData.currentMf}
                      onChange={handleChange}
                      type="number"
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
                      name="energyMf"
                      value={formData.energyMf}
                      onChange={handleChange}
                      type="number"
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
                      name="contractKw"
                      value={formData.contractKw}
                      onChange={handleChange}
                      type="number"
                    />
                  </Grid>
                </Grid>
              </TabPanel>
            </Paper>

            {submitError && (
              <Typography color="danger" variant="body2" sx={{ mt: 2 }}>
                {submitError}
              </Typography>
            )}
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
