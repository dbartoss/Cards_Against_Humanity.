import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, makeStyles, createStyles, Theme, Typography, CircularProgress, Button } from '@material-ui/core';
import { PlayerModel } from '../../../models/player.model';

import { RoomModel } from '../../../models/room.model';
import { allowToStartGameService } from '../../../services/rooms/allow-to-start-game.service';
import { fetchRooms } from '../../../store/middlewares/rooms.thunks';
import { canRoomStartGame, currentRoom } from '../../../store/selectors/rooms.selectors';
import { userIdSelector } from '../../../store/selectors/user.selectors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            textAlign: 'center',
            margin: '32px 0',
        },
        progress: {
            marginBottom: 16,
        },
    })
);

const WaitingForOtherPlayers: React.FC<{ classes: Record<string, any> }> = ({ classes, ...props }) => (
    <div className={classes.container}>
        <CircularProgress className={classes.progress} color="secondary" />
        <Typography variant="subtitle2">Waiting for other players to start game.</Typography>
    </div>
);

const Room: React.FC = (props) => {
    const { roomId } = useParams();
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [isAllowingToStart, setIsAllowingToStart] = React.useState(false);

    const userId: string | null = useSelector(userIdSelector);
    const activeRoom: RoomModel = useSelector(currentRoom(userId));
    const isGameStarted: boolean = useSelector(canRoomStartGame(userId));

    const playerData: PlayerModel | undefined = activeRoom.players.find((player: PlayerModel) => player.userId === userId);
    const doesUserAllowedToStartGame: boolean = !!playerData?.ableToStartGame;
    const playersAllowedToStart: number = activeRoom.players
        .reduce((acc: number, curr: PlayerModel) => !!curr.ableToStartGame ? acc + 1 : acc, 0);

    const pendingStatus = (): JSX.Element => doesUserAllowedToStartGame ?
        <WaitingForOtherPlayers classes={classes} /> :
        <div className={classes.container}>
            <Button
                disabled={isAllowingToStart}
                onClick={async () => {
                    setIsAllowingToStart(true);
                    await allowToStartGameService(roomId, userId);
                    setIsAllowingToStart(false);
                }}
                color="secondary"
                variant="outlined">
                Start Game
            </Button>
        </div>;

    React.useEffect(() => {
        dispatch(fetchRooms());

        const interval = setInterval(() => {
            dispatch(fetchRooms());
        }, 2000);

        return () => clearInterval(interval);

    }, [dispatch]);

    return (
        <Paper className={classes.paper}>
            <Typography variant="h6">{activeRoom.name}</Typography>
            {isGameStarted ? 'TODO!!!!' : pendingStatus()}
            {isGameStarted ? null : `Allowed to start: ${playersAllowedToStart}/${activeRoom.players.length}`}
        </Paper>
    );
};

export default Room;
