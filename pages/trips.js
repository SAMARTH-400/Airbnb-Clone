import Footer from '../components/Footer'
import React from 'react';
import Header from '../components/Header'
import OrderCard from '../components/OrderCard'
import moment from 'moment'
import db from '../firebase'
import{ getSession} from 'next-auth/react'



function trips({orders}) {
    return(
        <div>
            <Header />
            <div className="flex flex-col m-10 pb-10">
                    <div className="flex flex-col">
                        <div className='flex'>
                            <h1 className="text-2xl font-semibold mt-10 mb-10 mx-4">YOUR TRIPS</h1>
                        </div>
                        <div className=''>
                            <div className='w-1/2'>
                                {orders.map( ({id, amount, items, timestamp, images}) =>
                                (
                                    <div className="relative border rounded-md">
                                        <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
                                            <div>
                                                <p className="font-bold text-xs">ORDER PLACED</p>
                                                <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold">TOTAL</p>
                                                <p>{amount}-Next Day Delivery{" "}</p>
                                            </div>
                                            <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">{items.length} items</p>
                                            <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">ORDER # {id}</p>
                                        </div>
                                        <div className="p-5 sm:p-10 ">
                                            <div className="flex space-x-6 overflow-x-auto">    {images.map((image) => (
                                                <img src={image} alt="" className='h-20 object-contain sm:h-32' />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}     
                            </div>
                        </div>
                    </div>
            </div>
            <Footer />
        </div>
    )
}
// 
export async function getServerSideProps(context) {
    // Get the users logged in credentials...
    const session = await getSession(context);
    if (!session) return {props: {}}
    // Firebase db
    const stripeOrders = await db.collection("customers").doc(session.user.email).collection("orders").orderBy("timestamp", "desc").get();   ;
    //   Stripe orders
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) => ({
            id: order.id,
            amount: order.data().amount,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
            await stripe.checkout.sessions.listLineItems(order.id, {
                limit: 100,
            })
            ).data  
        }))
    )
    return {props: {orders}};
  }

export default trips