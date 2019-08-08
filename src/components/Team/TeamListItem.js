import React, { useState } from "react"
import List from '@material-ui/core/List'
import Collapse from '@material-ui/core/Collapse'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

const TeamListItem = ({ key, team }) => {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <>
            <ListItem key={key} button onClick={handleClick}>
                <ListItemText primary={team.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div">
                    {team.members.map((member, i) =>
                        <ListItem button>
                            <ListItemText primary={member.displayName} key={i} />
                        </ListItem>
                    )}
                </List>
            </Collapse>
        </>
    );
}

export default TeamListItem;