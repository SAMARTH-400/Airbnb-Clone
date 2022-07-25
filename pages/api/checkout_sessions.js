const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function (req, res){
  const {items,email} = req.body; 
  
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 200,
        },
        quantity: 1,
      },
    ] ,
    mode: 'payment',
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/canceled`,
    metadata: {
      email
    }
  });
  res.status(200).json({id : session.id});
}