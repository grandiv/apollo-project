import SubscriptionButton from "@/components/SubscriptionButton";
import { checkSubscription } from "@/lib/subscription";
import React from "react";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

type Props = {};

const SettingsPage = async (props: Props) => {
  const isPro = await checkSubscription();
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  } else {
    return (
      <div className="py-24 mx-auto max-w-7xl">
        <h1 className="text-5xl font-bold">Settings</h1>
        {isPro ? (
          <p className="text-xl py-4 text-secondary-foreground/60">
            You are a pro member.
          </p>
        ) : (
          <p className="text-xl py-4 text-secondary-foreground/60">
            You are a free member.
          </p>
        )}
        <SubscriptionButton isPro={isPro} />
      </div>
    );
  }
};

export default SettingsPage;
