import {
    FETCH_PROPERTY_TYPE_LOADING,
    FETCH_PROPERTY_TYPE_ERROR,
    FETCH_PROPERTY_TYPE_SUCCESS,
    FETCH_CATEGORY_ERROR,
    FETCH_CATEGORY_LOADING,
    FETCH_CATEGORY_SUCCESS,
    FETCH_LISTING_TYPE_ERROR,
    FETCH_LISTING_TYPE_LOADING,
    FETCH_LISTING_TYPE_SUCCESS
} from '../../actions/types'
import AxiosInstance from "../../../axios"
import {API_ENDPOINTS} from '../../../constants'

const {MISC} = API_ENDPOINTS

export const getListingTypes = () => {
    return async dispatch => {
        dispatch({
            type: FETCH_LISTING_TYPE_LOADING
        })
        return AxiosInstance.get(MISC + 'listing-type')
            .then(response => {
                const payload = {
                    listingTypes: response.data.payload.listingTypes,
                }
                return dispatch({
                    type: FETCH_LISTING_TYPE_SUCCESS,
                    payload
                })
            })
            .catch(err => dispatch({
                type: FETCH_LISTING_TYPE_ERROR,
                payload: {
                    message: err.response ? err.response.data.message ? err.response.data.message : err.message : err.message,
                    error: err
                }
            }))
    }
}


export const getPropertyTypes = () => {
    return async dispatch => {
        dispatch({
            type: FETCH_PROPERTY_TYPE_LOADING
        })
        return AxiosInstance.get(MISC + 'property-type')
            .then(response => {
                const payload = {
                    propertyTypes: response.data.payload.propertyTypes,
                }
                return dispatch({
                    type: FETCH_PROPERTY_TYPE_SUCCESS,
                    payload
                })
            })
            .catch(err => dispatch({
                type: FETCH_PROPERTY_TYPE_ERROR,
                payload: {
                    message: err.response ? err.response.data.message ? err.response.data.message : err.message : err.message,
                    error: err
                }
            }))
    }
}


export const getCategories = () => {
    return async dispatch => {
        dispatch({
            type: FETCH_CATEGORY_LOADING
        })
        return AxiosInstance.get(MISC + 'category')
            .then(response => {
                const payload = {
                    category: response.data.payload.category,
                }
                return dispatch({
                    type: FETCH_CATEGORY_SUCCESS,
                    payload
                })
            })
            .catch(err => dispatch({
                type: FETCH_CATEGORY_ERROR,
                payload: {
                    message: err.response ? err.response.data.message ? err.response.data.message : err.message : err.message,
                    error: err
                }
            }))
    }
}