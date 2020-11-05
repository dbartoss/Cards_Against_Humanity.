import * as React from 'react';
import { Card, Typography, makeStyles, createStyles, Theme } from '@material-ui/core';

interface Props {
    text: string;
    
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 230,
            minHeight: 260,
            padding: 24,
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
            color: 'rgba(0, 0, 0, .87);',
            marginRight: 20,
            marginBottom: 20,
            cursor: 'pointer',
            '&:hover': {
                border: `8px solid ${theme.palette.secondary.main}`,
                transition: '.08s all ease-in',
            },
        },
        title: {
            fontSize: 14,
            height: 40,
            color: 'inherit'
        },
    })
);

const WhiteCard: React.FC<Props> = ({ text, ...props }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Typography className={classes.title} gutterBottom>White Card</Typography>
            <Typography variant="h5" component="h2">{text}</Typography>
        </Card>
    );
}

export default WhiteCard;
