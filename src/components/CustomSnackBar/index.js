import React from 'react'
import Snackbar from "@material-ui/core/es/Snackbar/Snackbar"
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomSnackBar = props => {
    return (
        <Snackbar
            anchorOrigin={{vertical: "top", horizontal: "right"}}
            open={props.open} autoHideDuration={6000} onClose={props.handleClose}>
            <Alert onClose={props.handleClose} severity={props.severity ? props.severity : 'info'}>
                {props.message}
            </Alert>
        </Snackbar>
    )
}

export default CustomSnackBar