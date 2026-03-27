import { useState, useEffect } from "react";
import { ReferralForm, ReferralFormData } from "./components/referral-form";
import { ReferralStats, Referral } from "./components/referral-stats";
import { ReferralList } from "./components/referral-list";
import { ShareReferral } from "./components/share-referral";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

const STORAGE_KEY = "referral-tracker-data";

// In production, this comes from the user's profile (profileData.referral_url)
const REFERRAL_LINK = "https://www.ergeon.com/ref/ABC123XYZ";

export default function App() {
  const [referrals, setReferrals] = useState<Referral[]>([]);

  // Load referrals from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setReferrals(parsed);
      } catch (err) {
        console.error("Failed to parse stored data:", err);
      }
    }
  }, []);

  // Save referrals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(referrals));
  }, [referrals]);

  const handleAddReferral = (data: ReferralFormData) => {
    const newReferral: Referral = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      zip: data.zip,
      note: data.note,
      status: "pending",
      rewardAmount: null, // Determined after referee's quote is approved
      dateAdded: new Date().toISOString(),
    };

    setReferrals((prev) => [newReferral, ...prev]);
    toast.success("Referral added successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Refer and Earn!
          </h1>
          <p className="text-gray-600">
            Earn <strong>up to $100 in rewards</strong> when you refer Ergeon to
            a friend or family member — and{" "}
            <strong>they'll get up to $100 off</strong> their project too!
          </p>
        </div>

        {/* Stats */}
        <ReferralStats referrals={referrals} />

        {/* Share Section */}
        <ShareReferral referralLink={REFERRAL_LINK} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form - Takes 1 column on large screens */}
          <div className="lg:col-span-1">
            <ReferralForm onSubmit={handleAddReferral} />
          </div>

          {/* List - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <ReferralList referrals={referrals} />
          </div>
        </div>

        {/* Policy link */}
        <div className="text-center text-sm text-gray-500">
          <a
            href="https://www.ergeon.com/help/202403315"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-gray-700"
          >
            Referral Policy Details
          </a>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
