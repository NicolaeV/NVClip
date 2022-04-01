import * as React from 'react';
import { Card } from '@mui/material';
import { CardContent, Grid, CardHeader, Button } from '@mui/material';
import { Box } from '@mui/system';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import StartEndTimeStamp from './StartEndTimeStamp';
import Resolution from './Resolution'
import Status from './Status'
import VideoFilePlayer from './VideoFilePlayer';
import FPS from './FPS';

const ClipMaker = (props) => {
    const updateStartOrEndTime = (e) => {
        if (e.playedSeconds) {
            const startTimeSeconds = timeStampObjToSeconds(startEndTimeStampRef.current.parentGetStartTimeObj());
            const endTimeSeconds = timeStampObjToSeconds(startEndTimeStampRef.current.parentGetEndTimeObj());

            if (startEndTimeStampRef.current.state.startTimeBound) {
                startEndTimeStampRef.current.parentSetStartTime(e.playedSeconds);

                // make sure end time is > start time
                if (e.playedSeconds > endTimeSeconds) {
                    startEndTimeStampRef.current.parentSetEndTime(e.playedSeconds + 1); // TODO bounds check
                }
            }
            else if (startEndTimeStampRef.current.state.endTimeBound) {
                startEndTimeStampRef.current.parentSetEndTime(e.playedSeconds);

                // make sure start time is < end time
                if (e.playedSeconds < startTimeSeconds) {
                    startEndTimeStampRef.current.parentSetStartTime(e.playedSeconds < 1 ? 0 : e.playedSeconds - 1);
                }
            }
        }
    }

    const timeStampObjToSeconds = (obj) => {
        return (obj.hour * 3600) + (obj.minute * 60) + (obj.second)
    }

    // https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down
    // useReducer instead of useRef eventually...
    const startEndTimeStampRef = React.useRef(null);
    const resolutionRef = React.useRef(null);
    const playerRef = React.useRef(null);
    const statusRef = React.useRef(null);
    const fpsRef = React.useRef(null);

    // const seekVideoTo = (seconds) => {
    //     playerRef.current.seekTo(seconds);
    // }

    const getSecondsFromPlayer = () => {
        return playerRef.current ? playerRef.current.state.secondsPlayed : 0
    }

    const timeStampObjToCli = (tso) => {
        return tso.hour.toString().padStart(2, '0') + ":" + tso.minute.toString().padStart(2, '0') + ":" + tso.second.toString().padStart(2, '0')
    }

    const createClip = async () => {
        const userFile = props.fileList[props.fileList.length - 1];
        if (!userFile) {
            alert("No current file.");
            return
        }
        // unbind 
        startEndTimeStampRef.current.unBind();
        let clipLength = timeStampObjToSeconds(startEndTimeStampRef.current.parentGetEndTimeObj()) - timeStampObjToSeconds(startEndTimeStampRef.current.parentGetStartTimeObj());
        let totalClipFrames = -1;
        let height = resolutionRef.current.parentGetResolution();
        let maxSize = 8192; // kilobytes

        // ffmpeg setup every single time is really dumb
        const ffmpeg = createFFmpeg({
            log: true, corePath: "https://nvasile.ddns.net/wasm/ffmpeg-core.js", logger: (log) => {
                if (log.message.includes("Video:")) {
                    log.message.split(",").forEach(ele => {
                        if (ele.includes("fps")) {
                            totalClipFrames = Math.floor(parseFloat(ele.split(" ")[1], 10) * clipLength);
                        }
                    })
                }

                // frame=   ##
                if (log.message.includes("frame=")) {
                    if (typeof (parseInt(log.message.split("=")[1], 10) / totalClipFrames) == "number") {
                        statusRef.current.parentSetStatus((parseInt(log.message.split("=")[1], 10) / totalClipFrames));
                    }
                }
            }
        });

        statusRef.current.parentSetStatus("Preparing...");
        await ffmpeg.load();
        statusRef.current.parentSetStatus("Reading file...");
        // work on file
        const outputFileName = "output.mp4"
        ffmpeg.FS('writeFile', userFile.name, await fetchFile(URL.createObjectURL(userFile)))

        const args = [];
        args.push('-ss', timeStampObjToCli(startEndTimeStampRef.current.parentGetStartTimeObj())); // seek to start time
        args.push('-i', userFile.name); // input file

        args.push('-t', clipLength.toString()); // specify end time

        // ffmpeg -i input -c:v libx264 -preset slow -crf 22 -c:a copy output.mkv
        args.push('-c:v', 'libx264');
        args.push('-preset', 'medium');
        args.push('-crf', '23');
        args.push('-b:v', Math.floor((maxSize / clipLength) - (256 / clipLength)).toString() + 'k');
        // filters
        let needComma = false;
        if (height !== -1 || fpsRef.current.parentGetFps() !== -1) {
            args.push('-vf');
            let filterArgsStr = "";

            if (height !== -1) {
                filterArgsStr += 'scale=-1:' + height;
                needComma = true;
            }

            if (fpsRef.current.parentGetFps() !== -1) {
                if (needComma === true) {
                    filterArgsStr += ",";
                }

                filterArgsStr += "fps=" + fpsRef.current.parentGetFps().toString();
                needComma = true;
            }

            args.push(filterArgsStr);
        }

        args.push('-c:a', 'copy',); // prevent audio re-encode
        args.push('-movflags');
        args.push('+faststart');
        args.push(outputFileName);

        await ffmpeg.run(...args);
        const clipArray = ffmpeg.FS('readFile', outputFileName);
        // const clip = await ffmpeg.FS.writeFile('./output.mkv', ffmpeg.FS('readFile', 'output.mkv'));

        // download
        // This is something truly awful...
        const clipData = new Blob([clipArray]);
        var link = document.createElement("a");
        link.download = outputFileName;
        link.href = URL.createObjectURL(clipData);
        link.click();

        statusRef.current.parentSetStatus("Done!");
        // ffmpeg.FS('unlink', outputFileName);
        ffmpeg.FS('unlink', userFile.name);
    }

    return (
        <Box m={2} pt={2}>
            <Card>
                <CardHeader title={props.fileList.length > 0 ? "Working on: " + props.fileList[props.fileList.length - 1].name : "Drag and drop a file anywhere on the page to get started!"}></CardHeader>
                <CardContent style={{ paddingTop: "0" }}>
                    {props.fileList.length > 0 &&
                        <VideoFilePlayer ref={playerRef} updateStartOrEndTime={updateStartOrEndTime} fileURL={URL.createObjectURL(props.fileList[props.fileList.length - 1])} />
                    }
                    <Grid container>
                        <StartEndTimeStamp ref={startEndTimeStampRef} getSecondsFromPlayer={getSecondsFromPlayer} updateStartOrEndTime={updateStartOrEndTime} />

                        <Grid item xs={12} sm={4} md={4} lg={4} display="flex" alignItems="center" justifyContent={"left"}>
                            <Box pr={1}>
                                <Resolution ref={resolutionRef} />
                            </Box>
                            <Box pr={1}>
                                <FPS ref={fpsRef} />
                            </Box>
                            <Box display="flex" pt={2} pr={1} height={"100%"}>
                                <Box display="flex" alignItems="center" height={"100%"}>
                                    <Button variant="outlined" style={{ height: "100%", padding: "0" }} onClick={createClip}>Create</Button>
                                </Box>
                            </Box>
                            <Status ref={statusRef} />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}

export const MemoizedClipMaker = React.memo(ClipMaker);