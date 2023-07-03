import {
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_RESET,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_RESET,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_RESET,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_RESET,
    PRODUCT_UPDATE_SUCCESS,
} from "../constants/productConstants";

// initially state is default to be empty array
export const productListReducers = (state = { products: [] }, action) => {
    switch (action.type) {
        // while the data is being fetched, the current products list is empty
        case PRODUCT_LIST_REQUEST:
            // the object that we send to watch
            return { loading: true, products: [] };

        // when finished ffetching the data, update the state object values
        case PRODUCT_LIST_SUCCESS:
            // what we get back from the api call is the "payload" of data
            return {
                loading: false,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages,
            };

        case PRODUCT_LIST_FAIL:
            // the api will send an error message as the data if it fails, so we can not update the product object
            // but instead update the error object to the error data sent by the api call
            return { loading: false, error: action.payload };

        // if nothing matches our action type, then we want to return the original state
        default:
            return state;
    }
};

export const productDetailsReducers = (
    state = { product: { reviews: [] } },
    action
) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state };

        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };

        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        case PRODUCT_DETAILS_RESET:
            return { product: { reviews: [] } };

        default:
            return state;
    }
};

export const productDeleteReducers = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true };

        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true };

        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload };

        case PRODUCT_DELETE_RESET:
            return {};

        default:
            return state;
    }
};

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true };

        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };

        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload };

        case PRODUCT_CREATE_RESET:
            return {};

        default:
            return state;
    }
};

export const productUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true };

        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };

        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload };

        case PRODUCT_UPDATE_RESET:
            return {};

        default:
            return state;
    }
};

export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true };

        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true };

        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload };

        case PRODUCT_CREATE_REVIEW_RESET:
            return {};

        default:
            return state;
    }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_TOP_REQUEST:
            return { loading: true, products: [] };

        case PRODUCT_TOP_SUCCESS:
            return { loading: false, products: action.payload };

        case PRODUCT_TOP_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
