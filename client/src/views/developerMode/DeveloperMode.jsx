import * as React from "react";
import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Typography,
  TextField,
  StepConnector,
} from "@mui/material";

import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";

// Icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

// component
import PersonalDetails from "./PersonalDetails";
import OrganizationDetails from "./OrganizationDetails";
import SubscriptionDetails from "./SubscriptionDetails";

const steps = [
  { label: "Step 1", description: "Personal Details" },
  { label: "Step 2", description: "Organization Details" },
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
          minHeight: "50px", // Default height, will adjust dynamically
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
  const theme = useTheme();
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
        p: 2,
        overflow: "auto",
      }}
    >
      <Grid size={12}>
        <Typography variant="h6" sx={{ pb: 1 }}>
          Complete registration
        </Typography>
        <Divider />
      </Grid>
      {/* Left Side: Stepper */}
      <Grid item size={2}>
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
      <Grid item size={10}>
        <Paper
          elevation={0}
          sx={{
            pb: 1,
            pt: 2,
            px: 2,
            backgroundColor: "inherit",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
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
                {activeStep === 0 && <PersonalDetails />}
                {activeStep === 1 && <OrganizationDetails />}
                {activeStep === 2 && <SubscriptionDetails />}
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
