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

export default function EnergyStatistics() {
  return (
      <Card>
        <CardHeader
          title={
            <Typography gutterBottom variant="h6" component="h6">
              Energy statistics today
            </Typography>
          }
          sx={{ paddingX: 3, paddingTop: 2, paddingBottom: 0, }} 
        />
        <CardContent sx={{ padding: 1, '&:last-child': { paddingBottom: 1 }, height: { xs: '200px', sm: '250px', md: '350px' } }}>
          <ListItem divider sx={{ padding: 1,}}>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar sx={{ color: 'success.light', bgcolor: 'transparent' }}>
                  <ElectricBoltIcon sx={{ fontSize: "2.5rem" }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="subtitle1">Energy Consumption</Typography>}
                secondary="Today, 2:00 AM"
              />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    1,430
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    78%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
          <ListItem divider sx={{ padding: 1,}}>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar sx={{ color: 'warning.light', bgcolor: 'transparent', }}>
                <Co2Icon sx={{ fontSize: '2.5rem'}}/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="subtitle1">Carbon Emission</Typography>}
                secondary="Today, 2:00 AM"
              />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    896
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    80%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ padding: 1,}}>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar sx={{ color: 'primary.light', bgcolor: 'transparent', }}>
                <CurrencyRupeeIcon sx={{ fontSize: '2.5rem'}}/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="subtitle1">Energy Cost</Typography>}
                secondary="Today, 2:00 AM"
              />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    65892
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    57.9%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
        </CardContent>
      </Card>
  );
}