import { prisma } from "@/app/prisma";
import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature") as string;

  let event;

  // Verify Stripe event is legitimate
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Webhook signature verification failed. ${err.message}`);
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error("An unexpected error occurred.");
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const subscriptionId = session.subscription as string;
        const email = session.customer_details?.email;

        if (!email) {
          return NextResponse.json(
            { error: "Email is missing from session data" },
            { status: 400 }
          );
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          console.error("User not found for email:", email);
          break;
        }

        const planId = parseInt(session.metadata?.planId || "0", 10);
        const interval = session.metadata?.interval;

        await prisma.subscription.create({
          data: {
            userId: user.id,
            planId,
            interval,
            stripeSubscriptionId: subscriptionId,
            subscriptionStart: new Date(),
            subscriptionEnd: new Date(
              new Date().setMonth(new Date().getMonth() + 1)
            ),
            status: "active",
            isPaid: true,
            trialPeriod: false,
          },
        });

        console.log(`Subscription created for user ID: ${user.id}`);
        break;
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const stripeSubscriptionId = subscription.id;

        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId },
          data: {
            status: "canceled",
          },
        });

        console.log(
          `Subscription canceled, but plan is up till the end od subscription: ${stripeSubscriptionId}`
        );

        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        const stripeSubscriptionId = subscription.id;

        // Zaktualizuj status subskrypcji w bazie danych
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId },
          data: {
            status: "canceled",
            subscriptionEnd: new Date(),
          },
        });

        console.log(`Subscription canceled: ${stripeSubscriptionId}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(`Stripe error: ${e.message} | Event type: ${event.type}`);
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
