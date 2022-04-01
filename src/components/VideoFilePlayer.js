import React from "react"
import { Box } from '@mui/system';
import ReactPlayer from 'react-player'

class VideoFilePlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            secondsPlayed: 0,
            duration: -1
        }

        this.handlePlaying = this.handlePlaying.bind(this);
        this.handleDuration = this.handleDuration.bind(this);
        // this.parentGetResolution = this.parentGetResolution.bind(this);
    }

    handlePlaying = (e) => {
        this.setState({ secondsPlayed: parseFloat(e.playedSeconds) })
        this.props.updateStartOrEndTime(e);
    }

    handleDuration = (duration) => {
        this.setState({ duration: duration })
    }

    parentGetVideoLength = () => {
        return this.state.duration;
    }

    render() {
        return (
            <Box alignItems={"center"} display="flex" >
                <ReactPlayer
                    controls
                    volume={.25}
                    // muted
                    progressInterval={500}
                    onProgress={this.handlePlaying}
                    onSeek={this.handlePlaying}
                    onReady={this.handlePlaying}
                    onDuration={this.handleDuration}
                    url={this.props.fileURL}
                    width="100%"
                    height="630px"
                    style={{ selfAlign: "center" }}
                />
            </Box>
        );
    }
}

export default VideoFilePlayer;