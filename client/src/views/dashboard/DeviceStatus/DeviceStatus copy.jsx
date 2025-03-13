import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Optional: For type checking
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { ResponsivePie } from '@nivo/pie';

const DeviceStatus = ({ data }) => {
  const [legendData, setLegendData] = useState([]);

  // Calculate total value for percentage calculation
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <CardHeader
        title={
          <Typography gutterBottom variant="h6" component="h6">
            Devices Status
          </Typography>
        }
        sx={{ paddingX: 3, paddingTop: 2, paddingBottom: 0 }}
      />
      <CardContent sx={{ padding: 1, '&:last-child': { paddingBottom: 1 }, height: { xs: '200px', sm: '250px', md: '350px' } }}>
        <Grid container spacing={2}> {/* Grid container */}
          <Grid size={6}> {/* Grid item for pie chart */}
            <div style={{ height: '300px' }}> {/* Set a fixed height for the pie chart */}
              <ResponsivePie
                data={data} // Use the `data` prop
                margin={{ top: 0, right: 10, bottom: 0, left: 10 }}
                innerRadius={0.6}
                activeOuterRadiusOffset={8}
                colors={['#009688', '#ffc107', '#93a6af']}
                borderWidth={1}
                borderColor={{
                  from: 'color',
                  modifiers: [['darker', 0.2]],
                }}
                enableArcLinkLabels={false}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                  from: 'color',
                  modifiers: [['darker', 2]],
                }}
                tooltip={({ datum }) => (
                  <div
                    style={{
                      padding: '12px',
                      color: '#ffffff',
                      background: '#333333',
                      borderRadius: '4px',
                      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16)',
                    }}
                  >
                    <span>{datum.id}</span>
                    <br />
                    <strong>{datum.value}</strong>
                  </div>
                )}
                legends={[]} // Disable default legends
                forwardLegendData={setLegendData} // Capture computed legend data
              />
            </div>
          </Grid>
          <Grid size={6}> {/* Grid item for custom legend */}
            <div style={{ padding: '16px' }}>
              <Typography variant="subtitle1" gutterBottom>
                Custom Legend
              </Typography>
              {legendData.map((item) => {
                const percentage = ((item.value / totalValue) * 100).toFixed(2);
                return (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: item.color,
                        marginRight: '8px',
                      }}
                    />
                    <Typography variant="body2">
                      {item.id}: {item.value} ({percentage}%)
                    </Typography>
                  </div>
                );
              })}
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

// Optional: Add PropTypes for type checking
DeviceStatus.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default DeviceStatus;