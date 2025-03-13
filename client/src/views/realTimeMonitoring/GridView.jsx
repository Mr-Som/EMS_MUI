import React from "react";

import {
  useTheme,
  Paper,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Typography,
  Stack,
  Divider,
} from "@mui/material";

// MUI ICONS
import {
  SignalCellular4Bar as SignalCellular4BarIcon,
  SignalCellular0Bar as SignalCellular0BarIcon,
  SignalCellularOff as SignalCellularOffIcon,
  Settings as SettingsIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  Map as MapIcon,
  DeleteForever as DeleteForeverIcon,
} from "@mui/icons-material";

export default function GridView() {
  const theme = useTheme();
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        gutterBottom
        variant="h6"
        sx={{ fontWeight: "bold", color: "text.secondary" }}
      >
        3 Phase Devices
      </Typography>
      <Stack direction="row" spacing={2}>
        <Card sx={{ minWidth: 345, maxWidth: 400 }}>
          <CardContent sx={{ padding: 1 }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography gutterBottom variant="subtitle1" component="div">
                LT Pannel
              </Typography>
              <Stack direction="row" spacing={0} sx={{ alignItems: "center" }}>
                <IconButton size="small">
                  <SignalCellular4BarIcon
                    fontSize="small"
                    sx={{ color: theme.palette.primary.main }}
                  />
                </IconButton>
                <IconButton size="small">
                  <SettingsIcon sx={{ color: theme.palette.primary.main }} />
                </IconButton>
              </Stack>
            </Box>
            <Stack direction="column" spacing={1}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Device Id : #13848
              </Typography>

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Device Type : Energy Meter
              </Typography>

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Device Location : Kolkta
              </Typography>
            </Stack>
          </CardContent>

          <Divider />
          <CardActions
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack direction="row" spacing={0} sx={{ alignItems: "center" }}>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Last Seen:
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                2 hours ago
              </Typography>
            </Stack>
            <Button variant="outlined" size="small">
              Details
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ minWidth: 345, maxWidth: 400 }}>
          <CardContent sx={{ padding: 1 }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography gutterBottom variant="subtitle1" component="div">
                LT Pannel
              </Typography>
              <Stack direction="row" spacing={0} sx={{ alignItems: "center" }}>
                <IconButton size="small">
                  <SignalCellular0BarIcon
                    fontSize="small"
                    sx={{ color: theme.palette.primary.main }}
                  />
                </IconButton>
                <IconButton size="small">
                  <SettingsOutlinedIcon
                    sx={{ color: theme.palette.primary.main }}
                  />
                </IconButton>
              </Stack>
            </Box>
            <Stack direction="column" spacing={1}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Device Id : #13848
              </Typography>

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Device Type : Energy Meter
              </Typography>

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Device Location : Kolkta
              </Typography>
            </Stack>
          </CardContent>

          <Divider />
          <CardActions
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack direction="row" spacing={0} sx={{ alignItems: "center" }}>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Last Seen:
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                2 hours ago
              </Typography>
            </Stack>
            <Button variant="outlined" size="small">
              Details
            </Button>
          </CardActions>
        </Card>
      </Stack>
    </Box>
  );
}
