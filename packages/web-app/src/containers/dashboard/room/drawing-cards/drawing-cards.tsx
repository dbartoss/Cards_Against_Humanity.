import * as React from 'react';
import { PlayerModel } from '../../../../models/player.model';
import { RoomModel } from '../../../../models/room.model';

interface Props {
    userId: string | null;
    activeRoom: RoomModel;
    playerData: PlayerModel | undefined;
}

const DrawingCards: React.FC<Props> = ({ userId, activeRoom, playerData, ...props }) => {
    // const whose

    return (
        <div>
            drawing cards
        </div>
    );
};

export default DrawingCards;
