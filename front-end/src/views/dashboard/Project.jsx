import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Stack,
  ListItem,
} from '@mui/material';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import Co2Icon from '@mui/icons-material/Co2';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

export default function EnergyStatistics() {
  return (
      <Card>
        <CardHeader
          title={
            <Typography gutterBottom variant="h6" component="h6">
              Project
            </Typography>
          }
          sx={{ paddingX: 3, paddingTop: 2, paddingBottom: 0, }} 
        />
        <CardContent sx={{ padding: 1, '&:last-child': { paddingBottom: 1 }, height: { xs: '200px', sm: '250px', md: '350px' } }}>
          <ListItem divider sx={{ padding: 1,}}>
            <ListItemButton>
              <ListItemText
                primary={<Typography variant="subtitle1">Avg Voltage</Typography>}
                secondary="243"
              />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                    <ListItemAvatar>
                        <Avatar sx={{ color: 'success.light', bgcolor: 'transparent' }}>
                          <ThumbUpAltIcon sx={{ fontSize: "2.5rem" }} />
                        </Avatar>
                    </ListItemAvatar>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
          <ListItem divider sx={{ padding: 1,}}>
            <ListItemButton>
              <ListItemText
                primary={<Typography variant="subtitle1">Current</Typography>}
                secondary="1.38"
              />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                    <ListItemAvatar>
                        <Avatar sx={{ color: 'warning.light', bgcolor: 'transparent' }}>
                          <ThumbDownAltIcon sx={{ fontSize: "2.5rem" }} />
                        </Avatar>
                    </ListItemAvatar>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ padding: 1,}}>
            <ListItemButton>
              <ListItemText
                primary={<Typography variant="subtitle1">PF Avg</Typography>}
                secondary="0.78"
              />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                    <ListItemAvatar>
                        <Avatar sx={{ color: 'error.light', bgcolor: 'transparent' }}>
                          <ThumbDownAltIcon sx={{ fontSize: "2.5rem" }} />
                        </Avatar>
                    </ListItemAvatar>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
        </CardContent>
      </Card>
  );
}