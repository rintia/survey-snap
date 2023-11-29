import React from 'react';
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from './CheckOutForm';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    return (
        <div>
            <h1 className='my-12 text-4xl text-green-600 font-semibold text-center'>Pay ony 200$ to Become Pro-User</h1>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                </Elements>
                </div>
        </div>
    );
};

export default Payment;