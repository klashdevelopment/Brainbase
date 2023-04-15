const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_TEST);
const subscription = await stripe.subscriptions.create({
  customer: 'cus_NgVp6FYG5SEh0w',
  items: [
    {price: 'price_1MqQXJDYkvSrcR3YD6mvgFb0'},
  ],
});