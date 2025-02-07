import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const LoansSummary = (props) => {

    const { summaryLoans } = props;

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>Number of loans per status</TableCell>
                        <TableCell>Total loaned amount per status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {summaryLoans.map((row) => (
                        <TableRow
                            key={row.status_description}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{row.status_description}</TableCell>
                            <TableCell>{row.number_of_loans_per_status}</TableCell>
                            <TableCell>{row.total_loaned_amount_per_status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LoansSummary;