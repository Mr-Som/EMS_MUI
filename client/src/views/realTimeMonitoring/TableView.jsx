import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

function createData(id, name, time, v1, v2, v3, l1, l2, l3, qa, fq, kt) {
  return {
    id,
    name,
    time,
    v1,
    v2,
    v3,
    l1,
    l2,
    l3,
    qa,
    fq,
    kt,
  };
}

const rows = [
  createData(
    1,
    "LT Pannel",
    "06-03-2025 15:37:12",
    405,
    408,
    412,
    3.7,
    5,
    2.1,
    0.9,
    50,
    867
  ),
  createData(
    2,
    "Main Pannel",
    "06-03-2025 15:37:12",
    442,
    440,
    398,
    3.7,
    5,
    2.1,
    0.8,
    49.52,
    1200
  ),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Meters",
  },
  {
    id: "time",
    numeric: true,
    disablePadding: true,
    label: "Last Update",
  },
  {
    id: "v1",
    numeric: true,
    disablePadding: false,
    label: "Voltage (V1)",
  },
  {
    id: "v2",
    numeric: true,
    disablePadding: false,
    label: "Voltage (V2)",
  },
  {
    id: "v3",
    numeric: true,
    disablePadding: false,
    label: "Voltage (V3)",
  },
  {
    id: "l1",
    numeric: true,
    disablePadding: false,
    label: "Current (L1)",
  },
  {
    id: "l2",
    numeric: true,
    disablePadding: false,
    label: "Current (L2)",
  },
  {
    id: "l3",
    numeric: true,
    disablePadding: false,
    label: "Current (L3)",
  },
  {
    id: "qa",
    numeric: true,
    disablePadding: false,
    label: "Power Factor Avg.",
  },
  {
    id: "fq",
    numeric: true,
    disablePadding: false,
    label: "Frequency",
  },
  {
    id: "kt",
    numeric: true,
    disablePadding: false,
    label: "Total Active Power (KW)",
  },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            sortDirection={false}
          >
            {headCell.label}
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable() {
  const theme = useTheme();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () => rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper elevation={0} sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <StyledTableRow hover key={row.id}>
                    <StyledTableCell component="th" id={labelId} scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.time}</StyledTableCell>
                    <StyledTableCell align="center">{row.v1}</StyledTableCell>
                    <StyledTableCell align="center">{row.v2}</StyledTableCell>
                    <StyledTableCell align="center">{row.v3}</StyledTableCell>
                    <StyledTableCell align="center">{row.l1}</StyledTableCell>
                    <StyledTableCell align="center">{row.l2}</StyledTableCell>
                    <StyledTableCell align="center">{row.l3}</StyledTableCell>
                    <StyledTableCell align="center">{row.qa}</StyledTableCell>
                    <StyledTableCell align="center">{row.fq}</StyledTableCell>
                    <StyledTableCell align="center">{row.kt}</StyledTableCell>
                  </StyledTableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
