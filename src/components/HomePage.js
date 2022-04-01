import * as React from 'react';
import { Card, Typography } from '@mui/material';
import { CardContent, CardHeader, CardActionArea } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from "react-router-dom";

const HomePage = (props) => {
    return (
        <Box position={"relative"} display={"flex"} align-items={"center"} justifyContent={"center"} flexWrap={"wrap"}>
            <Box>
                <Box p={1} >
                    <Typography variant="h2" align={"center"}>Welcome!</Typography>
                </Box>
                <Link to="/clips" style={{ textDecoration: 'none' }}>
                    <Box p={1}>
                        <Card>
                            <CardActionArea>
                                <CardHeader title="Clips →"></CardHeader>
                                <CardContent >
                                    <Typography>Make clips from longer videos, all in browser.</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Box>
                </Link>
                <Box p={1}>
                    <Card>
                        <CardActionArea href="https://app.plex.tv/">
                            <CardHeader title="Plex →"></CardHeader>
                            <CardContent >
                                <Typography>Watch everything I have downloaded into my media library.</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
                <Box p={1}>
                    <Card>
                        <CardActionArea href="http://nvasile.ddns.net:8088/">
                            <CardHeader title="SyncLounge →"></CardHeader>
                            <CardContent>
                                <Typography>Set up watch parties for any Plex server shared with you.</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
}

export default HomePage;