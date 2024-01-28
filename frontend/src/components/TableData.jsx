import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ContentForm from "./ContentForm";
import axios from "axios";
import useStyles from "./PageStyles";
import { columns } from "./constants";


const TableData = () => {
  const pages = [5, 10, 15];
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [data, setData] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [open, setOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [searched, setSearched] = useState("");

  useEffect(() => {
    getApiData();
  }, [isDeleted, isNew]);

  const getApiData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/content");
      setRows(res.data);
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const classes = useStyles();

  const requestSearch = (e) => {
    var val = e.target.value;
    const filteredRows = data.filter((row) => {
      return row.title.toLowerCase().includes(val.toLowerCase());
    });
    setRows(filteredRows);
    setRowsPerPage(filteredRows.length);
    setPage(0);
    setSearched(val);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClick = () => {
    setOpen(true);
  };
  // const handleEditClick = (data) => {
  //   setOpen(true);
  //   setEditData(data);
  // };
  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/content?id=${id}`);
      setIsDeleted(!isDeleted);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <TableContainer component={Paper} square>
      <Box className={classes.boxStyles}>
        <TextField
          variant="outlined"
          label="Search title"
          value={searched}
          onChange={requestSearch}
          sx={{ m: 2, width: "75%" }}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="outlined" onClick={handleClick}>
          Add
        </Button>
      </Box>
      {rows.length < 1 ? (
        <Box sx={{ textAlign: "center", paddingBottom: "20px" }}>
          <Typography variant="h6" className={classes.headerStyles}>
            No Data to display
          </Typography>
          <Typography variant="subtitle2">
            You Can Upload Content by Clicking ADD Button{" "}
          </Typography>
        </Box>
      ) : (
        <>
          <Table aria-label="simple table">
            <TableHead sx={{ background: "#3c44b126" }}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell sx={{ color: "#333996" }}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    <a
                      href={`http://localhost:8000/files/${row.file}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {row.file}
                    </a>
                  </TableCell>
                  <TableCell>{row.authorName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    {new Date(row.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {/* <EditNoteIcon
                      fontSize="small"
                      sx={{ backgroundColor: "#3c44b126", color: "#333996" }}
                      onClick={()=>{handleEditClick(row)}}
                    /> */}
                    <DeleteIcon
                      fontSize="small"
                      className={classes.deleteIconStyles}
                      onClick={() => {
                        handleDeleteClick(row["_id"]);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            page={page}
            rowsPerPageOptions={pages}
            rowsPerPage={rowsPerPage}
            count={rows.length}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
        <ContentForm
          open={open}
          setOpen={setOpen}
          setIsNew={setIsNew}
          isNew={isNew}
        />
    </TableContainer>
  );
};

export default TableData;
