import React, {Component} from 'react'
import {withStyles, createStyles} from "@material-ui/core/es/styles"
import Container from "@material-ui/core/es/Container/Container"
import Typography from "@material-ui/core/es/Typography/Typography"
import FormSection from "../FormSection"
import TableSection from '../TableSection'
import {connect} from "react-redux"
import * as actions from '../../store/actions'
import Divider from "@material-ui/core/es/Divider/Divider"
import {DELETE_LISTING_SUCCESS} from "../../store/actions/types"
import CustomSnackBar from "../../components/CustomSnackBar"
import Fab from "@material-ui/core/es/Fab/Fab"
import DeleteIcon from "@material-ui/icons/ArrowUpwardRounded"
import Tab from "@material-ui/core/es/Tab/Tab"
import Tabs from "@material-ui/core/es/Tabs/Tabs"
import AppBar from "@material-ui/core/es/AppBar/AppBar"
import * as ReactDOM from "react-dom"


const styles = theme => createStyles({
    root: {
        flexGrow: 1,
    },
    listingHeader: {
        textAlign: 'center',
        marginBottom: theme.spacing.unit * 2
    },
    customFab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    }
})

class HomePage extends Component {

    constructor(props) {
        super(props)
    }

    scrollToTop = () => {
        window.scrollTo({behavior: 'smooth', top: 0})
        return null
    }


    scrollToTable() {
        window.scrollTo({behavior: 'smooth', top: 850});
    }

    handleSnackClose = () => {
        this.setState({
            snackDetails: {
                ...this.state.snackDetails,
                open: false
            }
        })
    }

    state = {
        editing: false,
        viewing: false,
        tab: 0,
        snackDetails: {
            message: 'This is a success message!',
            handleClose: this.handleSnackClose,
            open: false,
            severity: 'info'
        },
    }


    changeEditing = (enableDisable) => {
        this.setState({
            editing: enableDisable
        })
    }


    changeViewing = (enableDisable) => {
        this.setState({
            viewing: enableDisable
        })
    }

    onClear = () => {
        this.changeViewing(false)
        this.changeEditing(false)
    }

    onClickView = (id) => {
        this.changeViewing(true)
        this.changeEditing(false)
        this.props.setCurrentListing(id)
    }

    onClickEdit = (id) => {
        this.changeViewing(false)
        this.changeEditing(true)
        this.props.setCurrentListing(id)
    }

    onClickDelete = async (id) => {
        let result = await this.props.deleteListing(id)
        if (result.type === DELETE_LISTING_SUCCESS) {
            this.setState({
                snackDetails: {
                    handleClose: this.handleSnackClose,
                    open: true,
                    severity: 'success',
                    message: "Successfully Deleted Listing"
                }
            })

        } else {
            this.setState({
                snackDetails: {
                    handleClose: this.handleSnackClose,
                    open: true,
                    severity: 'error',
                    message: result.payload.message
                }
            })

        }
    }

    async componentDidMount() {
        await this.props.fetchAllListings()
        await this.props.fetchPropertyTypes()
        await this.props.fetchCategories()
        await this.props.fetchListingTypes()
    }

    handleTabs = (event, newValue) => {
        if (newValue === 0) {
            this.scrollToTop()
        } else {
            this.scrollToTable()
        }

        this.setState({
            tab: newValue
        })
    }

    render() {
        const {classes} = this.props

        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Tabs
                        value={this.state.tab}
                        onChange={this.handleTabs}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Listing Form"/>
                        <Tab label="Listings"/>
                    </Tabs>
                </AppBar>
                <Container maxWidth="lg">
                    <CustomSnackBar {...this.state.snackDetails}/>
                    <FormSection viewing={this.state.viewing} editing={this.state.editing} onClear={this.onClear}/>
                    <Typography className={classes.listingHeader} component={"h1"} variant={"h3"}>
                        Listings
                    </Typography>
                    <Divider/>
                    <TableSection ref="test" onClickEdit={this.onClickEdit} onClickDelete={this.onClickDelete}
                                  onClickView={this.onClickView}/>
                    <Fab className={classes.customFab} color="primary" aria-label="add" onClick={this.scrollToTop}>
                        <DeleteIcon/>
                    </Fab>
                </Container>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllListings: () => dispatch(actions.getAllListing()),
        fetchCategories: () => dispatch(actions.getCategories()),
        fetchPropertyTypes: () => dispatch(actions.getPropertyTypes()),
        fetchListingTypes: () => dispatch(actions.getListingTypes()),
        editListing: () => dispatch(actions.editListing()),
        setCurrentListing: (id) => dispatch(actions.setCurrentListing(id)),
        deleteListing: (id) => dispatch(actions.deleteListing(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomePage))