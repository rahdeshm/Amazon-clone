import {CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvide';
import axios from "axios";

function Payment() {
    const[{basket,user},dispatch] = useStateValue();
    const stripe=useStripe();
    const elements=useElements();
    const navigate=useNavigate();
    
    const[error,setError]=useState(null);
    const[disabled,setDisabled]=useState(true);
    const[processing,setProcessing]=useState('');
    const[successed,setSuccessed]=useState(true);
    const[clientSecret,setClientSecret]=useState(true);
    
    useEffect(()=>{
      //generate stripe secret
      const getClientSecret=async ()=>{
        const response=await axios({
          method:'post',
          //stripe expects the total in currencies subunits
          url:`/payment/create?total=${getBasketTotal(basket)*100}`
        });
        setClientSecret(response.data.clientSecret)
      }

      getClientSecret();
    },[basket])
      console.log('the secrete is ',clientSecret)
    const handleSubmit= async (event)=>{
          event.preventDefault();
          setProcessing(true);

          const payload=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
              card:elements.getElement(CardElement)
            }
          }).then(({paymentIntent})=>{

            setSuccessed(true)
            setError(null)
            setProcessing(false)

            navigate('/orders')
          })

    }
    const handleChange=(event)=>{
      setDisabled(event.empty);
      setError(event.error? event.error:'')
    }
    return (
        <div className='payment'>
          <div className="payment__container">
            <h1>
              checkout(
               <Link to='/checkout'>{basket?.length} items</Link>
                 )  
            </h1>
            {/*payment section- delivery address*/}
              <div className="payment__section">
                   <div className="payment__title">
                      <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                       <p>{user?.email}</p>
                       <p>26,Saraswati</p>
                       <p>Chhatrapati Road</p>
                       <p>Latur, Maharashtra</p>
                    </div>
               </div>
          

               <div className="payment__section">
                  <div className="payment__title">
                  <h3>Review items and delivery</h3>
                  </div>
                  <div className="payment__Items">                     {basket.map(item=>(
                       <CheckoutProduct
                       id={item.id}
                       title={item.title}
                       image={item.image}
                       price={item.price}
                       rating={item.rating}
                     />))}
                     </div>

              </div>
            
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Payment Method</h3>
                </div>
                <div className="payment__details">
                    {/*Stripe magic here*/}

                    <form onSubmit={handleSubmit}>                    
                      <CardElement onChange={handleChange}/>
                      <div className="payment__priceContainer">
                      <CurrencyFormat
                        renderText={(value)=>(
                         <>
                            <h3>Order value: {value}</h3>
                         </>
                      )}
                      decimalScale={2}
                      value={getBasketTotal(basket)}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={"$"}
                      />
                      <button 
                      disabled={processing||disabled||successed}>
                        <span>{processing?<p>Processing</p>:
                        'Buy Now'
                        }</span>               
                      </button>
                      </div> 
                      <div>
                       {error && <div>{error}</div>}
                      </div>
                    </form>
                </div>   
            </div>
         </div>   
        </div>
    )
}

export default Payment
