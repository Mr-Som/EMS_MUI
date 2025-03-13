import * as React from 'react';
import {Button, Card, CardContent, CardHeader, Typography}from '@mui/material';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

export default function FlexGrid() {
  const [nbRows, setNbRows] = React.useState(3);
  const removeRow = () => setNbRows((x) => Math.max(0, x - 1));
  const addRow = () => setNbRows((x) => Math.min(100, x + 1));

  const { data, loading } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 10,
    maxColumns: 7,
  });

  return (
    <Card>
      <CardHeader
        title={
          <Typography gutterBottom variant="h6" component="h6">
            Alarts
          </Typography>
        }
        sx={{ paddingX: 3, paddingTop: 2, paddingBottom: 0 }}
      />
      <CardContent sx={{ padding: 1, '&:last-child': { paddingBottom: 1 }, height: { xs: '200px', sm: '250px', md: '350px' } }}>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Button size="small" onClick={removeRow}>
            Remove a row
          </Button>
          <Button size="small" onClick={addRow}>
            Add a row
          </Button>
        </Stack>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <DataGrid {...data} rows={data.rows.slice(0, nbRows)} loading={loading} />
        </div>
      </CardContent>
    </Card>
  );
}
