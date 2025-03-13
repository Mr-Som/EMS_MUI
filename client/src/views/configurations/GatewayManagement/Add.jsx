import React, { useState, useRef } from "react";
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
  InputLabel,
  Select,
  IconButton,
  styled,
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
  width: 300, // Added a fixed width for consistency
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
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    gatewayId: "GW792",
    nickName: "",
    macAddress: "",
    location: "",
    serialNumber: "",
    projectName: "",
    connectedDevice: "",
    phaseType: "",
    voltageMF: "",
    currentMF: "",
    energyMF: "",
    loadType: "",
    contractLoad: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReset = () => {
    setFormData({
      gatewayId: "GW792",
      nickName: "",
      macAddress: "",
      location: "",
      serialNumber: "",
      projectName: "",
      connectedDevice: "",
      phaseType: "",
      voltageMF: "",
      currentMF: "",
      energyMF: "",
      loadType: "",
      contractLoad: "",
    });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleScan = (data) => {
    if (data) {
      try {
        const parsedData = JSON.parse(data.text);
        setFormData((prev) => ({
          ...prev,
          macAddress: parsedData.macAddress || "",
          serialNumber: parsedData.serialNumber || "",
          gatewayId: parsedData.gatewayId || "",
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
                          label: "Gateway ID",
                          name: "gatewayId",
                          disabled: true,
                        },
                        {
                          label: "Serial No",
                          name: "serialNumber",
                          placeholder: "XL31245EA",
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
                              disabled={field.disabled}
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
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
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
                      Wifi SSID 1
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <TextField
                      size="small"
                      fullWidth
                      name="SSID1"
                      value={formData.contractLoad}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ xs: 4 }}></Grid>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="body2" sx={{ pt: 1 }}>
                      Wifi Password 1
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <TextField
                      size="small"
                      fullWidth
                      name="Password1"
                      value={formData.contractLoad}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ xs: 4 }}></Grid>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="body2" sx={{ pt: 1 }}>
                      Wifi SSID 2
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <TextField
                      size="small"
                      fullWidth
                      name="SSID2"
                      value={formData.contractLoad}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ xs: 4 }}></Grid>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="body2" sx={{ pt: 1 }}>
                      Wifi Password 2
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <TextField
                      size="small"
                      fullWidth
                      name="Password2"
                      value={formData.contractLoad}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ xs: 4 }}></Grid>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="body2" sx={{ pt: 1 }}>
                      Wifi TimeOut (s)
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <TextField
                      size="small"
                      fullWidth
                      name="TimeOut"
                      value={formData.contractLoad}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ xs: 4 }}></Grid>
                  <Grid size={{ xs: 4 }}>
                    <Typography variant="body2" sx={{ pt: 1 }}>
                      APN Nme
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <TextField
                      size="small"
                      fullWidth
                      name="apnNme"
                      value={formData.contractLoad}
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
                        name="communicationProtocol"
                        value={formData.communicationProtocol}
                        onChange={handleChange}
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
                        name="communicationProtocol"
                        value={formData.communicationProtocol}
                        onChange={handleChange}
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
                        name="communicationProtocol"
                        value={formData.communicationProtocol}
                        onChange={handleChange}
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
                        name="communicationProtocol"
                        value={formData.communicationProtocol}
                        onChange={handleChange}
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
