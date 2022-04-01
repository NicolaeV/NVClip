import React from "react"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/system';

class FPS extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fps: -1
        }

        this.handleChange = this.handleChange.bind(this);
        this.parentGetFps = this.parentGetFps.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            fps: event.target.value
        });
    }

    parentGetFps() {
        return this.state.fps;
    }

    render() {
        return (
            <Box display="flex" pt={2}>
                <Box display="flex" alignItems="center" sx={{ minWidth: 80 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">FPS</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="FPS"
                            value={this.state.fps}
                            onChange={this.handleChange}
                        >
                            <MenuItem value={-1}>Original</MenuItem>
                            <MenuItem value={60}>60</MenuItem>
                            <MenuItem value={48}>48</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                            <MenuItem value={24}>24</MenuItem>
                            <MenuItem value={18}>18</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        );
    }
}

export default FPS;