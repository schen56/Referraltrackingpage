import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Share2, Mail, MessageCircle, Copy, Check } from "lucide-react";
import { useState } from "react";

type ShareReferralProps = {
  referralLink: string;
};

export function ShareReferral({ referralLink }: ShareReferralProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent("You've been referred to Ergeon!");
    const body = encodeURIComponent(
      `You've been referred to Ergeon!\n\nRedeem your referral and save on your future project with Ergeon.\n\nNext Steps:\n\n1. Click the link below\n2. Provide some details about you and your project\n3. Click "Get your FREE Quote"\n\n${referralLink}\n\nThat's it! We'll contact you within 24 hours, and your discount will automatically be applied!\n\nSincerely,\nThe Ergeon Team`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  };

  const handleSMSShare = () => {
    const body = encodeURIComponent(
      `Hey! I used Ergeon for my outdoor project and had a great experience. Use my referral link and you'll get up to $100 off: ${referralLink}`
    );
    window.open(`sms:?&body=${body}`, "_blank");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="size-5" />
          Share Your Referral Link
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 p-3 bg-gray-100 rounded-md text-sm font-mono break-all">
            {referralLink}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopyLink}
            className="shrink-0"
          >
            {copied ? (
              <Check className="size-4 text-green-600" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={handleEmailShare}
            className="flex-1 gap-2"
            variant="outline"
          >
            <Mail className="size-4" />
            Share via Email
          </Button>
          <Button
            onClick={handleSMSShare}
            className="flex-1 gap-2"
            variant="outline"
          >
            <MessageCircle className="size-4" />
            Share via Text
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
