import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  root: { width: '100%' },
  matchTitle: { textAlign: 'center' },
  teams: { padding: '5%', textAlign: 'center' }
})
const MatchView = ({ match }) => {
  const classes = useStyles()

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.matchTitle}>
          <Typography variant='h6'>Match {match.match}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.teams}>{match.teams[0].label}</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.teams}>{match.teams[1].label}</Paper>
      </Grid>
    </Grid>
  )
}

export default MatchView
