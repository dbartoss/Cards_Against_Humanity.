import * as React from 'react';
import { useSelector } from 'react-redux';
import { Paper, makeStyles, createStyles, Theme, Zoom, Link, Typography } from '@material-ui/core';


import { openRoomsSelector, roomsSelector } from '../../../store/selectors/rooms.selectors';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: 24,
            marginBottom: 20,
        },
        strong: {
            fontWeight: 500,
        }
    }),
);

const Home: React.FC = (props) => {
    const classes = useStyles();
    const openRooms = useSelector(openRoomsSelector);

    return (
        <React.Fragment>
            <Zoom in={true} timeout={300} style={{ transitionDelay: '200ms' }}>
                <Paper className={classes.paper}>
                    <Typography variant="subtitle1">
                        There now <strong className={classes.strong}>{openRooms.length}</strong> open rooms right now.
                    </Typography>
                    <Link>See all rooms here.</Link>
                </Paper>
            </Zoom>
            <Zoom in={true} timeout={300} style={{ transitionDelay: '400ms' }}>
                <Paper className={classes.paper}>
                    <Typography variant="subtitle1">Do you want to join to room?</Typography>
                    <Link>Create a new room then.</Link>
                </Paper>
            </Zoom>
        </React.Fragment>
    );
};

export default Home;
