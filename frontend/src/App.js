import { Container } from "react-bootstrap";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import OrderListScreen from "./screens/OrderListScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import UserEditScreen from "./screens/UserEditScreen";
import UserListScreen from "./screens/UserListScreen";

function App() {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Routes>
                        <Route path="/" element={<HomeScreen />} exact />
                        <Route path="/login" element={<LoginScreen />} />
                        <Route path="/register" element={<RegisterScreen />} />
                        <Route path="/profile" element={<ProfileScreen />} />
                        <Route path="/shipping" element={<ShippingScreen />} />
                        <Route path="/payment" element={<PaymentScreen />} />
                        <Route
                            path="/placeorder"
                            element={<PlaceOrderScreen />}
                        />
                        <Route
                            path="/order/:orderId"
                            element={<OrderScreen />}
                        />
                        <Route
                            path="/product/:id"
                            element={<ProductScreen />}
                        />
                        {/* the '?' means that we don't always need the id parameter, can get to 
                        cart path without the id parameter and just "/cart" */}
                        <Route path="/cart/:id?" element={<CartScreen />} />
                        <Route
                            path="/admin/userlist"
                            element={<UserListScreen />}
                        />
                        <Route
                            path="/admin/user/:userId/edit"
                            element={<UserEditScreen />}
                        />
                        <Route
                            path="/admin/productlist"
                            element={<ProductListScreen />}
                        />
                        <Route
                            path="/admin/product/:productId/edit"
                            element={<ProductEditScreen />}
                        />
                        <Route
                            path="/admin/orderlist"
                            element={<OrderListScreen />}
                        />
                    </Routes>
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
