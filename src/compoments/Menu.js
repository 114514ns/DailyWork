import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Navigate, useNavigate } from 'react-router-dom';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar, Container, InputAdornment, TextField } from "@mui/material";
import {
    Link,
    Link as RouterLink,

} from 'react-router-dom';

const drawerWidth = 240;
const index = 0
class UserMenu extends React.Component {
    render() {
        return (
            <Box sx={{ display: 'flex' }} >
                <CssBaseline />
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Divider />
                    <Container>
                        <Avatar style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                            alt="Remy Sharp"
                            src={window.localStorage.getItem('isLogin') ? JSON.parse(localStorage.getItem("response")).user.userAvatar : ""}
                            sx={{ width: 128, height: 128 }}
                        />
                    </Container>
                    <List>
                        <ListItem key={'用户信息'} disablePadding>
                            <ListItemButton
                                component={RouterLink}
                                to={'/index'}
                            >
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={'用户信息'} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={'作业列表'} disablePadding>
                            <ListItemButton
                                component={RouterLink}
                                to={'/work'}
                            >

                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={'作业列表'} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={'网盘'} disablePadding>
                            <ListItemButton
                                component={RouterLink}
                                to={'/disk'}
                            >
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={'网盘'}
                                />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </List>
                    {/*
                    <List>
                        <ListItem  disablePadding>
                            <ListItemButton
                                component={Link}
                                to={'/user/video'}
                            >
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="中出" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    */}
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                to={'/announce'}
                            >
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="公告" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
            </Box>
        )
            ;
    }
}

export default UserMenu;
