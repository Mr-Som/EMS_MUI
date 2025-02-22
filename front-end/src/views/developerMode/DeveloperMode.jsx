import * as React from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Typography,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import StepConnector from "@mui/material/StepConnector";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

const steps = [
  { label: "Step 1", description: "Personal Details" },
  { label: "Step 2", description: "Company Details" },
  { label: "Step 3", description: "Subscription plan" },
  { label: "Step 4", description: "Payment details" },
];

// CustomStepConnector component
const CustomStepConnector = () => {
  const theme = useTheme();
  return (
    <StepConnector
      sx={{
        ml: "19px",
        "&.Mui-active, &.Mui-completed": {
          "& .MuiStepConnector-line": {
            borderLeftWidth: 4,
            borderColor: theme.palette.primary.main,
          },
        },
        "& .MuiStepConnector-line": {
          borderLeftWidth: 4,
          minHeight: "40px", // Default height, will adjust dynamically
        },
      }}
    />
  );
};

// CustomStepIcon component
const CustomStepIcon = (props) => {
  const { active, completed, icon } = props;
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...(active &&
          !completed && {
            border: "4px solid #fff",
            borderRadius: "50%",
            boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
          }),
      }}
    >
      {completed ? (
        <CheckCircleIcon
          sx={{ color: theme.palette.primary.main, fontSize: 30 }}
        />
      ) : active ? (
        <AppRegistrationIcon
          sx={{ color: theme.palette.primary.main, fontSize: 30 }}
        />
      ) : (
        <CircleOutlinedIcon
          sx={{ color: "rgba(0, 0, 0, 0.38)", fontSize: 30 }}
        />
      )}
    </Box>
  );
};

export default function CompanyRegistrationStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => setActiveStep(0);

  return (
    <Grid
      container
      spacing={3}
      sx={{
        flexGrow: 1,
        width: "100%",
        p: 3,
        overflow: "auto",
      }}
    >
      <Grid xs={12} md={12}>
        <Typography variant="h6" sx={{ p: 2 }}>
          Complete registration
        </Typography>
        <Divider />
      </Grid>
      {/* Left Side: Stepper */}
      <Grid item xs={12} md={2}>
        <Stack direction="column" sx={{ height: "100%" }}>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            connector={<CustomStepConnector />}
          >
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconComponent={CustomStepIcon}
                  sx={{
                    "& .MuiStepLabel-label": {
                      "& .step-title": {
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        fontSize: "10px",
                        color: "rgba(0, 0, 0, 0.6)",
                      },
                      "&.Mui-active .step-title": {
                        color: "rgba(0, 0, 0, 0.87)",
                      },
                    },
                  }}
                >
                  <div>
                    <Typography variant="caption" className="step-title">
                      {step.label}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {step.description}
                    </Typography>
                  </div>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
      </Grid>
      {/* Right Side: Form */}
      <Grid item xs={12} md={10}>
        <Paper
          elevation={0}
          sx={{ p: 3, backgroundColor: "inherit", height: "100%" }}
        >
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you're finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box sx={{ mt: 1 }}>
                {activeStep === 0 && (
                  <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{ spacing: 2 }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          id="first_name"
                          label="First Name"
                          variant="outlined"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          id="last_name"
                          label="Last Name"
                          variant="outlined"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          id="email"
                          label="Email"
                          variant="outlined"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          id="phone"
                          label="Phone Number"
                          variant="outlined"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          id="dob"
                          label="Date of Birth"
                          type="date"
                          variant="outlined"
                          size="small"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          id="gender"
                          label="Gender"
                          variant="outlined"
                          size="small"
                          select
                          SelectProps={{ native: true }}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </TextField>
                      </Grid>
                    </Grid>
                  </Box>
                )}
                {activeStep === 1 && (
                  <Box>
                    <Typography variant="h6">Company Details</Typography>
                    <TextField fullWidth label="Company Name" margin="normal" />
                    <TextField fullWidth label="Address" margin="normal" />
                  </Box>
                )}
                {activeStep === 2 && (
                  <Box>
                    <Typography variant="h6">Subscription Plan</Typography>
                    <TextField fullWidth label="Plan" margin="normal" />
                    <TextField fullWidth label="Duration" margin="normal" />
                  </Box>
                )}
                {activeStep === 3 && (
                  <Box>
                    <Typography variant="h6">Payment Details</Typography>
                    <TextField fullWidth label="Card Number" margin="normal" />
                    <TextField fullWidth label="Expiry Date" margin="normal" />
                  </Box>
                )}
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  variant="contained"
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button variant="contained" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
