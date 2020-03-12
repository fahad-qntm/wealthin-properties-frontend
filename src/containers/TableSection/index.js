import React from 'react'
import Table from "@material-ui/core/es/Table/Table"
import TableRow from "@material-ui/core/es/TableRow/TableRow"
import TableCell from "@material-ui/core/es/TableCell/TableCell"
import TableBody from "@material-ui/core/es/TableBody/TableBody"
import {withStyles, createStyles} from "@material-ui/core/es/styles"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import ViewIcon from "@material-ui/icons/RateReview"
import {connect} from "react-redux"
import TableHead from "@material-ui/core/es/TableHead/TableHead"
import Typography from "@material-ui/core/es/Typography/Typography"

const styles = theme => createStyles({
    table: {
        minWidth: 700,
        marginTop: theme.spacing.unit * 16,
        marginBottom: theme.spacing.unit * 16,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
    noListing: {
        textAlign: 'center'
    },
    divider: {
        marginTop: '20px',
        width: '100%'
    },
    headingHolder: {
        width: '100%',
        marginTop: '10px'
    }
});

const TableSection = props => {
    const {classes, listings} = props

    function createData(id, unitNumber, propertyType, category, location, bedrooms, bathrooms, listingPrice, createdAt) {
        return {id, unitNumber, propertyType, category, location, bedrooms, bathrooms, listingPrice, createdAt};
    }

    function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? "-" : "";

            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;

            return 'AED ' + negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) {
            return amount
        }
    };

    const rows = listings ? listings.map(listing => createData(listing.id, listing.unitNumber, listing.propertyType, listing.category, listing.location, listing.bedrooms, listing.bathrooms, listing.listingPrice, listing.createdAt))
        : [
            createData('1', 8240, 8290, 8140, false),
            createData('2', 8290, 8340, 8140, false),
        ]

    const onViewClick = (id) => {
        props.onClickView(id)
    }


    const onEditClick = (id) => {
        props.onClickEdit(id)
    }

    return (

        <Table className={classes.table}>
            {listings ? listings.length > 0 ? (
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">ID</TableCell>
                            <TableCell align="right">Unit Number</TableCell>
                            <TableCell align="right">Property Type</TableCell>
                            <TableCell align="right">Category</TableCell>
                            <TableCell align="right">Locations</TableCell>
                            <TableCell align="right">Bedrooms</TableCell>
                            <TableCell align="right">Bathrooms</TableCell>
                            <TableCell align="right">Listing Price (AED)</TableCell>
                            <TableCell align="right">Created At</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                ) :
                <Typography className={classes.noListing} component={"h1"} variant={"h5"}>
                    There are no listings to display
                </Typography> :
                <Typography className={classes.noListing} component={"h1"} variant={"h5"}>
                    There are no listings to display
                </Typography>}
            {listings ? (
                <TableBody>
                    {
                        rows.map(row => (
                            <TableRow className={classes.row} key={row.id}>
                                <TableCell align="right">{row.id}</TableCell>
                                <TableCell align="right">{row.unitNumber}</TableCell>
                                <TableCell align="right">{row.propertyType}</TableCell>
                                <TableCell align="right">{row.category}</TableCell>
                                <TableCell align="right">{row.location}</TableCell>
                                <TableCell align="right">{row.bedrooms}</TableCell>
                                <TableCell align="right">{row.bathrooms}</TableCell>
                                <TableCell align="right">{formatMoney(row.listingPrice)}</TableCell>
                                <TableCell align="right">{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell align={"right"}>
                                    <ViewIcon onClick={() => props.onClickView(row.id)}/>
                                    <EditIcon onClick={() => props.onClickEdit(row.id)}/>
                                    <DeleteIcon onClick={() => props.onClickDelete(row.id)}/>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            ) : null}
        </Table>
    )
}

const mapStateToProps = state => {
    return {
        listings: state.listings.listings,
    }
}


export default connect(
    mapStateToProps,
    null
)(withStyles(styles)(TableSection))