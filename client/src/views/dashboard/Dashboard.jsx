import * as React from 'react';
import { styled } from '@mui/material/styles';

import { Paper, Box, Card, CardContent, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';

// Components
import MainChart from './MainChart/MainChart';
import MyTable from './MyTable';
import DeviceStatus from './DeviceStatus/DeviceStatus';
import EnergyStatistics from './EnergyStatistics';
import pieChartData from './DeviceStatus/DataDeviceStatus';
import DataMainChart from './MainChart/DataMainChart';
import BudgetActualChart from './BudgetActual/BudgetActualChart';
import DataBudgetActualChart from './BudgetActual/DataBudgetActualChart';
import Project from './Project';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const AppContent = () => {
  return (
    <Box sx={{ width: '100%', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 1, }} >
          <Grid container spacing={2}>
            <Grid size={3}>
              <EnergyStatistics />
            </Grid>
            <Grid size={6}>
              <MainChart data={DataMainChart} />
            </Grid>
            <Grid size={3}>
              <Project />
            </Grid>
            <Grid size={3}>
              <BudgetActualChart data={DataBudgetActualChart} />
            </Grid>
            <Grid size={6}>
              <MyTable />
            </Grid>
            <Grid size={3}>
              <DeviceStatus data={pieChartData} />
            </Grid>
          </Grid>
    </Box>
  );
};

export default AppContent;
