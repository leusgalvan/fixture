import React from 'react';
import Paper from '@material-ui/core/Paper';
import GroupIcon from '@material-ui/icons/Group';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withStyles } from '@material-ui/core/styles';
import TournamentIcon from '../TournamentIcon';

const styles = theme => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        width: "50%",
        padding: theme.spacing(2),
    }
});

const MainMenu = ({ classes, onLogout }) => {
    return (
        <Paper className={classes.paper}>
            <List component="nav">
                <ListItem button>
                    <ListItemIcon>
                        <GroupIcon />
                    </ListItemIcon>
                    <ListItemText primary="Groups" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <TournamentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tournaments" />
                </ListItem>
                <ListItem button onClick={onLogout}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </Paper>
    );
}

export default withStyles(styles)(MainMenu);