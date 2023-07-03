import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import Product from "../components/Product";
import ProductCarousel from "../components/ProductCarousel";
// import products from "../products";

function HomeScreen() {
    // const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const location = useLocation();
    const keyword = location["search"];

    const productList = useSelector((state) => state.productList);
    const { error, loading, products, page, pages } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword));
    }, [dispatch, keyword]);

    return (
        <div>
            {!keyword && <ProductCarousel />}

            <h1>Latest Products</h1>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lr={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate page={page} pages={pages} keyword={keyword} />
                </div>
            )}
        </div>
    );
}

export default HomeScreen;
