import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const StatusField = (props) => {

    const { loanDetails, handleChange } = props;

    const [hasLoaded, setHasLoaded] = useState(false);
    const [statusList, setStatusList] = useState([]);

    useEffect(() => {
        if (!hasLoaded) {
            fetch("/api/loans/status", { method: "GET" })
                .then(res => res.json())
                .then(data => {
                    setStatusList(data);
                    setHasLoaded(true);
                });
        }
    }, []);

    return (
        <>
            {hasLoaded &&
                <TextField
                    id="status_id"
                    select
                    label="Status"
                    onChange={(event) => handleChange(event.target.value, "status_id")}
                    value={loanDetails.status_id}
                    defaultValue={loanDetails.status_id}
                >
                    {statusList.map((item) => {
                        return (
                            <MenuItem key={item.status_id} value={item.status_id}>
                                {item.status_description}
                            </MenuItem>
                        );
                    })}
                </TextField>
            }
        </>
    );
};

export default StatusField;