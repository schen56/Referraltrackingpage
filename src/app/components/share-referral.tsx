import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Share2, Mail, Facebook, Copy, Check } from "lucide-react";
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
    const subject = encodeURIComponent("Join me with this exclusive referral!");
    const body = encodeURIComponent(
      `Hey! I wanted to share this exclusive referral link with you:\n\n${referralLink}\n\nSign up and we both get rewarded!`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(referralLink);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank",
      "width=600,height=400"
    );
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
            onClick={handleFacebookShare}
            className="flex-1 gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white"
          >
            <Facebook className="size-4" />
            Share on Facebook
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
