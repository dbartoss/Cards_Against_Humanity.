import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Paper, Typography, Button, TextField } from '@material-ui/core';
import { createNewRoom } from '../../../store/middlewares/rooms.thunks';
import { userIdSelector } from '../../../store/selectors/user.selectors';

const CreateRoom: React.FC = (props) => {
    const [roomName, setRoomName] = React.useState('');
    const userId: string | null = useSelector(userIdSelector);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleTextFieldChanges = (event: React.ChangeEvent<HTMLInputElement>) => setRoomName(event.target.value);
    const handleButtonClick = async () => dispatch(createNewRoom(roomName, userId, history.push));

    return (
        <Paper>
            <Typography variant="subtitle1">You are about creating new room:</Typography>
            <TextField value={roomName} onChange={handleTextFieldChanges} label="Room name" />
            <Button onClick={handleButtonClick}>Add new room</Button>
        </Paper>
    );
};

export default CreateRoom;
