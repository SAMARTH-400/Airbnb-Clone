import React from 'react';
import Footer from '../components/Footer'
import OrderCard from '../components/OrderCard';
import Header from '../components/Header'
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
                        <div>
                                {orders.map( ({id, amount, items, timestamp, images}) =>
                                (
                                    <OrderCard key={id} id={id} amount={amount} items={items} timestamp={timestamp} images={images}/>
                                ))}     
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