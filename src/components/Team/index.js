import React, { useState, useContext, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import { FirebaseContext } from '../Firebase'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'

const Team = (props) => {
    const firebase = useContext(FirebaseContext)
    const [searchText, setSearchText] = useState("")
    const [filterByLoggedUser, setFilterByLoggedUser] = useState(false)
    const [teams, setTeams] = useState([])
    useEffect(() => {
        firebase.fetchAllTeams().then(allTeams => setTeams(allTeams))
    }, [firebase])
    const filterteams = gs => {
        const user = firebase.auth.currentUser
        const filteredByUser = filterByLoggedUser ? gs.filter(g => g.members.some(m => m.uid === user.uid)) : gs
        return searchText ? filteredByUser.filter(g => g.name.includes(searchText)) : filteredByUser
    }
    return (
        <Grid container>
            <Grid item xs={12}>
                <TextField
                    placeholder="Search…"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    onChange={event => setSearchText(event.target.value)}
                />
            </Grid>

            <Grid item xs={12}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filterByLoggedUser}
                            onChange={event => setFilterByLoggedUser(event.target.checked)}
                            color="primary"
                        />
                    }
                    label="My teams"
                />
            </Grid>
            <Grid item xs={12}>
                <List component="nav">
                    {filterteams(teams).map((group, i) =>
                        <ListItem key={i} button>
                            <ListItemText primary={group.name} />
                        </ListItem>
                    )}
                </List>
            </Grid>
        </Grid>
    );




}

export default Team;