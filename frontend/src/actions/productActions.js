import axios from "axios";
import {
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
} from "../constants/productConstants";

// redux thunk allows to make asynchronous request and make function within a function
// dispatch is the action
// in the function, we specificy it's other key:value pairs like the type and payload
export const listProducts =
    (keyword = "") =>
    async (dispatch) => {
        try {
            dispatch({ type: PRODUCT_LIST_REQUEST });

            // proxy set in package.json to default to port 8000 when making these api calls. full api name is http://127.0.0.1:8000/api/products/
            const { data } = await axios.get(`/api/products${keyword}`);

            dispatch({
                type: PRODUCT_LIST_SUCCESS,
                payload: data,
            });
        } catch (err) {
            dispatch({
                type: PRODUCT_LIST_FAIL,
                payload:
                    // was previously data.message since thats the default message
                    // but in the backend, we named it 'detail' now its data.detail
                    // example can be found in base/views/user_views unser registerUser function in except block
                    err.response && err.response.data.detail
                        ? err.response.data.detail
                        : err.message,
            });
        }
    };

export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_REQUEST });

        // proxy set in package.json to default to port 8000 when making these api calls. full api name is http://127.0.0.1:8000/api/products/
        const { data } = await axios.get(`/api/products/top/`);

        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data,
        });
    } catch (err) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload:
                // was previously data.message since thats the default message
                // but in the backend, we named it 'detail' now its data.detail
                // example can be found in base/views/user_views unser registerUser function in except block
                err.response && err.response.data.detail
                    ? err.response.data.detail
                    : err.message,
        });
    }
};

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (err) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                err.response && err.response.data.detail
                    ? err.response.data.detail
                    : err.message,
        });
    }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/products/delete/${id}/`, config);

        dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (err) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload:
                err.response && err.response.data.detail
                    ? err.response.data.detail
                    : err.message,
        });
    }
};

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // since its a post request, we need to send in some data
        // for creating a product, we create a default product and send the user
        // to the edit product page, but we still need to send in data even though
        // its not needed
        const { data } = await axios.post(`/api/products/create/`, {}, config);

        dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload:
                err.response && err.response.data.detail
                    ? err.response.data.detail
                    : err.message,
        });
    }
};

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.put(
            `/api/products/update/${product._id}/`,
            product,
            config
        );

        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });

        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload:
                err.response && err.response.data.detail
                    ? err.response.data.detail
                    : err.message,
        });
    }
};

export const createProductReview =
    (productId, review) => async (dispatch, getState) => {
        try {
            dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

            const {
                userLogin: { userInfo },
            } = getState();

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.post(
                `/api/products/${productId}/reviews/`,
                review,
                config
            );

            dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS, payload: data });
        } catch (err) {
            dispatch({
                type: PRODUCT_CREATE_REVIEW_FAIL,
                payload:
                    err.response && err.response.data.detail
                        ? err.response.data.detail
                        : err.message,
            });
        }
    };
