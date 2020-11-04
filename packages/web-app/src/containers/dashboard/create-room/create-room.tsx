import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Paper, Typography, Button, TextField } from '@material-ui/core';
import { createRoom } from '../../../store/actions/rooms.actions';

const CreateRoom: React.FC = (props) => {
    const [roomName, setRoomName] = React.useState('');
    const dispatch = useDispatch();

    const handleTextFieldChanges = (event: React.ChangeEvent<HTMLInputElement>) => setRoomName(event.target.value);
    const handleButtonClick = () => dispatch(createRoom());

    return (
        <Paper>
            <Typography variant="subtitle1">You are about creating new room:</Typography>
            <TextField value={roomName} onChange={handleTextFieldChanges} label="Room name" />
            <Button onClick={handleButtonClick}>Add new room</Button>
        </Paper>
    );
};

export default CreateRoom;
