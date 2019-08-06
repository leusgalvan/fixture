import React from 'react'
import Card from '@material-ui/core/Card'
import { CardHeader, Typography, CardContent, Grid } from '@material-ui/core'
import MatchView from './MatchView'

const TournamentView = ({ tournament }) => {
  return (
    <>
      {tournament.map(matchDay => (
        <Card key={matchDay.matchDay}>
          <CardHeader
            title={
              <Typography variant='h4'>Fecha {matchDay.matchDay}</Typography>
            }
          />
          <CardContent>
            <Grid container>
              {matchDay.matches.map(match => {
                return (
                  <Grid key={match.match} item xs={12} md={6}>
                    <MatchView match={match} />
                  </Grid>
                )
              })}
            </Grid>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

export default TournamentView
