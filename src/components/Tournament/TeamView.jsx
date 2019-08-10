import React from 'react';
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";


const useStyles = makeStyles(theme => {
    return {
        teams: {
            padding: "5%",
            textAlign: "center",
            backgroundColor: winner => winner ? 'green' : theme.palette.secondary["900"],
            color: "white"
          }
    };
  });

const TeamView = ({teamName, winner}) => {

    const classes = useStyles(winner);

    return (
        <Paper className={classes.teams}>
            <Typography variant="h5">
                {teamName}
            </Typography>
            { winner ? 
                <Typography variant="h6">
                    Winner
                </Typography> 
            : 
                null
            }
      </Paper>
    )
}

export default TeamView;