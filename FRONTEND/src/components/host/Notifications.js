import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Menu, MenuItem, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Notifications() {
    const [data, setData] = useState(null);
    const [notifications, setNotifications] = useState(null);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const get_notifications = () => {
            axios.get("http://localhost:8000/api/notifications").then(
                response => {
                    console.log(response.data);
                    setData(response.data);
                    setNotifications(response.data.notifications)
                    console.log('******');
                }
            ).catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });
        }
        get_notifications();
    }, [])

    console.log("hey", data);
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">{data && data.host.first_name}</a>
                    <ul class="navbar-nav d-flex flex-row me-1">
                        <li class="nav-item me-3 me-lg-0">
                            {/* <div class="dropdown">
                                <a data-mdb-dropdown-init class="me-3 dropdown-toggle hidden-arrow" href="#" id="navbarDropdownMenuLink"
                                    role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                                    <i class="fas fa-bell text-white"></i>
                                    <span class="badge rounded-pill badge-notification bg-danger"> {data && data.notifications_count} </span>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                                    {notifications &&
                                        notifications.map((elem, index) => (
                                            <li key={index}>
                                                <a class="dropdown-item" href="#">{elem.created_at}</a>
                                            </li>
                                        ))
                                    }
                                   
                                </ul>
                            </div> */}
                            <div>
                                <Button
                                    aria-controls="notification-menu"
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                    color="inherit"
                                >
                                    <Badge badgeContent={3} color="error">
                                        <NotificationsIcon />
                                    </Badge>
                                </Button>
                                <Menu
                                    id="notification-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>Notification 1</MenuItem>
                                    <MenuItem onClick={handleClose}>Notification 2</MenuItem>
                                    <MenuItem onClick={handleClose}>Notification 3</MenuItem>
                                </Menu>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}