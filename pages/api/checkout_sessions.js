const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function (req, res){
  const {items,email} = req.body; 
  const stripeItem = items.map( (item) => ({
    quantity:1,
    price_data:{
      unit_amount: 100 * item.amount,
      currency: 'inr',
      product_data: {
        name: item.hotel_name,
        images: [item.img]
      },
    }
  }));
  const session = await stripe.checkout.sessions.create({
    line_items: stripeItem,
    mode: 'payment',
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/cart`,
    metadata: {
      email,
      images: JSON.stringify(items.map(item=>item.img))
    }
  });
  res.status(200).json({id : session.id});
}