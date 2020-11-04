import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, makeStyles, createStyles, Theme, Zoom, Typography, Link as LinkComponent } from '@material-ui/core';
import { RoomModel } from '../../../models/room.model';
import { fetchRooms } from '../../../store/middlewares/rooms.thunks';
import { currentRoom, openRoomsSelector } from '../../../store/selectors/rooms.selectors';
import { userIdSelector } from '../../../store/selectors/user.selectors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: 24,
            marginBottom: 20,
        },
        strong: {
            fontWeight: 500,
        },
        container: {
            display: 'flex',
            alignItems: 'center',
        },
        link: {
            color: theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
            '&:visited': {
                color: theme.palette.primary.main,
            },
            '&:link': {
                color: theme.palette.primary.main,
            },
            '&:active': {
                color: theme.palette.primary.main,
                textDecoration: 'underline',
            },
        }
    }),
);

const Home: React.FC = (props) => {
    const userId: string | null = useSelector(userIdSelector);
    const openRooms: RoomModel[]  = useSelector(openRoomsSelector);
    const activeRoom: RoomModel | null = useSelector(currentRoom(userId));

    const dispatch = useDispatch();
    const classes = useStyles();

    React.useEffect(() => {
        dispatch(fetchRooms());
    }, [dispatch]);

    return (
        <React.Fragment>
            {activeRoom && (
                <Zoom in={true} timeout={300} style={{ transitionDelay: '200ms' }}>
                    <Paper className={classes.paper}>
                        <Typography variant="subtitle1">
                            You are currently in the room: <strong className={classes.strong}>{activeRoom?.name}</strong>
                        </Typography>
                        <Link to={`/dashboard/rooms/${activeRoom?.id}`}  className={classes.link}>
                            Go to the room.
                        </Link>
                    </Paper>
                </Zoom>
            )}
            <Zoom in={true} timeout={300} style={{ transitionDelay: '400ms' }}>
                <Paper className={classes.paper}>
                    <Typography variant="subtitle1">
                        There now <strong className={classes.strong}>{openRooms.length}</strong> open rooms right now.
                    </Typography>
                    <Link to="/dashboard/rooms" className={classes.link}>See all rooms there.</Link>
                </Paper>
            </Zoom>
            <Zoom in={true} timeout={300} style={{ transitionDelay: '600ms' }}>
                <Paper className={classes.paper}>
                    <Typography variant="subtitle1">Do you want to create a new to room?</Typography>
                    <Link to="/dashboard/rooms/create"  className={classes.link}>
                        Create a new room here.
                    </Link>
                </Paper>
            </Zoom>
        </React.Fragment>
    );
};

export default Home;
