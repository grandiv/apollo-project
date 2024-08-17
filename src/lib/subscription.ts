// This file is a utility to tell whether a user is a pro member or not

import { getAuthSession } from "./auth";
import { prisma } from "./db";

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const checkSubscription = async () => {
  // Check the session, if there is no user logged in then obviously they are not a pro member
  const session = await getAuthSession();
  if (!session?.user) {
    return false;
  }

  // Check if the user's subscription exists
  const userSubscription = await prisma.userSubscription.findUnique({
    where: {
      userId: session.user.id,
    },
  });
  if (!userSubscription) {
    return false;
  }

  // Check if the user's pro subscription is active
  const isValid =
    userSubscription.stripePriceId && // The user subscription must have a stripePriceId
    // Ex: Period End Date: 2024-09-17 + 1 DAY and today is 2024-09-16 then the user still has valid subscription
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid; // Ex: isValid = true then !!isTrue returns true
};
