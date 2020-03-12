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
    SET_CURRENT_LISTING
} from '../../actions/types'
import AxiosInstance from "../../../axios"
import {API_ENDPOINTS} from '../../../constants'
import {CLEAR_CURRENT_LISTING} from "../types"

const {LISTINGS} = API_ENDPOINTS

export const addListing = listingDetails => {
    return dispatch => {
        dispatch({
            type: ADD_LISTING_LOADING
        })
        return AxiosInstance.post(LISTINGS, listingDetails)
            .then(response => {
                const payload = {
                    listing: response.data.payload.listing,
                }
                return dispatch({
                    type: ADD_LISTING_SUCCESS,
                    payload
                })
            })
            .catch(err => dispatch({
                type: ADD_LISTING_ERROR,
                payload: {
                    message: err.response ? err.response.data.message ? err.response.data.message : err.message : err.message,
                    error: err
                }
            }))
    }
}


export const editListing = (listingID, listingDetails) => {
    return dispatch => {
        dispatch({
            type: EDIT_LISTING_LOADING
        })
        return AxiosInstance.put(LISTINGS + "/" + listingID, listingDetails)
            .then(response => {
                const payload = {
                    listing: response.data.payload.listing,
                    listingID
                }
                return dispatch({
                    type: EDIT_LISTING_SUCCESS,
                    payload
                })
            })
            .catch(err => dispatch({
                type: EDIT_LISTING_ERROR,
                payload: {
                    message: err.response ? err.response.data.message ? err.response.data.message : err.message : err.message,
                    error: err
                }
            }))
    }
}

export const deleteListing = (listingID) => {
    return dispatch => {
        dispatch({
            type: DELETE_LISTING_LOADING
        })
        return AxiosInstance.delete(LISTINGS + "/" + listingID)
            .then(response => {
                const payload = {
                    listing: response.data.payload.listing,
                    listingID
                }
                return dispatch({
                    type: DELETE_LISTING_SUCCESS,
                    payload
                })
            })
            .catch(err => dispatch({
                type: DELETE_LISTING_ERROR,
                payload: {
                    message: err.response ? err.response.data.message ? err.response.data.message : err.message : err.message,
                    error: err
                }
            }))
    }
}


export const getListing = (listingID) => {
    return async dispatch => {
        dispatch({
            type: FETCH_LISTING_LOADING
        })
        return AxiosInstance.get(LISTINGS + '/' + listingID)
            .then(response => {
                const payload = {
                    listing: response.data.payload.listing,
                    listingID
                }
                return dispatch({
                    type: FETCH_LISTING_SUCCESS,
                    payload
                })
            })
            .catch(err => dispatch({
                type: FETCH_LISTING_ERROR,
                payload: {
                    message: err.response ? err.response.data.message ? err.response.data.message : err.message : err.message,
                    error: err
                }
            }))
    }
}


export const getAllListing = (listingID) => {
    return async dispatch => {
        dispatch({
            type: FETCH_ALL_LISTING_LOADING
        })
        return AxiosInstance.get(LISTINGS)
            .then(response => {
                const payload = {
                    listings: response.data.payload.listings,
                }
                return dispatch({
                    type: FETCH_ALL_LISTING_SUCCESS,
                    payload
                })
            })
            .catch(err => dispatch({
                type: FETCH_ALL_LISTING_ERROR,
                payload: {
                    message: err.response ? err.response.data.message ? err.response.data.message : err.message : err.message,
                    error: err
                }
            }))
    }
}

export const setCurrentListing = (listingID) => {
    return async dispatch => {
        dispatch({
            type: SET_CURRENT_LISTING,
            payload: {
                listingID
            }
        })
    }
}

export const clearCurrentListing = (values) =>{
    return async dispatch => {
        dispatch({
            type: CLEAR_CURRENT_LISTING,
            payload: {
                currentListing:values
            }
        })
    }
}