import {
    ADD_LISTING_LOADING,
    ADD_LISTING_SUCCESS,
    ADD_LISTING_ERROR,
    FETCH_ALL_LISTING_ERROR,
    FETCH_ALL_LISTING_LOADING,
    FETCH_ALL_LISTING_SUCCESS,
    FETCH_LISTING_ERROR,
    FETCH_LISTING_LOADING,
    FETCH_LISTING_SUCCESS,
    EDIT_LISTING_ERROR,
    EDIT_LISTING_LOADING,
    EDIT_LISTING_SUCCESS,
    DELETE_LISTING_ERROR,
    DELETE_LISTING_LOADING,
    DELETE_LISTING_SUCCESS,
    SET_CURRENT_LISTING, CLEAR_CURRENT_LISTING
} from '../../actions/types'
import models from "../../models"


//comparing _id and replacing the item in an immutable way
let _editListing = (oldArray, newArrayItem) => {
    for (let i = 0; i < oldArray.length; i++) {
        if (oldArray[i].id.toString() === newArrayItem.id.toString()) {
            const newItem = {
                ...oldArray[i],
                ...newArrayItem
            }
            const newArray = Object.assign([], oldArray, {
                [i]: newItem
            })
            return newArray
        }
    }
}

let _deleteListing = (accounts, account) => {
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].id.toString() === account.id.toString()) {
            return [...accounts.slice(0, i), ...accounts.slice(i + 1)]
        }
    }
}

let _getListing = (listings, listingID) => {
    let listing = null
    for (let i = 0; i < listings.length; i++) {
        if (listings[i].id === listingID)
            listing = listings[i]
    }
    return listing
}

const listingReducer = (state = models.ListingModel, action) => {
    let {
        message, error
    } = action.payload ? action.payload : ''
    switch (action.type) {
        case ADD_LISTING_LOADING:
            return {
                ...state,
                addListing: {
                    ...state.addListing,
                    loading: true,
                    message: '',
                    error: null
                }
            }
        case ADD_LISTING_SUCCESS:
            const {
                listing
            } = action.payload
            return {
                ...state,
                listings: [...state.listings, listing],
                addListing: {
                    ...state.addListing,
                    loading: false,
                    message: message,
                    error: null
                }
            }
        case ADD_LISTING_ERROR:
            return {
                ...state,
                addListing: {
                    ...state.addListing,
                    loading: false,
                    message,
                    error
                }
            }
        case EDIT_LISTING_LOADING:
            return {
                ...state,
                editListing: {
                    ...state.editListing,
                    loading: true,
                    message: '',
                    error: null
                }
            }
        case EDIT_LISTING_SUCCESS:
            return {
                ...state,
                listings: _editListing(state.listings, action.payload.listing),
                editListing: {
                    ...state.editListing,
                    loading: false,
                    message: message,
                    error: null
                }
            }
        case EDIT_LISTING_ERROR:
            return {
                ...state,
                editListing: {
                    ...state.editListing,
                    loading: false,
                    message,
                    error
                }
            }
        case DELETE_LISTING_LOADING:
            return {
                ...state,
                deleteListing: {
                    ...state.deleteListing,
                    loading: true,
                    message: '',
                    error: null
                }
            }
        case DELETE_LISTING_SUCCESS:
            return {
                ...state,
                listings: _deleteListing(state.listings, action.payload.listing),
                deleteListing: {
                    ...state.deleteListing,
                    loading: false,
                    message: message,
                    error: null
                }
            }
        case DELETE_LISTING_ERROR:
            return {
                ...state,
                deleteListing: {
                    ...state.deleteListing,
                    loading: false,
                    message,
                    error
                }
            }
        case FETCH_LISTING_LOADING:
            return {
                ...state,
                fetchListing: {
                    ...state.fetchListing,
                    loading: true,
                    message: '',
                    error: null
                }
            }
        case FETCH_LISTING_SUCCESS:
            return {
                ...state,
                currentListing: action.payload.listing,
                fetchListing: {
                    ...state.fetchListing,
                    loading: false,
                    message: message,
                    error: null
                }
            }
        case FETCH_LISTING_ERROR:
            return {
                ...state,
                fetchListing: {
                    ...state.fetchListing,
                    loading: false,
                    message,
                    error
                }
            }
        case FETCH_ALL_LISTING_LOADING:
            return {
                ...state,
                fetchAllListings: {
                    ...state.fetchAllListings,
                    loading: true,
                    message: '',
                    error: null
                }
            }
        case FETCH_ALL_LISTING_SUCCESS:
            return {
                ...state,
                listings: action.payload.listings,
                fetchAllListings: {
                    ...state.fetchAllListings,
                    loading: false,
                    message: message,
                    error: null
                }
            }
        case FETCH_ALL_LISTING_ERROR:
            return {
                ...state,
                fetchAllListings: {
                    ...state.fetchAllListings,
                    loading: false,
                    message,
                    error
                }
            }
        case SET_CURRENT_LISTING:
            return {
                ...state,
                currentListing: _getListing(state.listings, action.payload.listingID)
            }
        case CLEAR_CURRENT_LISTING:
            return {
                ...state,
                currentListing: action.payload.currentListing
            }
        default:
            return state
    }
}

export default listingReducer