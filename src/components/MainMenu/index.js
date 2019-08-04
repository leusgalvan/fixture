import React from 'react';
import Paper from '@material-ui/core/Paper';
import GroupIcon from '@material-ui/icons/Group';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import TournamentIcon from '../TournamentIcon';

const styles = theme => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        width: "50%",
        padding: theme.spacing(2),
    },

    listItem: {
    }
});

const MainMenu = ({ classes }) => {
    return (
        <Paper className={classes.paper}>
            <List component="nav">
                <ListItem button className={classes.listItem}>
                    <ListItemIcon>
                        <GroupIcon />
                    </ListItemIcon>
                    <ListItemText primary="Groups" />
                </ListItem>
                <ListItem button className={classes.listItem}>
                    <ListItemIcon>
                        <TournamentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tournaments" />
                </ListItem>
            </List>
        </Paper>
    );
}

export default withStyles(styles)(MainMenu);