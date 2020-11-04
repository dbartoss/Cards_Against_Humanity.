import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, List, ListItem, Button, Zoom, makeStyles, Theme, createStyles, Grow } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import NoMeetingRoomIcon from '@material-ui/icons/NoMeetingRoom';

import { RoomModel } from '../../../models/room.model';
import { fetchRooms, joinToRoom } from '../../../store/middlewares/rooms.thunks';
import { roomsItemsSelector } from '../../../store/selectors/rooms.selectors';
import { userIdSelector } from '../../../store/selectors/user.selectors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginBottom: 20,
        },
        list: {
            padding: 0,
        },
        listItem: {
            minHeight: 60,
            borderBottom: '1px solid rgba(255, 255, 255, .12)',
            padding: '0 24px',

            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',

            '&:last-of-type': {
                borderBottom: 'none',
            },
        },
        description: {
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'column',
            // height: '100%',
        },
        descriptionName: {
          display: 'flex',
          alignItems: 'center',
          fontSize: 18,
        },
        descriptionPlayers: {
            display: 'flex',
            alignItems: 'center',
            height: 20,
        },
        labelPlayers: {
            fontSize: 12,
            display: 'flex',
            alignItems: 'center',
            marginRight: 8
        },
        valuePlayers: {
            fontWeight: 500,
        },
        iconMarginRight: {
            marginRight: 8,
        }
    }),
);

const RoomListItem: React.FC<RoomModel & { userId: string | null, classes: Record<string, any> }> = ({ classes, userId, ...room }) => {
    const { id, name, players } = room;

    const dispatch = useDispatch();
    const history = useHistory();

    const handleRedirect = async () => dispatch(joinToRoom(id, userId, history.push));

    const doesGameStarted: boolean = players.every(player => player?.ableToStartGame);

    const roomIcon: JSX.Element = doesGameStarted ?
        <NoMeetingRoomIcon className={classes.iconMarginRight} /> :
        <MeetingRoomIcon className={classes.iconMarginRight} />;

    return (
        <ListItem className={classes.listItem}>
            <div className={classes.description}>
                <span className={classes.descriptionName}>{roomIcon} {name}</span>
                <div className={classes.descriptionPlayers}>
                    <span className={classes.labelPlayers}>
                        <GroupIcon className={classes.iconMarginRight} />
                        Players:
                    </span>
                    <span className={classes.valuePlayers}>{players.length}</span>
                </div>
            </div>
            <Button color="secondary" variant="outlined" onClick={handleRedirect}>Join the room</Button>
        </ListItem>
    );
};


const Rooms: React.FC = (props) => {
    const roomsData: RoomModel[] = useSelector(roomsItemsSelector);
    const userId: string | null = useSelector(userIdSelector);

    const dispatch = useDispatch();
    const classes = useStyles();

    const MAIN_TRANSITION_DELAY: number = 400;

    React.useEffect(() => {
        dispatch(fetchRooms());
    }, [dispatch]);

    const printList: JSX.Element[] = roomsData.map((room: RoomModel, index: number) => {
        const transitionDelay = `${(index + 1) * 100 + MAIN_TRANSITION_DELAY}ms`;
        return (
            <Grow key={room.id} in={true} timeout={300} style={{ transitionDelay }}>
                <RoomListItem classes={classes} userId={userId} {...room} />
            </Grow>
        );
    });

    return (
        <Zoom in={true} timeout={300} style={{ transitionDelay: '200ms'}}>
            <Paper className={classes.paper}>
                <List className={classes.list}>
                    {printList}
                </List>
            </Paper>
        </Zoom>
    );
};

export default Rooms;
