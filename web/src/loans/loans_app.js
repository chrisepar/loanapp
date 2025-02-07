import { useEffect, useState } from "react";

import Grid from '@mui/material/Grid2';
import { DataGrid } from "@mui/x-data-grid";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import LoansForm from "./loans_form";
import DeleteDialog from "./components/delete_dialog";
import LoansSummary from "./loans_summary";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const columns = [
  { field: 'id', headerName: 'Loan ID', width: 300 },
  { field: 'applicant_name', headerName: 'Name', width: 250 },
  { field: 'loaned_amount', headerName: 'Loaned', width: 130 },
  { field: 'status_description', headerName: 'Status', width: 130 }
];

const paginationModel = { page: 0, pageSize: 10 };

const Loans = () => {

  const [rows, setRows] = useState([]);
  const [summaryLoans, setSummaryLoans] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [refrestList, setRefreshList] = useState(true);
  const [selectedRow, setSelectedRow] = useState([]);
  const [actionType, setActionType] = useState("");

  const [alertData, setAlertData] = useState({ type: "", message: "" });

  const handleClickOpen = (actionType) => {
    setOpenForm(true);
    setActionType(actionType);
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  const handleRefreshList = () => setRefreshList(true);

  const handleDeleteBtn = () => {
    setActionType("D");
  };

  useEffect(() => {
    if (refrestList) {
      const getAllLoans = fetch("/api/loans", { method: "GET" })
        .then(res => res.json())
        .then(data => {
          setRows(data);
        });
      const getSummaryLoans = fetch("/api/loans/summary", { method: "GET" })
        .then(res => res.json())
        .then(data => {
          setSummaryLoans(data);
        });

      Promise.all([getAllLoans, getSummaryLoans])
        .then(([loanData, summaryLoansData]) => {
          setRefreshList(false);
        });
    }
  }, [refrestList]);

  const alertDialog = () => {
    return (
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={(alertData.type !== "")} autoHideDuration={6000} onClose={() => {
        setAlertData({ type: "", message: "" });
      }}>
        <Alert severity={alertData.type}>{alertData.message}</Alert>
      </Snackbar>
    );
  };


  return (
    <Grid container spacing={2}>
      {alertDialog()}
      <Button variant="contained" onClick={() => handleClickOpen("CR")}>New Loan</Button>
      <Button variant="contained" color="warning" onClick={() => handleClickOpen("U")} disabled={(selectedRow.length === 0)}>Update Loan</Button>
      <Button variant="contained" color="error" onClick={() => handleDeleteBtn()} disabled={(selectedRow.length === 0)}>Delete Loan</Button>
      <LoansSummary summaryLoans={summaryLoans}/>
      <DeleteDialog selectedRow={selectedRow} actionType={actionType} setActionType={setActionType} setRefreshList={setRefreshList} setAlertData={setAlertData} />
      <LoansForm propLoanID={selectedRow} actionType={actionType} openForm={openForm} handleClose={handleClose} handleRefreshList={handleRefreshList} setAlertData={setAlertData} />
      <Paper sx={{ width: '100%' }}>
        <DataGrid
          onRowSelectionModelChange={(newSelectedRow) => {
            setSelectedRow(newSelectedRow);
          }}
          rowSelectionModel={selectedRow}
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10]}
          sx={{ border: 0 }}
        />
      </Paper>
    </Grid>
  );
}

export default Loans;
