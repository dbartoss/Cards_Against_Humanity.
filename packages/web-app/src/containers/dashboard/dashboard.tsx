import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/styles';
import {
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Theme,
    Paper,
    Button
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

import './style.css';
import { logout } from '../../store/middlewares/auth.thunks';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerContainer: {
            overflow: 'auto',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        divider: {
            flexGrow: 1,
        },
        paper: {
          padding: 24,
        },
        icon: {
            marginRight: 8,
        },
        navLink: {
            textDecoration: 'none',
            color: theme.palette.primary.main,
        },
        activeNavLink: {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.secondary.contrastText,
        }
    }),
);

const Dashboard: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const handleLogout = (): void => {
        dispatch(logout(history.push));
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Cards Against Humanity
                    </Typography>
                    <span className={classes.divider} />
                    <Button variant="contained" color="secondary" onClick={handleLogout}>Log out</Button>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        <NavLink exact to={'/dashboard'} className={classes.navLink} activeClassName={classes.activeNavLink}>
                            <ListItem button>
                                <HomeIcon className={classes.icon}/>
                                <ListItemText primary="Home" />
                            </ListItem>
                        </NavLink>
                        <NavLink to={'/dashboard/rooms'} className={classes.navLink} activeClassName={classes.activeNavLink}>
                                <ListItem button>
                                <MeetingRoomIcon className={classes.icon}/>
                                <ListItemText primary="Rooms" />
                            </ListItem>
                        </NavLink>
                        <NavLink to={'/dashboard/user'} className={classes.navLink} activeClassName={classes.activeNavLink}>
                            <ListItem button>
                                <AccountBoxIcon className={classes.icon}/>
                                <ListItemText primary="User" />
                            </ListItem>
                        </NavLink>
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar />
               <Paper className={classes.paper}>Test</Paper>
            </main>
        </div>
    );
}

export default Dashboard;
