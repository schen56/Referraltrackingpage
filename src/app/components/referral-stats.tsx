import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Users, CheckCircle, Clock, Gift } from "lucide-react";

export type Referral = {
  id: string;
  name: string;
  email: string;
  phone: string;
  zip?: string;
  note?: string;
  status: "pending" | "ready_to_claim" | "claimed" | "expired";
  rewardAmount: number | null; // null until referee's quote is approved ($50, $75, or $100 based on order size)
  giftCardCode?: string; // Amazon gift card claim code, present only after claimed
  dateAdded: string;
};

type ReferralStatsProps = {
  referrals: Referral[];
};

export function ReferralStats({ referrals }: ReferralStatsProps) {
  const totalReferrals = referrals.length;
  const readyToClaim = referrals.filter(
    (r) => r.status === "ready_to_claim"
  ).length;
  const claimedReferrals = referrals.filter(
    (r) => r.status === "claimed"
  ).length;
  const pendingReferrals = referrals.filter(
    (r) => r.status === "pending"
  ).length;

  const stats = [
    {
      title: "Total Referrals",
      value: totalReferrals,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      highlight: false,
    },
    {
      title: "Ready to Claim",
      value: readyToClaim,
      icon: Gift,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      highlight: readyToClaim > 0,
    },
    {
      title: "Claimed",
      value: claimedReferrals,
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      highlight: false,
    },
    {
      title: "Pending",
      value: pendingReferrals,
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      highlight: false,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className={stat.highlight ? "ring-2 ring-orange-400 shadow-md" : ""}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`p-2 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`size-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
