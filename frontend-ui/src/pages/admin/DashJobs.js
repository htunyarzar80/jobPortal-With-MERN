import React, { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { jobLoadAction } from "../../redux/actions/jobAction";

import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import Meta from "../Meta";

const DashJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(jobLoadAction());
  }, []);

  const { jobs, loading } = useSelector((state) => state.loadJobs);

  let data = [];
  data = jobs !== undefined && jobs.length > 0 ? jobs : [];

  console.log(data);
  //delete job by Id
  const deleteJobById = (e, id) => {
    console.log(id);
  };

  const columns = [
    
    {
      field: "title",
      headerName: "Title",
      width: 150,
    },
    {
      field: "jobType",
      headerName: "Category",
      width: 150,
      valueGetter: (data) => data.row.jobType?.jobTypeName,
    },
    {
      field: "company",
      headerName: "Company ",
      width: 150,
      valueGetter: (data) => data.row.company?.companyName,
    },
    {
      field: "user",
      headerName: "User",
      width: 150,
      valueGetter: (data) => data.row.user._id,
    },
    {
      field: "available",
      headerName: "available",
      width: 150,
      renderCell: (values) => (values.row.available ? "Yes" : "No"),
    },

    {
      field: "salary",
      headerName: "Salary",
      type: Number,
      width: 150,
      renderCell: (values) => "$" + values.row.salary,
    },

    {
      field: "Actions",
      width: 200,
      renderCell: (values) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "170px",
          }}
        >
          <Button variant="contained">
            <Link
              style={{ color: "dark", textDecoration: "none" }}
              to={`/admin/job/edit/${values.row._id}`}
            >
              {<EditNoteRoundedIcon />}
            </Link>
          </Button>
          <Button
            onClick={(e) => deleteJobById(e, values.row._id)}
            variant="contained"
            color="error"
          >
            {<DeleteForeverRoundedIcon />}
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Meta title={"dash jobs"}/>
      <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
        Jobs list
      </Typography>
      <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
        <Button variant="contained" color="success" startIcon={<AddIcon />}>
          {" "}
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to="/admin/job/create"
          >
            Create Job
          </Link>
        </Button>
      </Box>
      <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            getRowId={(row) => row._id}
            sx={{
              "& .MuiTablePagination-displayedRows": {
                color: "white",
              },
              color: "white",
              [`& .${gridClasses.row}`]: {
                bgcolor: (theme) =>
                  // theme.palette.mode === 'light' ? grey[200] : grey[900],
                  theme.palette.secondary.main,
              },
              button: {
                color: "#ffffff",
              },
            }}
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default DashJobs;
