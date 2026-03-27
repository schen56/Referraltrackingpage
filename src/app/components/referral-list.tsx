import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Mail, Phone, Calendar, Gift, Copy, Check, Eye, EyeOff } from "lucide-react";
import { Referral } from "./referral-stats";

type ReferralListProps = {
  referrals: Referral[];
  onClaim?: (id: string) => void;
};

const STATUS_CONFIG: Record<
  Referral["status"],
  { label: string; color: string }
> = {
  pending: {
    label: "Pending",
    color: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  },
  ready_to_claim: {
    label: "Reward Ready!",
    color: "bg-orange-100 text-orange-800 hover:bg-orange-100",
  },
  claimed: {
    label: "Claimed",
    color: "bg-green-100 text-green-800 hover:bg-green-100",
  },
  expired: {
    label: "Expired",
    color: "bg-gray-100 text-gray-600 hover:bg-gray-100",
  },
};

export function ReferralList({ referrals, onClaim }: ReferralListProps) {
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
                <div className="shrink-0">
                  {referral.status === "ready_to_claim" && referral.rewardAmount && (
                    <ClaimButton
                      amount={referral.rewardAmount}
                      onClaim={() => onClaim?.(referral.id)}
                    />
                  )}
                  {referral.status === "claimed" && referral.rewardAmount && referral.giftCardCode && (
                    <ClaimedReward
                      amount={referral.rewardAmount}
                      code={referral.giftCardCode}
                    />
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

function ClaimButton({ amount, onClaim }: { amount: number; onClaim: () => void }) {
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <Button
        onClick={() => setConfirming(true)}
        className="gap-2 bg-orange-500 hover:bg-orange-600 text-white"
      >
        <Gift className="size-4" />
        Claim ${amount} Reward
      </Button>
    );
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <p className="text-sm text-gray-600">
        We'll email your Amazon gift card code too.
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setConfirming(false)}
        >
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={onClaim}
          className="gap-1 bg-orange-500 hover:bg-orange-600 text-white"
        >
          <Gift className="size-4" />
          Confirm Claim
        </Button>
      </div>
    </div>
  );
}

function ClaimedReward({ amount, code }: { amount: number; code: string }) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const maskedCode = code.slice(0, 4) + "-****-" + code.slice(-4);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-end gap-1.5">
      <span className="text-sm font-medium text-green-600">
        ${amount} Amazon Gift Card
      </span>
      <div className="flex items-center gap-1.5">
        <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
          {revealed ? code : maskedCode}
        </code>
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          onClick={() => setRevealed(!revealed)}
          title={revealed ? "Hide code" : "Show code"}
        >
          {revealed ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          onClick={handleCopy}
          title="Copy code"
        >
          {copied ? (
            <Check className="size-3.5 text-green-600" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </Button>
      </div>
      <span className="text-xs text-gray-400">Also sent to your email</span>
    </div>
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
