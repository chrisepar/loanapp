import { useEffect, useState } from "react";
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

import StatusField from "./components/status_field";

const LoansForm = (props) => {
    const { propLoanID, openForm, actionType, handleClose, handleRefreshList, setAlertData } = props;

    const [loanDetails, setLoanDetails] = useState({ applicant_name: "", loaned_amount: "", status_id: "" });

    useEffect(() => {
        if (propLoanID && openForm && actionType === "U") {
            fetch(`/api/loans/${propLoanID}`, { method: "GET" })
                .then(res => res.json())
                .then(data => {
                    setLoanDetails({
                        ...loanDetails,
                        applicant_name: data[0].applicant_name,
                        loaned_amount: data[0].loaned_amount,
                        status_id: data[0].status_id
                    });
                });
        } else if (openForm && actionType === "CR") {
            setLoanDetails({
                ...loanDetails,
                applicant_name: "", loaned_amount: "", status_id: ""
            });
        }
    }, [propLoanID, openForm, actionType]);

    const handleChange = (value, field) => {
        setLoanDetails({
            ...loanDetails,
            [field]: value
        });
    };

    const handleSave = () => {
        switch (actionType) {
            case "CR":
                fetch("/api/loans", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(loanDetails) })
                    .then(res => {
                        if (res.ok) {
                            return res.json();
                        }
                        throw res.statusText;
                    })
                    .then(data => {
                        handleRefreshList();
                        handleClose();
                        setAlertData({ type: "success", message: `Loan Created Successfully!` });
                    }).catch((error) => {
                        setAlertData({ type: "error", message: `${error} - Something went wrong.` });
                    });
                break;
            case "U":
                fetch(`/api/loans/${propLoanID}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(loanDetails) })
                    .then(res => {
                        if (res.ok) {
                            return res.json();
                        }
                        throw res.statusText;
                    })
                    .then(data => {
                        handleRefreshList();
                        handleClose();
                        setAlertData({ type: "success", message: `Loan Updated Successfully!` });
                    }).catch((error) => {
                        setAlertData({ type: "error", message: `${error} - Something went wrong.` });
                    });
                break;
            default: break;
        }
    };

    const renderTitle = () => {
        switch (actionType) {
            case "CR":
                return (<DialogTitle>New Loan</DialogTitle>);
            case "U":
                return (<DialogTitle>Update Loan</DialogTitle>);
            default:
                return (<DialogTitle>Loan Form</DialogTitle>);
        }
    };

    return (
        <Dialog open={openForm} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="xl" >
            {renderTitle()}
            <DialogContent>
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                    noValidate
                    autoComplete="off"
                >
                    {(actionType === "U") &&
                        <TextField
                            disabled
                            id="loan_id"
                            label="Loan ID"
                            defaultValue={propLoanID}
                        />
                    }
                    <TextField
                        required
                        id="applicant_name"
                        label="Applicant Name"
                        placeholder="John Doe"
                        onChange={(event) => handleChange(event.target.value, "applicant_name")}
                        value={loanDetails.applicant_name}
                    />
                    <TextField
                        required
                        id="loaned_amount"
                        label="Loaned Amount"
                        placeholder="1000"
                        type="number"
                        slotProps={{
                            input: {
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            },
                        }}
                        onChange={(event) => handleChange(event.target.value, "loaned_amount")}
                        value={loanDetails.loaned_amount}
                    />
                    <StatusField loanDetails={loanDetails} handleChange={handleChange} />
                </Box>
                <Button variant="contained" onClick={() => handleSave()}>Save</Button>
            </DialogContent>
        </Dialog>
    );
}

export default LoansForm;
