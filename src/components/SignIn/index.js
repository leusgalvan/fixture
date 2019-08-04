import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { FirebaseContext } from '../Firebase';

const styles = theme => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
        padding: theme.spacing(3),
        width: 500,
    },

    title: {
        margin: theme.spacing(2),
    },

    button: {
        margin: theme.spacing(2),
    }
});

const SignIn = ({ classes, onLoginSuccess, onLoginError }) => {
    const firebase = useContext(FirebaseContext);
    
    return (
        <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h3" color="textPrimary">
                Welcome
            </Typography>
            <Button fullWidth className={classes.button} variant="contained" color="primary" size="large" onClick={login}>Sign in</Button>
        </Paper>
    );

    async function login() {
        const { error, user } = await firebase.login();
        if (error) {
            onLoginError(error);
        } else {
            onLoginSuccess(user);
        }
    }
}



export default withStyles(styles)(SignIn);