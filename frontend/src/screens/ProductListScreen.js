import React, { useEffect } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import {
    createProduct,
    deleteProduct,
    listProducts,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import {
    PRODUCT_CREATE_RESET,
    PRODUCT_DELETE_RESET,
} from "../constants/productConstants";

function ProductListScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const keyword = location["search"];

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, pages, page } = productList;

    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete;

    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });
        dispatch({ type: PRODUCT_DELETE_RESET });

        if (!userInfo || !userInfo.isAdmin) {
            // prevent non admin users from accessing admin pages
            navigate("/login");
        }

        if (successCreate) {
            // once the default product is created, send the staff to the
            // edit page to update the values of the sample product
            navigate(`/admin/product/${createdProduct._id}/edit`);
        } else {
            dispatch(listProducts(keyword));
        }
    }, [
        dispatch,
        navigate,
        userInfo,
        successDelete,
        successCreate,
        createdProduct,
        keyword,
    ]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this Product?")) {
            dispatch(deleteProduct(id));
        }
    };

    const createProductHandler = (product) => {
        dispatch(createProduct());
    };

    return (
        <div>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fas fa-plus"></i> Create Product
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}

            {loadingCreate && <Loader />}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div>
                    <Table striped bordered hover className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {products ? (
                                products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>

                                        <td>
                                            <LinkContainer
                                                to={`/admin/product/${product._id}/edit`}
                                            >
                                                <Button
                                                    variant="light"
                                                    className="btn-sm"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button
                                                variant="danger"
                                                className="btn-sm"
                                                onClick={() =>
                                                    deleteHandler(product._id)
                                                }
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr key={1}></tr>
                            )}
                        </tbody>
                    </Table>
                    <Paginate pages={pages} page={page} isAdmin={true} />
                </div>
            )}
        </div>
    );
}

export default ProductListScreen;
