import dotenv from "dotenv";
import stripePackage from "stripe";

dotenv.config();

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {
  const { amount } = JSON.parse(event.body);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
}
