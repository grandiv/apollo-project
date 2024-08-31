import SubscriptionButton from "@/components/SubscriptionButton";
import { checkSubscription } from "@/lib/subscription";
import React from "react";

type Props = {};

const SettingsPage = async (props: Props) => {
  const isPro = await checkSubscription();
  return (
    <div className="py-24 mx-auto max-w-7xl">
      <h1 className="text-5xl font-bold">Settings</h1>
      {isPro ? (
        <p className="text-xl py-4 text-secondary-foreground/60">
          You are a pro member.
        </p>
      ) : (
        <p className="text-xl text-secondary-foreground/60">
          You are a free member.
        </p>
      )}
      <SubscriptionButton isPro={isPro} />
    </div>
  );
};

export default SettingsPage;
