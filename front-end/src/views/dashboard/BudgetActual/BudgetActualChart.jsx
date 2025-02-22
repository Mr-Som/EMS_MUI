import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { ResponsiveBullet } from "@nivo/bullet";

const BudgetActualChart = ({ data }) => {
  const theme = useTheme();
  return (
    <Card>
      <CardHeader
        title={
          <Typography gutterBottom variant="h6" component="h6">
            Budget vs Actual
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
        <ResponsiveBullet
          data={data}
          margin={{ top: 20, right: 80, bottom: 50, left: 80 }}
          layout="vertical"
          axisPosition="before"
          titlePosition="after"
          titleOffsetY={10}
          spacing={100}
          rangeColors={[theme.palette.primary.main, theme.palette.error.light]}
        />
      </CardContent>
    </Card>
  );
};

// Optional: Add PropTypes for type checking
BudgetActualChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      ranges: PropTypes.arrayOf(PropTypes.number).isRequired,
      measures: PropTypes.arrayOf(PropTypes.number).isRequired,
      markers: PropTypes.arrayOf(PropTypes.number),
    })
  ).isRequired,
};

export default BudgetActualChart;
