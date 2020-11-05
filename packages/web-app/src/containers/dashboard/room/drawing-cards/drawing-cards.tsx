import * as React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography, makeStyles, Theme, createStyles, CircularProgress } from '@material-ui/core';
import BlackCard from '../../../../components/black-card';
import WhiteCard from '../../../../components/white-card';
import { CardModel } from '../../../../models/card.model';
import { PlayerModel } from '../../../../models/player.model';
import { RoomModel } from '../../../../models/room.model';
import { UserModel } from '../../../../models/user.model';
import { getUsers } from '../../../../services/users/users.service';

interface Props {
    userId: string | null;
    activeRoom: RoomModel;
    playerData: PlayerModel | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        row: {
            display: 'flex',
            alignItems: 'center',
        },
        marginRight: {
          marginRight: 8
        },
        whiteCardsContainer: {
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            width: '100%',
        },
        whiteCard: {
            marginRight: 20,
        }
    })
);

const getThisRoundSelectorId = (room: RoomModel): string | null => room.currentRound?.selector ?? null;
const getPlayerName = (users: UserModel[], userId: string | null): string | null =>
    users.find((user: UserModel) => user.id === userId)?.username ?? null;

// const getThisRoundSelectorName = (room: RoomModel, users: UserModel[]): string | null =>
//     getPlayerName(users, getThisRoundSelectorId(room));

const DrawingCards: React.FC<Props> = ({ userId, activeRoom, playerData, ...props }) => {
    const [users, setUsers] = React.useState<UserModel[]>([]);
    const [cardsToChoose, setCardsToChoose] = React.useState<CardModel[]>([]);
    const classes = useStyles();

    const thisRoundSelectorId: string | null = getThisRoundSelectorId(activeRoom);
    const thisRoundSelector: string | null = getPlayerName(users, thisRoundSelectorId);

    const blackCard = activeRoom?.currentRound?.mainCardGaps && activeRoom?.currentRound?.mainCardText ?
        <BlackCard text={activeRoom.currentRound.mainCardText} /> :
        <CircularProgress color="secondary" />;

    const whiteCards = Array.from(Array(6)).map((_, index) => {
        return <WhiteCard key={index} text={activeRoom.currentRound?.mainCardText ?? ''} />
    });


    React.useEffect(() => {
        (async () => {
            const res = await getUsers();
            setUsers(res?.data ?? []);
        })();
    }, []);


    return (
        <React.Fragment>
            {thisRoundSelector && (
                <div className={classes.row}>
                    <Typography className={classes.marginRight} variant="body2">This round selector:</Typography>
                    <Typography variant="subtitle1">{thisRoundSelectorId === userId ? `It's your time!` : thisRoundSelector}</Typography>
                </div>
            )}
            {blackCard}
            <Typography variant="h6">Answers:</Typography>
           <div className={classes.whiteCardsContainer}>{whiteCards}</div>
        </React.Fragment>
    );
};

export default DrawingCards;
