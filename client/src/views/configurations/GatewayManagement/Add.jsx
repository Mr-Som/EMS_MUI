import React, { useState, useRef } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Tabs,
  Tab,
  MenuItem,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  IconButton,
  styled,
  Select,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import QrScanner from "react-qr-scanner";
import {
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
  Upload as UploadIcon,
} from "@mui/icons-material";

const UploadArea = styled(Paper)(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  height: 250,
  width: 300,
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));

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
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [scanError, setScanError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    nickName: "",
    macAddress: "",
    location: "",
    serialNumber: "",
    projectName: "",
    connectedDevice: "",
    networkMode: "WiFi",
    SSID1: "",
    Password1: "",
    SSID2: "",
    Password2: "",
    TimeOut: "",
    apnNme: "",
    communicationProtocol: "Modbus RTU",
    baudRate: "9600",
    dataBits: "8",
    stopBits: "1",
    parity: "None",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setSubmitError("");
  };

  const handleReset = () => {
    setFormData({
      nickName: "",
      macAddress: "",
      location: "",
      serialNumber: "",
      projectName: "",
      connectedDevice: "",
      networkMode: "WiFi",
      SSID1: "",
      Password1: "",
      SSID2: "",
      Password2: "",
      TimeOut: "",
      apnNme: "",
      communicationProtocol: "Modbus RTU",
      baudRate: "9600",
      dataBits: "8",
      stopBits: "1",
      parity: "None",
    });
    setSubmitError("");
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const validateForm = () => {
    const requiredFields = [
      "nickName",
      "macAddress",
      "location",
      "serialNumber",
      "projectName",
      "connectedDevice",
    ];
    const networkFields = ["SSID1", "Password1", "TimeOut"];
    const modbusFields = [
      "communicationProtocol",
      "baudRate",
      "dataBits",
      "stopBits",
      "parity",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        return `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`;
      }
    }

    if (formData.networkMode === "WiFi" || formData.networkMode === "Both") {
      for (let field of networkFields) {
        if (!formData[field]) {
          return `Please fill in ${field === "TimeOut" ? "WiFi Timeout" : field.replace(/([A-Z])/g, " $1").toLowerCase()}`;
        }
      }
    }

    for (let field of modbusFields) {
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

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/api/gateways`,
        {
          mac_address: formData.macAddress, // Ensure this is in XX:XX:XX:XX:XX:XX format
          serial_number: formData.serialNumber,
          nick_name: formData.nickName,
          project_name: formData.projectName,
          location: formData.location,
          meter_count: parseInt(formData.connectedDevice) || 0,
          network_mode: formData.networkMode,
          ssid_1: formData.SSID1 || "",
          ssid_pwd_1: formData.Password1 || "",
          ssid_2: formData.SSID2 || "",
          ssid_pwd_2: formData.Password2 || "",
          ssid_timeout:
            formData.networkMode === "GSM" ? null : parseInt(formData.TimeOut),
          apn_name: formData.apnNme || "",
          md_protocol: formData.communicationProtocol,
          baud_rate: parseInt(formData.baudRate),
          data_bits: parseInt(formData.dataBits),
          stop_bits: parseInt(formData.stopBits),
          parity: formData.parity.toLowerCase(),
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        navigate("/gatewayManagement");
      } else {
        setSubmitError(response.data.error || "Failed to add gateway");
      }
    } catch (error) {
      setSubmitError(
        error.response?.data?.message ||
          "Failed to add gateway. Please try again."
      );
    }
  };

  const handleScan = (data) => {
    if (data) {
      try {
        const parsedData = JSON.parse(data.text);
        setFormData((prev) => ({
          ...prev,
          macAddress: parsedData.macAddress || "",
          serialNumber: parsedData.serialNumber || "",
          location: parsedData.location || "",
        }));
        setScanModalOpen(false);
        setScanError("");
      } catch (error) {
        setScanError("Invalid QR format");
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setScanError("Error scanning QR code");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleScan({ text: e.target.result });
      };
      reader.readAsText(file);
    }
  };

  const QrScannerModal = () => (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1300,
        p: 2,
        width: { xs: "90%", sm: 400 },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
        <IconButton onClick={() => setScanModalOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      {scanError && (
        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
          {scanError}
        </Typography>
      )}
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => fileInputRef.current.click()}
      >
        Upload QR Image
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileUpload}
      />
    </Paper>
  );

  return (
    <>
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(`/gatewayManagement/`)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>
      <Box sx={{ maxWidth: { xs: "100%", xl: 1080 }, mx: "auto", px: 2 }}>
        <Box sx={{ display: "flex", gap: 5 }}>
          <Box sx={{ flex: 1 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="standard"
              sx={{ mb: 3 }}
            >
              <Tab sx={{ pt: 0 }} label="General" />
              <Tab sx={{ pt: 0 }} label="Network" />
              <Tab sx={{ pt: 0 }} label="Modbus" />
            </Tabs>

            <Paper elevation={2}>
              <TabPanel value={tabValue} index={0}>
                <Grid container spacing={2}>
                  <Grid
                    size={{ xs: 12, md: 6 }}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <UploadArea
                      elevation={2}
                      onClick={() => setScanModalOpen(true)}
                    >
                      <UploadIcon fontSize="large" color="action" />
                      <Typography variant="h6" sx={{ mt: 1 }}>
                        Scan Gateway QR
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Click to scan or upload QR code
                      </Typography>
                    </UploadArea>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Grid container spacing={2}>
                      {[
                        {
                          label: "Serial No",
                          name: "serialNumber",
                          placeholder: "XL31245EA",
                          required: true,
                        },
                        {
                          label: "Preferred Name",
                          name: "nickName",
                          placeholder: "Gateway 1",
                          required: true,
                        },
                        {
                          label: "Project Name",
                          name: "projectName",
                          placeholder: "Metering System",
                          required: true,
                        },
                        {
                          label: "MAC Address",
                          name: "macAddress",
                          placeholder: "00:1A:2B:3C:4D:5E",
                          required: true,
                        },
                        {
                          label: "Meters Connected",
                          name: "connectedDevice",
                          type: "number",
                          placeholder: "10",
                          required: true,
                        },
                        {
                          label: "Location",
                          name: "location",
                          placeholder: "Main Building Floor 5",
                          required: true,
                        },
                      ].map((field) => (
                        <React.Fragment key={field.name}>
                          <Grid size={{ xs: 4 }}>
                            <Typography variant="body2" sx={{ pt: 1 }}>
                              {field.label}
                            </Typography>
                          </Grid>
                          <Grid size={{ xs: 8 }}>
                            <TextField
                              size="small"
                              fullWidth
                              name={field.name}
                              value={formData[field.name]}
                              onChange={handleChange}
                              placeholder={field.placeholder}
                              type={field.type || "text"}
                              required={field.required}
                            />
                          </Grid>
                        </React.Fragment>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="body2" sx={{ pt: 1 }}>
                      Network Selection
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <FormControl fullWidth size="small">
                      <RadioGroup
                        row
                        name="networkMode"
                        value={formData.networkMode}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="GSM"
                          control={<Radio />}
                          label="GSM"
                        />
                        <FormControlLabel
                          value="WiFi"
                          control={<Radio />}
                          label="WiFi"
                        />
                        <FormControlLabel
                          value="Both"
                          control={<Radio />}
                          label="Both"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 4 }}></Grid>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="body2" sx={{ pt: 1 }}>
                      WiFi SSID 1
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <TextField
                      size="small"
                      fullWidth
                      name="SSID1"
                      value={formData.SSID1}
                      onChange={handleChange}
                      required={formData.networkMode !== "GSM"}
                    />
                  </Grid>
                  <Grid size={{ xs: 4 }}></Grid>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="body2" sx={{ pt: 1 }}>
                      WiFi Password 1
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <TextField
                      size="small"
                      fullWidth
                      name="Password1"
                      value={formData.Password1}
                      onChange={handleChange}
                      required={formData.networkMode !== "GSM"}
                    />
                  </Grid>
                  <Grid size={{ xs: 4 }}></Grid>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="body2" sx={{ pt: 1 }}>
                      WiFi SSID 2
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <TextField
                      size="small"
                      fullWidth
                      name="SSID2"
                      value={formData.SSID2}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ xs: 4 }}></Grid>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="body2" sx={{ pt: 1 }}>
                      WiFi Password 2
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <TextField
                      size="small"
                      fullWidth
                      name="Password2"
                      value={formData.Password2}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ xs: 4 }}></Grid>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="body2" sx={{ pt: 1 }}>
                      WiFi Timeout (s)
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <TextField
                      size="small"
                      fullWidth
                      name="TimeOut"
                      value={formData.TimeOut}
                      onChange={handleChange}
                      required={formData.networkMode !== "GSM"}
                    />
                  </Grid>
                  <Grid size={{ xs: 4 }}></Grid>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="body2" sx={{ pt: 1 }}>
                      APN Name
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <TextField
                      size="small"
                      fullWidth
                      name="apnNme"
                      value={formData.apnNme}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="body2" sx={{ pt: 1 }}>
                      Modbus Protocol
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <FormControl fullWidth size="small">
                      <Select
                        name="communicationProtocol"
                        value={formData.communicationProtocol}
                        onChange={handleChange}
                        required
                      >
                        <MenuItem value="Modbus RTU">Modbus RTU</MenuItem>
                        <MenuItem value="Modbus TCP">Modbus TCP</MenuItem>
                        <MenuItem value="Modbus ASCII">Modbus ASCII</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 4 }}></Grid>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="body2" sx={{ pt: 1 }}>
                      BaudRate
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <FormControl fullWidth size="small">
                      <Select
                        name="baudRate"
                        value={formData.baudRate}
                        onChange={handleChange}
                        required
                      >
                        <MenuItem value="2400">2400</MenuItem>
                        <MenuItem value="4800">4800</MenuItem>
                        <MenuItem value="9600">9600</MenuItem>
                        <MenuItem value="19200">19200</MenuItem>
                        <MenuItem value="38400">38400</MenuItem>
                        <MenuItem value="57600">57600</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 4 }}></Grid>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="body2" sx={{ pt: 1 }}>
                      Data Bits
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <FormControl fullWidth size="small">
                      <Select
                        name="dataBits"
                        value={formData.dataBits}
                        onChange={handleChange}
                        required
                      >
                        <MenuItem value="8">8</MenuItem>
                        <MenuItem value="7">7</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 4 }}></Grid>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="body2" sx={{ pt: 1 }}>
                      Stop Bits
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <FormControl fullWidth size="small">
                      <Select
                        name="stopBits"
                        value={formData.stopBits}
                        onChange={handleChange}
                        required
                      >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 4 }}></Grid>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="body2" sx={{ pt: 1 }}>
                      Parity
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <FormControl fullWidth size="small">
                      <Select
                        name="parity"
                        value={formData.parity}
                        onChange={handleChange}
                        required
                      >
                        <MenuItem value="None">None</MenuItem>
                        <MenuItem value="Even">Even</MenuItem>
                        <MenuItem value="Odd">Odd</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </TabPanel>
            </Paper>

            {submitError && (
              <Typography color="danger" variant="body2" sx={{ mt: 2 }}>
                {submitError}
              </Typography>
            )}

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
      </Box>
      {scanModalOpen && <QrScannerModal />}
    </>
  );
}
