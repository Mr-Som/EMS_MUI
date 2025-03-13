import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import img from "../assets/2.png";

const AccessDenied = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        backgroundColor: "inherit",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          p: 4,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <Box
          component="img"
          src={img}
          sx={{
            maxWidth: { xs: 200, xl: 300 },
            height: "auto",
            mb: 4,
            mx: "auto",
          }}
          alt="Access Denied"
        />

        <Typography
          variant="h4"
          sx={{
            color: "primary.main",
            mb: 2,
            fontWeight: "bold",
          }}
        >
          Access Denied
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            mb: 4,
            fontSize: "1rem",
          }}
        >
          Your subscription doesn't include access to this content.
        </Typography>

        <Button
          size="small"
          variant="contained"
          color="primary"
          href="/"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 1,
            textTransform: "none",
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default AccessDenied;
