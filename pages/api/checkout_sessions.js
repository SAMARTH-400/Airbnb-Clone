const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function (req, res){
  const {items,email} = req.body; 
  const stripeItem = items.map( (item) => ({
    quantity:1,
    price_data:{
      unit_amount: 100*parseInt( item.price.substring(1).split(" ")[0] ),
      currency: 'usd',
      product_data: {
        name: item.location,
        images: [item.img]
      },
    }
  }));
  const session = await stripe.checkout.sessions.create({
    line_items: stripeItem,
    mode: 'payment',
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/canceled`,
    metadata: {
      email
    }
  });
  res.status(200).json({id : session.id});
}