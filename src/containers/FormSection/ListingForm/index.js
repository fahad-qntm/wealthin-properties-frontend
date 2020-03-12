import React, {useState} from "react"
import TextField from "@material-ui/core/es/TextField/TextField"
import Button from "@material-ui/core/es/Button/Button"
import {createStyles, withStyles} from "@material-ui/core/es/styles/index"
import Typography from "@material-ui/core/es/Typography/Typography"
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem"
import FormControl from "@material-ui/core/es/FormControl/FormControl"
import RadioGroup from "@material-ui/core/es/RadioGroup/RadioGroup"
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel"
import Radio from "@material-ui/core/es/Radio/Radio"
import ImageUploader from "react-images-upload"
import {Field} from "formik"
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel"
import FormHelperText from "@material-ui/core/es/FormHelperText/FormHelperText"
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip"
import Grid from "@material-ui/core/es/Grid/Grid"
import './style.css'

const styles = theme => createStyles({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit * 2,
        padding: theme.spacing.unit * 2
    },
    heading: {
        marginTop: theme.spacing.unit * 8,
    },
    input: {
        marginTop: theme.spacing.unit * 3,
    },
    imageUploader: {
        //background: '#000'
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    }
})


const ListingForm = props => {
    const {
        classes,
        values: {id, unitNumber, propertyType, category, location, bedrooms, bathrooms, listingType, listingPrice, title, description, images},
        errors,
        touched,
        handleSubmit,
        handleChange,
        status,
        isValid,
        resetForm,
        setFieldTouched,
        setFieldValue,
        handleBlur,
        isSubmitting,
    } = props

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    const [pictures, setPictures] = useState([])

    const onDrop = (picture, pictureDataURLs) => {
        for (let i = 0; i < pictureDataURLs.length; i++) {
            pictureDataURLs[i] = pictureDataURLs[i].replace(/name.*;/g, '')
        }
        setPictures(pictureDataURLs)
        setFieldValue("images", pictureDataURLs)
    }

    const button1 = <Button
        fullWidth
        type={"submit"}
        variant={"contained"}
        color={"primary"}
        className={classes.submit}
        loading={isSubmitting}
        disabled={!isValid || isSubmitting || props.viewing}
    >
        {isSubmitting ? 'Loading...' : (props.editing ? 'Edit' : 'Submit')}
    </Button>

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <Typography variant={"h6"}>
                {status ? status.success ? (
                    <p className={classes.heading}>
                        {status.success}
                    </p>
                ) : null : null}
                {status ? status.error ? (
                    <p>
                        {status.error}
                    </p>
                ) : null : null}
            </Typography>
            <Grid container spacing={6}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        disabled={props.viewing}
                        id="id"
                        name="id"
                        type="number"
                        label="ID"
                        helperText={touched.id ? errors.id : ""}
                        error={touched.id && Boolean(errors.id)}
                        className={classes.input}
                        value={id}
                        onChange={change.bind(null, "id")}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        disabled={props.viewing}
                        id="unitNumber"
                        name="unitNumber"
                        type="number"
                        label="Unit Number"
                        helperText={touched.unitNumber ? errors.unitNumber : ""}
                        error={touched.unitNumber && Boolean(errors.unitNumber)}
                        className={classes.input}
                        value={unitNumber}
                        onChange={change.bind(null, "unitNumber")}
                    />
                </Grid>
                <Grid item xs={6}>

                    <TextField
                        fullWidth
                        disabled={props.viewing}
                        id="propertyType"
                        name="propertyType"
                        type="text"
                        select
                        label="Property Type"
                        helperText={touched.propertyType ? errors.propertyType : ""}
                        error={touched.propertyType && Boolean(errors.propertyType)}
                        className={classes.input}
                        value={propertyType}
                        onChange={change.bind(null, "propertyType")}
                    >
                        {props.propertyTypes.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}

                    </TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        select
                        id="category"
                        name="category"
                        type="text"
                        label="Category"
                        disabled={props.viewing}
                        helperText={touched.category ? errors.category : ""}
                        error={touched.category && Boolean(errors.category)}
                        className={classes.input}
                        value={category}
                        onChange={change.bind(null, "category")}
                    >
                        {props.categories.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={6}>

                    <TextField
                        fullWidth
                        id="location"
                        disabled={props.viewing}
                        name="location"
                        type="text"
                        label="Location"
                        helperText={touched.location ? errors.location : ""}
                        error={touched.location && Boolean(errors.location)}
                        className={classes.input}
                        value={location}
                        onChange={change.bind(null, "location")}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="bedrooms"
                        disabled={props.viewing}
                        name="bedrooms"
                        type="number"
                        label="Bedrooms"
                        helperText={touched.bedrooms ? errors.bedrooms : ""}
                        error={touched.bedrooms && Boolean(errors.bedrooms)}
                        className={classes.input}
                        value={bedrooms}
                        onChange={change.bind(null, "bedrooms")}
                    />
                </Grid>
                <Grid item xs={6}>

                    <TextField
                        fullWidth
                        id="bathrooms"
                        disabled={props.viewing}
                        name="bathrooms"
                        type="number"
                        label="Bathrooms"
                        helperText={touched.bathrooms ? errors.bathrooms : ""}
                        error={touched.bathrooms && Boolean(errors.bathrooms)}
                        className={classes.input}
                        value={bathrooms}
                        onChange={change.bind(null, "bathrooms")}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl component="fieldset" id="listingType" name="listingType">
                        <RadioGroup aria-label="position" id="listingType" name="listingType" value={listingType}
                                    disabled={props.viewing}

                                    onChange={change.bind(null, "listingType")} row>
                            {props.listingTypes.map(option => (
                                <FormControlLabel
                                    value={option}
                                    control={<Radio color="primary"/>}
                                    label={option}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>

                </Grid>
                <Grid item xs={6}>

                    <TextField
                        fullWidth
                        disabled={props.viewing}
                        id="listingPrice"
                        name="listingPrice"
                        type="number"
                        label="Listing Price"
                        helperText={touched.listingPrice ? errors.listingPrice : ""}
                        error={touched.listingPrice && Boolean(errors.listingPrice)}
                        className={classes.input}
                        value={listingPrice}
                        onChange={change.bind(null, "listingPrice")}
                    />
                </Grid>
                <Grid item xs={6}>

                    <TextField
                        fullWidth
                        id="title"
                        disabled={props.viewing}
                        name="title"
                        type="text"
                        label="Title"
                        helperText={touched.title ? errors.title : ""}
                        error={touched.title && Boolean(errors.title)}
                        className={classes.input}
                        value={title}
                        onChange={change.bind(null, "title")}
                    />
                </Grid>
                <Grid item xs={6}>

                    <TextField
                        fullWidth
                        disabled={props.viewing}
                        id="description"
                        name="description"
                        type="text"
                        label="Description"
                        helperText={touched.description ? errors.description : ""}
                        error={touched.description && Boolean(errors.description)}
                        className={classes.input}
                        value={description}
                        onChange={change.bind(null, "description")}
                    />
                </Grid>
                <FormControl
                    disabled={props.viewing}
                    fullWidth
                    error={touched.images && Boolean(errors.images)}
                >
                    <Field
                        id="images"
                        name="images"
                        label="Listing Price"
                        helperText={touched.images ? errors.images : ""}
                        error={touched.images && Boolean(errors.images)}
                        component={() =>
                            <ImageUploader
                                {...props}
                                className={"test"}
                                withIcon={true}
                                defaultImages={images}
                                withPreview={true}
                                onChange={onDrop}
                                imgExtension={[".jpg", ".png"]}
                                maxFileSize={5242880}
                                label={"Max size: 2 MB, supported: jpg | png"}
                                buttonText={"Select Images"}
                            />
                        }
                        style={{display: "flex"}}
                        onBlur={handleBlur}
                        title="Select a file"
                        setFieldValue={setFieldValue}
                        touched={touched["images"]}
                    />

                    <FormHelperText id="my-helper-text">{touched.images ? errors.images : ""}</FormHelperText>
                </FormControl>
                <Grid item xs={6}>
                    <Button
                        fullWidth
                        type='reset'
                        onClick={()=>{
                            props.setEmpty()
                            resetForm()
                        }}
                        variant={"contained"}
                        color={"primary"}
                        className={classes.submit}
                    >
                        {isSubmitting ? 'Loading...' : 'Clear'}
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    {isValid ? button1 :
                        <Tooltip title='Please fill/select all the fields' open={true} arrow>{button1}</Tooltip>}
                </Grid>
            </Grid>
        </form>
    )
}

export default withStyles(styles)(ListingForm)