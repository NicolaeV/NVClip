import * as React from 'react';
import NumberFormat from 'react-number-format';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';

class TimeStamp extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hour: 0, minute: 0, second: 0 };

        this.secondsToTimeStampObj = this.secondsToTimeStampObj.bind(this);

        this.parentGetTimeStampObj = this.parentGetTimeStampObj.bind(this);
        this.parentSetStateBySeconds = this.parentSetStateBySeconds.bind(this);

        this.updateStateByElementName = this.updateStateByElementName.bind(this);
    }
    
    secondsToTimeStampObj = (time) => {
        let result = {
            hour: null,
            minute: null,
            second: null
        };

        time = parseInt(time, 10);
        result.hour = Math.floor(time / 3600);
        time = time - Math.floor(result.hour * 3600);
        result.minute = Math.floor(time / 60);

        result.second = Math.floor(time - (result.minute * 60));

        return result
    }

    parentGetTimeStampObj = () => {
        return {
            hour: this.state.hour,
            minute: this.state.minute,
            second: this.state.second
        };
    }

    parentSetStateBySeconds = (seconds) => {
        this.setState(this.secondsToTimeStampObj(seconds));
    }

    updateStateByElementName = (e) => {
        this.setState({
            [e.target.name]: parseInt(e.target.value, 10)
        });
    }

    render() {
        return (
            <Box display="flex" alignItems="center" onChange={this.updateStateByElementName}>
                <Box>
                    <Typography pr={1} >{this.props.label}</Typography>
                </Box>
                <NumberFormat
                    label="HH"
                    value={this.state.hour}
                    style={{ width: "3.5em", marginRight: ".5em", textAlign: "center" }}
                    customInput={TextField}
                    name="hour"
                    format="##"
                    isAllowed={(values) => {
                        const { formattedValue, floatValue } = values;
                        return formattedValue === "" || floatValue <= 99;
                    }}
                />
                <NumberFormat
                    label="MM"
                    value={this.state.minute}
                    style={{ width: "3.5em", marginRight: ".5em" }}
                    customInput={TextField}
                    name="minute"
                    format="##"
                    isAllowed={(values) => {
                        const { formattedValue, floatValue } = values;
                        return formattedValue === "" || floatValue <= 60;
                    }}
                />
                <NumberFormat
                    label="SS"
                    value={this.state.second}
                    style={{ width: "3.5em", marginRight: ".5em" }}
                    customInput={TextField}
                    name="second"
                    format="##"
                    isAllowed={(values) => {
                        const { formattedValue, floatValue } = values;
                        return formattedValue === "" || floatValue <= 60;
                    }}
                />
            </Box>

        );
    }
}

export default TimeStamp;