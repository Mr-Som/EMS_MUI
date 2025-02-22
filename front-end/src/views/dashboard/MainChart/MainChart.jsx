import * as React from 'react';
import PropTypes from 'prop-types'; // Optional: For type checking
import { Card, CardContent, CardHeader, Typography, Box } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';

const MainChart = ({ data }) => {
  return (
    <Card elevation={0} sx={{ backgroundColor:'inherit'}}>
      <CardHeader
        title={
          <Typography gutterBottom variant="h6" component="h6">
            Line Chart
          </Typography>
        }
        sx={{ paddingX: 3, paddingTop: 2, paddingBottom: 0 }}
      />
      <CardContent sx={{ padding: 1, '&:last-child': { paddingBottom: 1 }, height: { xs: '200px', sm: '250px', md: '350px' } }}>
        <Box sx={{ height: { xs: '200px', sm: '250px', md: '300px' } }}>
          <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: false, 
              reverse: false,
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Time',
              legendOffset: 36,
              legendPosition: 'middle',
              truncateTickAt: 0,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Voltage (Volt)',
              legendOffset: -40,
              legendPosition: 'middle',
              truncateTickAt: 0,
            }}
            pointSize={0}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="data.yFormatted"
            pointLabelYOffset={-12}
            enableTouchCrosshair={true}
            useMesh={true}
            curve="monotoneX" // Add smooth curves
            legends={[
              {
                anchor: 'top', // Move legend to the bottom
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: -40, // Adjust Y position
                itemsSpacing: 20, // Add spacing between legend items
                itemDirection: 'right-to-left', //
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

// PropTypes for type checking
MainChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default MainChart;