import React from "react"
import { Box } from '@mui/system';
import { Typography, CircularProgress } from "@mui/material";

class Status extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: ""
        }

        this.parentGetstatus = this.parentGetstatus.bind(this);
        this.parentSetStatus = this.parentSetStatus.bind(this);
    }

    parentGetstatus() {
        return this.state.status;
    }

    parentSetStatus(status) {
        if (typeof status == "number") {
            if (status > 1.0 || status < 0) { // cant be more than 100 or less than 0
                return
            }
            else {
                this.setState({
                    ...this.state,
                    status: (status * 100)
                });
            }
        }
        else {
            this.setState({
                ...this.state,
                status: status
            });
        }
    }

    render() {
        return (
            <Box display="flex" pt={2} alignItems={"center"}>
                {typeof this.state.status == "number" && <CircularProgress disableShrink />}
                {typeof this.state.status == "string" && <Typography>{this.state.status}</Typography>}
                {typeof this.state.status == "number" && <Typography>{this.state.status.toFixed(0)}</Typography>}
                {typeof this.state.status == "number" && <Typography>%</Typography>}
            </Box>
        );
    }
}

export default Status;