import React from 'react';
import {NavLink} from 'react-router-dom';
import useStyles from '../../classes';

import {
    BarChart as BarChartIcon,
    Dashboard as DashboardIcon,
} from '@material-ui/icons';

import {
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    List,
} from "@material-ui/core";

//@TODO Pass needed class for changing link color
function ListMenu(menus) {
    const classes = useStyles();
    const linkClasses = ['px-4 py-2 w-100', classes.navLink].join(' ');
    const linkActiveClasses = [classes.navLinkActive].join(' ');
    return <List>
        {
            menus.map((menu, i)=>{
                return menu.label
                    ? <ListSubheader key={menu.to + i} component="li" inset>{menu.label}</ListSubheader>
                    : <ListItem key={menu.to} component="li" button className="p-0" disabled={menu.disable}>
                        <NavLink
                            to={menu.to}
                            className={linkClasses}
                            activeClassName={linkActiveClasses}
                            >
                            <ListItemIcon className="d-inline-block">
                                {menu.icon}
                            </ListItemIcon>
                            <ListItemText primary={menu.text} className="d-inline-block font-color-inherit"/>
                        </NavLink>
                    </ListItem>
            })
        }
    </List>;
};


export default function NavBar() {
    const menus_top = [
        {
            to: '/dashboard',
            text: 'Dashboard',
            icon: <DashboardIcon/>
        },
        {
            to: '/reports',
            text: 'Reports',
            icon: <BarChartIcon/>
        },
    ];

  return (
      <React.Fragment>

          {
              menus_top.length
                ? ListMenu(menus_top)
                : ''
          }

      </React.Fragment>
  )
};