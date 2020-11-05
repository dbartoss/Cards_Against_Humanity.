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
        },
        title: {
            fontSize: 14,
            height: 40,
        },
    })
);

const BlackCard: React.FC<Props> = ({ text, ...props }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>Black Card</Typography>
            <Typography variant="h5" component="h2">{text}</Typography>
        </Card>
    );
}

export default BlackCard;
