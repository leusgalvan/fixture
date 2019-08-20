import React from "react";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { ButtonProps } from "@material-ui/core/Button";

const AddButton = (props: ButtonProps) => {
    return (
        <Button variant="contained" color="primary" {...props}>
            <AddIcon />
            Add
        </Button>
    )
}

export default AddButton;