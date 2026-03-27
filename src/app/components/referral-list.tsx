import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Mail, Phone, Calendar } from "lucide-react";
import { Referral } from "./referral-stats";

type ReferralListProps = {
  referrals: Referral[];
};

const STATUS_CONFIG: Record<
  Referral["status"],
  { label: string; color: string }
> = {
  pending: {
    label: "Pending",
    color: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  },
  quote_approved: {
    label: "Quote Approved",
    color: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  },
  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-800 hover:bg-green-100",
  },
  expired: {
    label: "Expired",
    color: "bg-gray-100 text-gray-600 hover:bg-gray-100",
  },
};

export function ReferralList({ referrals }: ReferralListProps) {
  if (referrals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <UsersIcon className="size-12 mx-auto mb-4 opacity-50" />
            <p className="font-medium">No referrals yet</p>
            <p className="text-sm mt-1">
              Add referrals to track your network and earn rewards.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Referrals ({referrals.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {referrals.map((referral) => {
            const statusConfig = STATUS_CONFIG[referral.status];
            return (
              <div
                key={referral.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors gap-3"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{referral.name}</h3>
                    <Badge className={statusConfig.color}>
                      {statusConfig.label}
                    </Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Mail className="size-3" />
                      <span>{referral.email}</span>
                    </div>
                    {referral.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="size-3" />
                        <span>{referral.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      <span>
                        {new Date(referral.dateAdded).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  {referral.rewardAmount !== null ? (
                    <>
                      <div className="font-bold text-lg text-green-600">
                        ${referral.rewardAmount}
                      </div>
                      <div className="text-xs text-gray-500">Reward</div>
                    </>
                  ) : (
                    <>
                      <div className="font-medium text-gray-400">--</div>
                      <div className="text-xs text-gray-400">
                        Awaiting quote
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
