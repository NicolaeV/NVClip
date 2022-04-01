import * as React from 'react';
import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';
import TimeStamp from './TimeStamp';

class StartEndTimeStamp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startTimeBound: false,
            endTimeBound: false
        };

        this.startTimeRef = React.createRef();
        this.endTimeRef = React.createRef();

        this.parentSetStartTime = this.parentSetStartTime.bind(this);
        this.parentSetEndTime = this.parentSetEndTime.bind(this);

        this.timeStampObjToSeconds = this.timeStampObjToSeconds.bind(this);

        this.bindStartTime = this.bindStartTime.bind(this);
        this.bindEndTime = this.bindEndTime.bind(this);
    }

    parentSetStartTime(seconds) {
        this.startTimeRef.current.parentSetStateBySeconds(seconds);
    }

    parentSetEndTime(seconds) {
        this.endTimeRef.current.parentSetStateBySeconds(seconds);
    }

    parentGetStartTimeObj() {
        return this.startTimeRef.current.parentGetTimeStampObj();
    }

    parentGetEndTimeObj() {
        return this.endTimeRef.current.parentGetTimeStampObj();
    }

    timeStampObjToSeconds = (obj) => {
        return (obj.hour * 3600) + (obj.minute * 60) + (obj.second)
    }

    unBind = () => {
        this.setState({
            ...this.state,
            startTimeBound: false,
            endTimeBound: false
        });
    }

    bindStartTime = () => {
        if (this.state.startTimeBound) {
            this.setState({
                ...this.state,
                startTimeBound: false,
                endTimeBound: false
            });
        }
        else {
            this.setState({
                ...this.state,
                startTimeBound: true,
                endTimeBound: false
            }, () => { this.props.updateStartOrEndTime({ playedSeconds: this.props.getSecondsFromPlayer() }) });
        }
    }

    bindEndTime = () => {
        if (this.state.endTimeBound) {
            this.setState({
                ...this.state,
                startTimeBound: false,
                endTimeBound: false
            });
        }
        else {
            this.setState({
                ...this.state,
                startTimeBound: false,
                endTimeBound: true
            }, () => { this.props.updateStartOrEndTime({ playedSeconds: this.props.getSecondsFromPlayer() }) });
        }
    }

    render() {
        return (
            <React.Fragment>
                <Grid item xs={12} md={5} lg={4}>
                    <Box display="flex" pt={2}>
                        <Box display="flex" alignItems="center">
                            <TimeStamp label="Start:" ref={this.startTimeRef} />
                            <Button variant={this.state.startTimeBound ? "contained" : "outlined"} onClick={this.bindStartTime} style={{ height: "100%", padding: "0" }}>Sync To<br />Player</Button>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} md={5} lg={4} >
                    <Box display="flex" pt={2}>
                        <Box display="flex" alignItems="center">
                            <TimeStamp label="End:" ref={this.endTimeRef} />
                            <Button variant={this.state.endTimeBound ? "contained" : "outlined"} onClick={this.bindEndTime} style={{ height: "100%", padding: "0" }}>Sync To<br />Player</Button>
                        </Box>
                    </Box>
                </Grid>
            </React.Fragment>
        );
    }
}

export default StartEndTimeStamp;