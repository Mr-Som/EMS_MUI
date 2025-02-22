import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ResponsivePie } from "@nivo/pie";

const DeviceStatus = ({ data }) => {
  const theme = useTheme();
  const [legendData, setLegendData] = useState([]);
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  useEffect(() => {
    const legend = data.map((item) => ({
      id: item.id,
      label: item.label || item.id,
      value: item.value,
      color: item.color || getColorForId(item.id),
    }));
    setLegendData(legend);
  }, [data]);

  const getColorForId = (id) => {
    const colorMap = {
      Online: theme.palette.primary.main,
      Offline: theme.palette.error.dark,
      Error: theme.palette.warning.light,
    };
    return colorMap[id] || "#03ada8";
  };

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
      <CardContent
        sx={{
          padding: 1,
          "&:last-child": { paddingBottom: 1 },
          height: { xs: "200px", sm: "250px", md: "350px" },
        }}
      >
        <Grid container spacing={2}>
          {" "}
          {/* Grid container */}
          <Grid size={7}>
            {" "}
            {/* Grid item for pie chart */}
            <div style={{ height: "300px" }}>
              {" "}
              {/* Set a fixed height for the pie chart */}
              <ResponsivePie
                data={data}
                margin={{ top: 0, right: 10, bottom: 0, left: 10 }}
                innerRadius={0.6}
                activeOuterRadiusOffset={8}
                colors={[
                  theme.palette.primary.main,
                  theme.palette.error.dark,
                  theme.palette.warning.light,
                ]}
                borderWidth={1}
                borderColor={{
                  from: "color",
                  modifiers: [["darker", 0.2]],
                }}
                enableArcLinkLabels={false}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                  from: "color",
                  modifiers: [["darker", 2]],
                }}
                tooltip={({ datum }) => (
                  <div
                    style={{
                      padding: "12px",
                      color: "#ffffff",
                      background: "#333333",
                      borderRadius: "4px",
                      boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
                    }}
                  >
                    <span>{datum.id}</span>
                    <br />
                    <strong>{datum.value}</strong>
                  </div>
                )}
                legends={[]}
              />
            </div>
          </Grid>
          <Grid
            size={5}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {" "}
            {/* Grid item for custom legend */}
            <div style={{ textAlign: "center" }}>
              {legendData.map((item) => {
                const percentage = ((item.value / totalValue) * 100).toFixed(2);
                return (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                      marginBottom: 20,
                    }}
                  >
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        backgroundColor: item.color,
                        marginRight: "8px",
                      }}
                    />
                    <Typography variant="body2">
                      {item.id}: {item.value} <br /> {percentage}%
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
