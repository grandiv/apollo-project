import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const settingsUrl = process.env.NEXTAUTH_URL + "/settings";

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Finding the subscription
    const userSubscription = await prisma.userSubscription.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    // Cancel at the billing portal
    // If the userSubscription exists, and they have already paid before to manage the subscription
    if (userSubscription && userSubscription.stripeCustomerId) {
      // stripeSession is used for the user to manage their account
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl, // User will be redirected to the settings page (/settings)
      });
      // It will return billing page
      return NextResponse.json({ url: stripeSession.url });
    }

    // User's first time subscribing
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: session.user.email ?? "",
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "APOLLO Pro",
              description: "Unlimited course generation.",
            },
            unit_amount: 2000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      // To know who exactly paid the subscription then we can update the database to update their account
      metadata: {
        userId: session.user.id,
      },
    });
    // It will return the checkout page
    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.log("[STRIPE ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
