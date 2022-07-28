import Footer from '../components/Footer'
import Header from '../components/Header'
import Order from '../components/Order'
import moment from 'moment'
import{useSession , getSession} from 'next-auth/react'

function trips(orders) {
    return(
        <div>
            <Header />
            <div className="flex flex-col m-10 pb-10">
                    <div className="flex flex-col">
                        <div className='flex'>
                            <h1 className="text-2xl font-semibold mt-10 mb-10 mx-4">YOUR TRIPS</h1>
                        </div>
                        <div className='flex justify-between pr-5'>
                            <div className='w-1/2'>
                                {orders?.map( ({id, amount, amountShipping, items, timestamp, images})=>
                                {
                                    <Order key={id} id={id} amount={amount}amountShipping={amountShipping} items={items} timestamp={timestamp} images={images}/>
                                })}    
                            </div>
                        </div>
                    </div>
            </div>
            <Footer />
        </div>
    )
}
export async function getServerSideProps(context){
    const session = await getSession(context);
    if(!session) return{
        props: {}
    }
    const stripeOrders = await db.collection('users').doc(session.user.email).collection('orders').orderBy("timestamp", "decs").get();
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(order.id, {
                limit: 100,
            })
          ).data,
        }))
      );
    return {
        props : {
            orders
        }
    }
}  

export default trips