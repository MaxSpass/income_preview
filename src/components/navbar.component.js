import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import {
    MenuList,
    MenuItem,
    Divider,
    Typography,
} from '@material-ui/core';


import IconProfile from '@material-ui/icons/PermIdentityOutlined';
import IconUsers from '@material-ui/icons/SupervisorAccountOutlined';
import IconSource from '@material-ui/icons/WorkOutlineOutlined';
import IconIncome from '@material-ui/icons/AccountBalanceOutlined';
import IconCurrency from '@material-ui/icons/MonetizationOnOutlined';
import IconGenre from '@material-ui/icons/EmojiSymbolsOutlined';
import IconTag from '@material-ui/icons/LabelImportantOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));


export default function NavBar() {
    const classes = useStyles();
    // className={classes.root}
    return (
        <div>
            <MenuList>
                <MenuItem component={Link} to="/" className="p-2">
                    <IconProfile fontSize="large"/>
                    <Typography component="span" className="ml-2 font-weight-bold">
                        Account
                    </Typography>
                </MenuItem>

                <MenuItem component={Link} to="/" className="p-2">
                    <IconIncome fontSize="large"/>
                    <Typography component="span" className="ml-2 font-weight-bold">
                        Incomes
                    </Typography>
                </MenuItem>

            </MenuList>
            <Divider />
            <MenuList>

                <MenuItem component={Link} to="/" className="p-2">
                    <IconUsers fontSize="large"/>
                    <Typography component="span" className="ml-2 font-weight-bold">
                        Users
                    </Typography>
                </MenuItem>

                <MenuItem component={Link} to="/" className="p-2">
                    <IconSource fontSize="large"/>
                    <Typography component="span" className="ml-2 font-weight-bold">
                        Sources
                    </Typography>
                </MenuItem>

                <MenuItem component={Link} to="/" className="p-2">
                    <IconCurrency fontSize="large"/>
                    <Typography component="span" className="ml-2 font-weight-bold">
                        Currencies
                    </Typography>
                </MenuItem>

                <MenuItem component={Link} to="/" className="p-2">
                    <IconGenre fontSize="large"/>
                    <Typography component="span" className="ml-2 font-weight-bold">
                        Genres
                    </Typography>
                </MenuItem>

                <MenuItem component={Link} to="/" className="p-2">
                    <IconTag fontSize="large"/>
                    <Typography component="span" className="ml-2 font-weight-bold">
                        Tags
                    </Typography>
                </MenuItem>

            </MenuList>
        </div>
    )
}

/*<ListItem button component="a" {...props} />*/