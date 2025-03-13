import React, { useState } from "react";
import {
  Box,
  Divider,
  Typography,
  Slider,
  Select,
  MenuItem,
  Card,
  CardContent,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function PricingPlan() {
  const theme = useTheme();

  // State for customization sliders and dropdowns (default to Platinum pack settings)
  const [numUsers, setNumUsers] = useState(1);
  const [numMeters, setNumMeters] = useState(1);
  const [numGateways, setNumGateways] = useState(1);
  const [duration, setDuration] = useState(1);
  const [backupDuration, setBackupDuration] = useState(1);
  const [pollingTime, setPollingTime] = useState(1);

  // Pricing plans data based on the image
  const pricingPlans = [
    {
      name: "Trial pack",
      features: [
        { name: "Energy & cost monitoring", available: true },
        { name: "Reports", available: true },
        { name: "Monitoring over smartphone", available: true },
        { name: "Open access/scheduled analysis", available: true },
        { name: "Water/Heat/Gas support", available: true },
      ],
      color: "#FFD700", // Gold for Trial pack
    },
    {
      name: "Silver pack",
      features: [
        { name: "Energy & cost monitoring", available: true },
        { name: "Reports", available: false },
        { name: "Monitoring over smartphone", available: false },
        { name: "Open access/scheduled analysis", available: false },
        { name: "Water/Heat/Gas support", available: false },
      ],
      color: "#FFD700", // Gold for Silver pack
    },
    {
      name: "Gold pack",
      features: [
        { name: "Energy & cost monitoring", available: true },
        { name: "Reports", available: true },
        { name: "Monitoring over smartphone", available: true },
        { name: "Open access/scheduled analysis", available: false },
        { name: "Water/Heat/Gas support", available: true },
      ],
      color: "#FFD700", // Gold for Gold pack
    },
    {
      name: "Platinum pack",
      features: [
        { name: "Energy & cost monitoring", available: true },
        { name: "Reports", available: true },
        { name: "Monitoring over smartphone", available: true },
        { name: "Open access/scheduled analysis", available: true },
        { name: "Water/Heat/Gas support", available: true },
      ],
      color: "#2E7D32", // Green for Platinum pack
    },
  ];

  // Polling time options (in minutes)
  const pollingOptions = [1, 3, 5, 15, 30, 60];

  return (
    <Box sx={{ p: 4 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}></TableCell>
              {pricingPlans.map((plan) => (
                <TableCell
                  key={plan.name}
                  sx={{
                    backgroundColor: plan.color,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {plan.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {pricingPlans[0].features.map((feature, index) => (
              <TableRow key={feature.name}>
                <TableCell sx={{ backgroundColor: "#E0F7FA" }}>
                  {feature.name}
                </TableCell>
                {pricingPlans.map((plan) => (
                  <TableCell key={plan.name} sx={{ textAlign: "center" }}>
                    {plan.features[index].available ? (
                      <Typography color="green">✔</Typography>
                    ) : (
                      <Typography color="red">✘</Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Custom Selection Section */}
      <Box sx={{ mt: 4, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Customize Your Subscription
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          {/* Number of Users */}
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Number of Users (Limit: 50)</Typography>
            <Slider
              value={numUsers}
              onChange={(e, value) => setNumUsers(value)}
              min={1}
              max={50}
              valueLabelDisplay="auto"
              sx={{ width: "100%" }}
            />
          </Grid>

          {/* Number of Meters */}
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Number of Meters (Limit: 1000)</Typography>
            <Slider
              value={numMeters}
              onChange={(e, value) => setNumMeters(value)}
              min={1}
              max={1000}
              valueLabelDisplay="auto"
              sx={{ width: "100%" }}
            />
          </Grid>

          {/* Number of Gateways */}
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Number of Gateways (Limit: 50)</Typography>
            <Slider
              value={numGateways}
              onChange={(e, value) => setNumGateways(value)}
              min={1}
              max={50}
              valueLabelDisplay="auto"
              sx={{ width: "100%" }}
            />
          </Grid>

          {/* Duration */}
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Duration (Years, Limit: 5)</Typography>
            <Slider
              value={duration}
              onChange={(e, value) => setDuration(value)}
              min={1}
              max={5}
              valueLabelDisplay="auto"
              sx={{ width: "100%" }}
            />
          </Grid>

          {/* Backup Data Duration */}
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>
              Backup Data Duration (Years, Limit: 5)
            </Typography>
            <Slider
              value={backupDuration}
              onChange={(e, value) => setBackupDuration(value)}
              min={1}
              max={5}
              valueLabelDisplay="auto"
              sx={{ width: "100%" }}
            />
          </Grid>

          {/* Meter Reading Frequency (Polling Time) */}
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>
              Meter Reading Frequency (Minutes)
            </Typography>
            <Select
              value={pollingTime}
              onChange={(e) => setPollingTime(e.target.value)}
              fullWidth
              size="small"
            >
              {pollingOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button variant="contained" color="primary">
            Apply Configuration
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
