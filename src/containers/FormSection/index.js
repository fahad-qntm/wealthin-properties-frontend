import React, {Component} from 'react'
import {withStyles, createStyles} from "@material-ui/core/es/styles"
import Container from "@material-ui/core/es/Container/Container"
import Typography from "@material-ui/core/es/Typography/Typography"
import * as yup from "yup"
import CssBaseline from "@material-ui/core/es/CssBaseline/CssBaseline"
import Paper from "@material-ui/core/es/Paper"
import {Formik} from "formik"
import ListingForm from './ListingForm'
import {connect} from "react-redux"
import * as actions from "../../store/actions"
import {ADD_LISTING_SUCCESS, EDIT_LISTING_SUCCESS} from "../../store/actions/types"
import CustomSnackBar from "../../components/CustomSnackBar"
import Divider from "@material-ui/core/es/Divider/Divider"

const styles = theme => createStyles({
    listingHeader: {},
    paper: {
        marginTop: theme.spacing.unit * 16,
        marginBottom: theme.spacing.unit * 16,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    }
})


const listingSchema = yup.object().shape({
    id: yup.number("Enter listing id").required("id is required"),
    unitNumber: yup.number("Enter unit id").required("Unit number is required"),
    propertyType: yup.string("Select Property Type").required("Property Type is required"),
    category: yup.string("Select category").required("Category is required"),
    location: yup.string("Enter location").required("Location is required"),
    bedrooms: yup.number("Enter number of bedrooms").required("Number of bedrooms is required"),
    bathrooms: yup.number("Enter number of bathrooms").required("Number of bathrooms is required"),
    listingType: yup.string("Select listing type").required("listing type is required"),
    listingPrice: yup.number("Enter listing price").required("Listing price is required"),
    title: yup.string("Enter title for display").required("Title is required"),
    description: yup.string("Enter description for display").required("Description is required"),
    images: yup.array().required("Images are required")
})

let initialValues = {
    id: '1',
    unitNumber: '204',
    propertyType: 'Apartment',
    category: 'Sale',
    location: 'Barsha',
    bedrooms: '4',
    bathrooms: '2',
    listingType: 'Furnished',
    listingPrice: '10000000',
    title: 'Test Title',
    description: 'Test Description',
    images: []
}

let emptyValues = {
    id: '',
    unitNumber: '',
    propertyType: '',
    category: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    listingType: '',
    listingPrice: '',
    title: '',
    description: '',
    images: []
}

class FormSection extends Component {

    submitListing = async (values, actions) => {
        if (this.props.editing) {
            delete values.createdAt
            delete values._id
            delete values.updatedAt
            delete values.__v
            delete values.publicIDs
            const editListing = await this.props.editListing(values.id, values)
            if (editListing.type === EDIT_LISTING_SUCCESS) {

                this.setState({
                    snackDetails: {
                        handleClose: this.handleSnackClose,
                        open: true,
                        severity: 'success',
                        message: "Successfully Edited Listing"
                    }
                })
                actions.setStatus({success: "Edited Listing Successfully"})
                actions.setSubmitting(false)
            } else {

                this.setState({
                    snackDetails: {
                        handleClose: this.handleSnackClose,
                        open: true,
                        severity: 'error',
                        message: editListing.payload.message
                    }
                })
                actions.setStatus({error: editListing.payload.message})
                actions.setSubmitting(false)
            }
        } else {
            const addListing = await this.props.addListing(values)
            if (addListing.type === ADD_LISTING_SUCCESS) {

                this.setState({
                    snackDetails: {
                        handleClose: this.handleSnackClose,
                        open: true,
                        severity: 'success',
                        message: "Successfully Added Listing"
                    }
                })
                actions.setStatus({success: "Added Listing Successfully"})
                actions.setSubmitting(false)
            } else {

                this.setState({
                    snackDetails: {
                        handleClose: this.handleSnackClose,
                        open: true,
                        severity: 'error',
                        message: addListing.payload.message
                    }
                })
                actions.setStatus({error: addListing.payload.message})
                actions.setSubmitting(false)
            }
        }
    }

    state = {
        showSnack: false,
        snackDetails: {
            message: 'This is a success message!',
            handleClose: this.handleSnackClose,
            open: false,
            severity: 'info'
        },
        id: '',
        unitNumber: '',
        propertyType: '',
        category: '',
        location: '',
        bedrooms: '',
        bathrooms: '',
        listingType: '',
        listingPrice: '',
        title: '',
        description: '',
        images: []
    }

    handleSnackClose = () => {
        this.setState({
            snackDetails: {
                ...this.state.snackDetails,
                open: false
            }
        })
    }


    handleSnackOpen = () => {
        this.setState({
            snackDetails: {
                ...this.state.snackDetails,
                open: true
            }
        })
    }

    setFormValues = (listingValues) => {
        this.setState({
            initialValues: listingValues
        })
    }

    onClear = () => {
        this.props.onClear()
        this.props.clearCurrent(emptyValues)
    }

    /*
        componentDidUpdate(oldProps) {
            const newProps = this.props
            if (oldProps.currentListing !== newProps.currentListing) {
                this.setState({
                    ...this.state, ...newProps.currentListing
                })
            }
        }*/

    render() {
        const {classes} = this.props
        const {id, unitNumber, propertyType, category, location, bedrooms, bathrooms, listingType, listingPrice, title, description} = this.state
        return (
            <Container maxWidth="lg">
                <main>
                    <CustomSnackBar {...this.state.snackDetails}/>
                    <CssBaseline/>
                    <Paper className={classes.paper}>
                        <Typography className={classes.listingHeader} component={"h1"} variant={"h3"}>
                            Listing Details
                        </Typography>
                        <Divider/>
                        <Formik
                            enableReinitialize={true}
                            onSubmit={this.submitListing}
                            validationSchema={listingSchema}
                            emptyValues={emptyValues}
                            initialValues={this.props.currentListing ? this.props.currentListing : initialValues}
                            render={props => <ListingForm {...props} categories={this.props.categories}
                                                          viewing={this.props.viewing}
                                                          setEmpty={this.onClear}
                                                          editing={this.props.editing}
                                                          propertyTypes={this.props.propertyTypes}
                                                          listingTypes={this.props.listingTypes}/>}
                        />
                    </Paper>
                </main>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        propertyTypes: state.misc.propertyTypes,
        listingTypes: state.misc.listingTypes,
        categories: state.misc.categories,
        currentListing: state.listings.currentListing
    }
}


const mapDispatchToProps = dispatch => {
    return {
        addListing: (listingDetails) => dispatch(actions.addListing(listingDetails)),
        editListing: (id, listingDetails) => dispatch(actions.editListing(id, listingDetails)),
        clearCurrent: (values) => dispatch(actions.clearCurrentListing(values))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FormSection))