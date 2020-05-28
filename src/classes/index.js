// GRADIENTS: https://uigradients.com/
import {makeStyles} from "@material-ui/core/styles";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
    return ({
        root: {
            display: 'flex',
            height: '100%',
            '&.miaka': {
                background: "linear-gradient(to right, #fc354c, #0abfbc)",
            },
            '&.anamnisar': {
                background: "linear-gradient(to right, #9796f0, #fbc7d4)",
            },
            '&.greenAndBlue': {
                background: "linear-gradient(to right, #c2e59c, #64b3f4)",
            },
            '&.miamiDolphins': {
                background: "linear-gradient(to right, #4da0b0, #d39d38)",
            },
            '&.slightOceanView': {
                background: "linear-gradient(to right, #a8c0ff, #3f2b96)",
            },
            '&.dull': {
                background: "linear-gradient(to right, #c9d6ff, #e2e2e2)",
            },
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
            height: 340,
        },
        depositContext: {
            flex: 1,
        },
        navLink: {
            color: 'inherit',
            '&:hover': {
                color: 'inherit',
            },
            // '&:hover $svg': {
            //     fill: '#3f51b5',
            // },
        },
        navLinkActive: {
            color: '#3f51b5',
            '& svg': {
                fill: '#3f51b5',
            }
        },
    })
});

export default useStyles;