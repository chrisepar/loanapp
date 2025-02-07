import { useEffect, useState } from "react";
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

const DeleteDialog = (props) => {

    const { selectedRow, actionType, setRefreshList, setActionType, setAlertData } = props;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (actionType === "D") {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [actionType]);

    const handleClose = () => {
        setActionType("");
    };
    const handleDelete = () => {
        fetch(`/api/loans/${selectedRow}`, { method: "DELETE" })
            .then(res => res.json())
            .then(data => {
                setRefreshList(true);
                setActionType("");
                setAlertData({ type: "success", message: `Loan Deleted Successfully!` });
            });
    };
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="xl" >
            <DialogTitle id="alert-dialog-title">
                Delete Loan
            </DialogTitle>
            <DialogContent>Are you use you want to delete the loan?</DialogContent>
            <DialogActions>
                <Button onClick={handleDelete}>Yes</Button>
                <Button onClick={handleClose} >
                    No
                </Button>
            </DialogActions>
        </Dialog >
    );
};

export default DeleteDialog;