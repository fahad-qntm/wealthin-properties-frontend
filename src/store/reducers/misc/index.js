import {
    FETCH_PROPERTY_TYPE_ERROR,
    FETCH_PROPERTY_TYPE_SUCCESS,
    FETCH_PROPERTY_TYPE_LOADING,
    FETCH_CATEGORY_ERROR,
    FETCH_CATEGORY_SUCCESS,
    FETCH_CATEGORY_LOADING,
    FETCH_LISTING_TYPE_ERROR,
    FETCH_LISTING_TYPE_SUCCESS,
    FETCH_LISTING_TYPE_LOADING
} from '../../actions/types'
import models from "../../models"

const miscReducer = (state = models.MiscModal, action) => {
    let {
        message, error
    } = action.payload ? action.payload : ''
    switch (action.type) {
        case FETCH_PROPERTY_TYPE_LOADING:
            return {
                ...state,
                fetchPropertyTypes: {
                    ...state.fetchPropertyTypes,
                    loading: true,
                    message: '',
                    error: null
                }
            }
        case FETCH_PROPERTY_TYPE_SUCCESS:
            return {
                ...state,
                propertyTypes: action.payload.propertyTypes,
                fetchPropertyTypes: {
                    ...state.fetchPropertyTypes,
                    loading: false,
                    message: message,
                    error: null
                }
            }
        case FETCH_PROPERTY_TYPE_ERROR:
            return {
                ...state,
                fetchPropertyTypes: {
                    ...state.fetchPropertyTypes,
                    loading: false,
                    message,
                    error
                }
            }
        case FETCH_CATEGORY_LOADING:
            return {
                ...state,
                fetchCategories: {
                    ...state.fetchCategories,
                    loading: true,
                    message: '',
                    error: null
                }
            }
        case FETCH_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: action.payload.category,
                fetchCategories: {
                    ...state.fetchCategories,
                    loading: false,
                    message: message,
                    error: null
                }
            }
        case FETCH_CATEGORY_ERROR:
            return {
                ...state,
                fetchCategories: {
                    ...state.fetchCategories,
                    loading: false,
                    message,
                    error
                }
            }
        case FETCH_LISTING_TYPE_LOADING:
            return {
                ...state,
                fetchListingTypes: {
                    ...state.fetchListingTypes,
                    loading: true,
                    message: '',
                    error: null
                }
            }
        case FETCH_LISTING_TYPE_SUCCESS:
            return {
                ...state,
                listingTypes: action.payload.listingTypes,
                fetchListingTypes: {
                    ...state.fetchListingTypes,
                    loading: false,
                    message: message,
                    error: null
                }
            }
        case FETCH_LISTING_TYPE_ERROR:
            return {
                ...state,
                fetchListingTypes: {
                    ...state.fetchListingTypes,
                    loading: false,
                    message,
                    error
                }
            }
        default:
            return state
    }
}

export default miscReducer