import React from "react"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/system';

class Resolution extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            resolution: -1
        }

        this.handleChange = this.handleChange.bind(this);
        this.parentGetResolution = this.parentGetResolution.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            resolution: event.target.value
        });
    }

    parentGetResolution() {
        return this.state.resolution;
    }

    render() {
        return (
            <Box display="flex" pt={2}>
                <Box display="flex" alignItems="center" sx={{ minWidth: 102 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Resolution</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Resolution"
                            value={this.state.resolution}
                            onChange={this.handleChange}
                        >
                            <MenuItem value={-1}>Original</MenuItem>
                            <MenuItem value={936}>936p</MenuItem>
                            <MenuItem value={720}>720p</MenuItem>
                            <MenuItem value={576}>576p</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        );
    }
}

export default Resolution;