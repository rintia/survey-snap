import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../Providers/AuthProvider';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const CheckOutForm = () => {
    const stripe = useStripe();
    const [error, setError] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const axiosSecure = useAxiosSecure();
    const elements = useElements();
    const {user} = useContext(AuthContext)

    const totalPrice = 200;
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const currentUser = users.find(userdb => userdb.email === user.email);
    console.log(currentUser);
    const {_id} = currentUser;

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, totalPrice])


    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js has not loaded yet. Make sure to disable
          // form submission until Stripe.js has loaded.
          return;
        }
    
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

    
        if (card == null) {
          return;
        }
    
        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card,
        });
    
        if (error) {
          console.log('[error]', error);
          setError(error.message);
        } else {
          console.log('[PaymentMethod]', paymentMethod);
          setError('');
        }

          // confirm payment
          const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }

        else{
            console.log('payment intent', paymentIntent);

            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    name: user.displayName,
                    email: user.email,
                    transactionId: paymentIntent.id,
                    date: moment().toISOString(),  
                    
                }

                const res = await axiosSecure.post(`/payments/${_id}`, payment);
                console.log('payment saved', res.data);

                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you for the payment.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/')
                   
                }
            }
        }

      };
    return (
        <div>
            <div className='flex justify-center'>
            <form className='w-1/2 mt-12' onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <div className='flex justify-center mt-12'>
      <button className='bg-green-400 btn text-2xl text-blue-900  ' type="submit"  disabled={!stripe || !clientSecret}>
        Pay Now
      </button>
     
      </div>
    </form>
            </div>
            <p className="text-red-600">{error}</p>
      {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </div>
    );
};

export default CheckOutForm;