import React from 'react';
import clsx from 'clsx';
import { Route, Switch } from "react-router-dom";
import {connect} from 'react-redux';
import {
    Drawer,
    Box,
    AppBar,
    Toolbar,
    Typography,
    Divider,
    IconButton,
    // Badge,
    Container,
    Link,
    // Grid,
} from '@material-ui/core';

import {
    Menu as MenuIcon,
    ChevronLeft as ChevronLeftIcon,
    // Notifications as NotificationsIcon,
} from '@material-ui/icons';

import NavBar from '../../components/nav/NavBar';

import DashboardBox from './containers/Dashboard';
import UsersBox from './containers/Users';
import ReportsBox from './containers/Reports';

// import useStyles from '../../classes/index';
import {makeStyles} from "@material-ui/core/styles";
import {userLogoutThunk} from "../../store/reducers/auth/auth.reducer";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
})); //@TODO

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link target="_blank" color="inherit" href="https://spassky.tech/">
                Max Spassky
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

//@TODO It's should be in the another place
const tokenChecking = callback => {
    let interval;
    interval = setInterval(()=>{
        const token_exp = localStorage.getItem("token_exp");
        const date_now = Date.now();
        console.log("TOKEN VALIDATION: ", !(token_exp && token_exp <= date_now))
        if(token_exp && token_exp <= date_now) {
            clearInterval(interval);
            callback();
        }
    }, 1000);
}

function Account(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(true);

    React.useEffect(()=>{
        tokenChecking(props.logout);
    }, []);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Dashboard
                    </Typography>
                    {/*<IconButton color="inherit">*/}
                    {/*    <Badge badgeContent={4} color="secondary">*/}
                    {/*        <NotificationsIcon />*/}
                    {/*    </Badge>*/}
                    {/*</IconButton>*/}
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <NavBar />
            </Drawer>

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth={false} className={classes.container}>

                    <Switch>
                        <Route path="/dashboard" component={DashboardBox} />
                        <Route path="/users" component={UsersBox} />
                        <Route path="/reports" component={ReportsBox} />
                    </Switch>

                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </React.Fragment>
    );
}

// let mapStateToPropsForRedirect = (state) => ({
//     isAuth: state.auth.isAuth
// });

const mapDispatchToProps = dispatch => ({
    logout: ()=> dispatch(userLogoutThunk()),
});

export default connect(null, mapDispatchToProps)(Account);