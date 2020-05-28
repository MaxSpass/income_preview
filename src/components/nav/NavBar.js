import React from 'react';
import {NavLink} from 'react-router-dom';
// import {makeStyles} from "@material-ui/core/styles";
import useStyles from '../../classes';

import {
    Assignment as AssignmentIcon,
    Layers as LayersIcon,
    BarChart as BarChartIcon,
    People as PeopleIcon,
    ShoppingCart as ShoppingCartIcon,
    Dashboard as DashboardIcon,
} from '@material-ui/icons';

import {
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Divider,
    List,
} from "@material-ui/core";


// const useStyles = makeStyles((theme) =>({
//     navActive: {
//         svg: {
//             fill: 'red',
//         }
//     }
// });


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
        {
            to: '/users',
            text: 'Users',
            disable: true,
            icon: <PeopleIcon/>
        },
        {
            to: '/orders',
            text: 'Orders',
            disable: true,
            icon: <ShoppingCartIcon/>
        },
        {
            to: '/integrations',
            text: 'Integrations',
            disable: true,
            icon: <LayersIcon/>
        },
    ];

    const menus_bottom = [
        {
            label: 'Available reports',
        },
        {
            to: '/currect-month',
            text: 'Current month',
            disable: true,
            icon: <AssignmentIcon/>
        },
        {
            to: '/last-quarter',
            text: 'Last quarter',
            disable: true,
            icon: <AssignmentIcon/>
        },
        {
            to: '/year-end-sale',
            text: 'Year-end sale',
            disable: true,
            icon: <AssignmentIcon/>
        },
    ];

  return (
      <React.Fragment>

          {
              menus_top.length
                ? ListMenu(menus_top)
                : ''
          }

          <Divider />

          {
              menus_bottom.length
                  ? ListMenu(menus_bottom)
                  : ''
          }

      </React.Fragment>
  )
};