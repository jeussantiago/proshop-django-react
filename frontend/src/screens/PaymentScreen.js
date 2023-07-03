import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";

function PaymentScreen() {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState("paypal");

    // if the user hasn't filled out the shipping address, send them
    // back to the shipping page
    if (!shippingAddress.address) {
        navigate("/shipping");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeorder");
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>

                    <Form.Check
                        name="paymentMethod"
                        label="Paypal or Credit Card"
                        type="radio"
                        id="paypal"
                        value="paypal"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <Form.Check
                        name="paymentMethod"
                        label="Stripe"
                        type="radio"
                        id="stripe"
                        value="stripe"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                </Form.Group>

                <Button type="submit" variant="primary">
                    Continue
                </Button>

                <div>
                    (Paypal is the only method that currently is connected)
                </div>
            </Form>
        </FormContainer>
    );
}

export default PaymentScreen;
