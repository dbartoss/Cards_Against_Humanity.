import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Room = (props) => {
    const history = useHistory();
    const { roomId } = useParams();

    return (
        <div>
            You currently are at the room: {roomId}
        </div>
    );
};

export default Room;
