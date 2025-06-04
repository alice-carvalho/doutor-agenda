import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import db from "@/db";
import { usersTable } from "@/db/schema";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-05-28.basil",
});

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("Stripe secret key not found");
  }
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    throw new Error("Stripe signature not found");
  }
  const text = await request.text();

  try {
    const event = stripe.webhooks.constructEvent(
      text,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    console.log("Webhook recebido:", event.type);
    console.log("Dados do evento:", JSON.stringify(event.data.object, null, 2));

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Session ID:", session.id);
        console.log("Customer:", session.customer);
        console.log("Subscription:", session.subscription);

        if (!session.subscription || !session.customer) {
          throw new Error("Dados da sessão incompletos");
        }

        // Buscar detalhes da subscription
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string,
        );

        console.log(
          "Dados da subscription:",
          JSON.stringify(subscription, null, 2),
        );

        // Verificar metadata do usuário
        const userId = subscription.metadata.userId;
        if (!userId) {
          throw new Error("ID do usuário não encontrado nos metadados");
        }

        console.log("User ID encontrado:", userId);

        // Atualizar usuário no banco
        try {
          await db
            .update(usersTable)
            .set({
              stripeSubscriptionId: subscription.id,
              stripeCustomerId: session.customer as string,
              plan: "essential",
            })
            .where(eq(usersTable.id, userId));

          console.log("Usuário atualizado com sucesso:", {
            userId,
            subscriptionId: subscription.id,
            customerId: session.customer,
          });
        } catch (dbError) {
          console.error("Erro ao atualizar banco:", dbError);
          throw dbError;
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("Subscription cancelada:", subscription.id);

        const userId = subscription.metadata.userId;
        if (!userId) {
          throw new Error("ID do usuário não encontrado");
        }

        try {
          await db
            .update(usersTable)
            .set({
              stripeSubscriptionId: null,
              stripeCustomerId: null,
              plan: null,
            })
            .where(eq(usersTable.id, userId));

          console.log(
            "Assinatura removida com sucesso para o usuário:",
            userId,
          );
        } catch (dbError) {
          console.error("Erro ao atualizar banco:", dbError);
          throw dbError;
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    console.error("Erro no webhook:", error);
    if (error instanceof Error) {
      console.error("Stack do erro:", error.stack);
    }
    return new NextResponse(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Erro desconhecido",
      }),
      { status: 400 },
    );
  }
};
