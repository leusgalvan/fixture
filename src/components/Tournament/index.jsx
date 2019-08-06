import React, { useState } from 'react'
import Select from 'react-select'
import Button from '@material-ui/core/Button'
import createTournament from './createTournament'
import TournamentView from './TournamentView'
import { Grid } from '@material-ui/core'

const data = ['team 1', 'team 2', 'team 3', 'team 4', 'team 5', 'team 6'].map(
  x => ({ value: x, label: x })
)

const Tournament = () => {
  const [selectedTeams, setTeams] = useState([])
  const [tournament, setTournament] = useState([])

  const handleClick = () => {
    const tournament = createTournament(selectedTeams)
    setTournament(tournament)
  }

  return (
    <>
      <Grid container alignItems='center'>
        <Grid item xs={12} sm={6}>
          <Select
            isMulti
            value={selectedTeams}
            onChange={newTeams => setTeams(newTeams)}
            name='colors'
            options={data}
            className='basic-multi-select'
            classNamePrefix='select'
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <Button variant='contained' color='primary' onClick={handleClick}>
            Generate league
          </Button>
        </Grid>
      </Grid>
      <TournamentView tournament={tournament} />
    </>
  )
}

export default Tournament
