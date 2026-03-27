import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DollarSign, Users, CheckCircle, Clock } from "lucide-react";

export type Referral = {
  id: string;
  name: string;
  email: string;
  status: "pending" | "completed" | "rejected";
  giftcardAmount: number;
  dateAdded: string;
};

type ReferralStatsProps = {
  referrals: Referral[];
};

export function ReferralStats({ referrals }: ReferralStatsProps) {
  const totalAmount = referrals
    .filter((r) => r.status === "completed")
    .reduce((sum, r) => sum + r.giftcardAmount, 0);

  const totalReferrals = referrals.length;
  const completedReferrals = referrals.filter(
    (r) => r.status === "completed"
  ).length;
  const pendingReferrals = referrals.filter(
    (r) => r.status === "pending"
  ).length;

  const stats = [
    {
      title: "Total Earned",
      value: `$${totalAmount.toFixed(2)}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Referrals",
      value: totalReferrals,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Completed",
      value: completedReferrals,
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      title: "Pending",
      value: pendingReferrals,
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
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
