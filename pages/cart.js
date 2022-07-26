import React from 'react'
import Image from 'next/image'
import Footer from '../components/Footer'
import CartCard from '../components/CartCard'
import Header  from '../components/Header'
import {useSession , signIn} from 'next-auth/react';
import {selectItems , selectTotal} from '../slices/basketSlice'
import {useSelector} from 'react-redux';
import {ShoppingCartIcon} from '@heroicons/react/outline'
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.stripe_public_key);

export default function cart() {
  
  const items = useSelector(selectItems); 
  const total = useSelector(selectTotal);
  const { data: session } = useSession();

  const createStripeSession =  async() => {
    const stripe = await stripePromise;
    const res = await axios.post( '/api/checkout_sessions', {
      items: items,
      email: session.user.email
    });
    await stripe.redirectToCheckout({
      sessionId : res.data.id
    });
  };
  
  return (
      <div className=' relative min-h-screen'>
        <Header />
        <div className="flex flex-col m-10 pb-10">
          {items.length > 0 ? 
          <div>
            <div className="flex flex-col">
              <div className='flex'>
                <p className="flex items-center"><ShoppingCartIcon className="h-7" /></p>
                <h1 className="text-2xl font-semibold mt-10 mb-10 mx-4">YOUR CART</h1>
              </div>
              <div className='flex justify-between pr-5'>
                <div className='w-1/2'>{items.map(
                  ({ key, state, hotel_name, img, star, price, amount, guests, lat, long , days}) => (
                    <CartCard key={key} state={state} hotel_name={hotel_name} img={img} star={star} price={price} amount={amount} guests={guests} lat={lat} long={long} days={days} />
                  )
                )}
                </div>
                {/* left */}
                <div className="bg-white shadow-lg rounded-lg h-full w-1/4">
                  <div className="bg-gray-100 text-center px-5 py-6">     
                    <h3 className="text-xl font-semibold text-gray-500 mb-5">SUBTOTAL</h3>
                    <div className="mt-3">{ items.map(item=> 
                      (<div className='mb-3 text-gray-600 text-sm'>₹{item.amount} x {item.days} days = ₹ {item.amount*item.days}</div>)
                      )}
                    </div>
                    <div>----------------------------------</div>
                      <div className='font-bold '>₹ {total}</div> 
                    <div>----------------------------------</div>
                    <button 
                    role="link"
                    className={`mt-5 hover:scale-[1.01] font-semibold text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow transition duration-150 ease-in-out w-full focus:outline-none  text-white focus-visible:ring-2 ${!session ? 'bg-gray-500 hover:bg-gray-600' : 'bg-indigo-500 hover:bg-indigo-600'}`}
                    onClick={session ? createStripeSession : signIn }>
                    {session ? "PROCEED TO PAY" : "SIGNIN TO PROCEED"}
                    </button>
                    
                </div>
            </div>
            </div>
          </div>
          </div>
          : 
            <div className="relative h-[250px] sm:h-[350px] lg:h-[400px] xl:h-[400px] 2xl:h-[400px] item-justify-center">
              <Image src="/static/empty-cart.svg" layout="fill" />  
            </div>
          }
        </div>
        <Footer />
      </div>
  )
}