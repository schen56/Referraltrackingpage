import { useState, useEffect } from "react";
import { ReferralForm, ReferralFormData } from "./components/referral-form";
import { ReferralStats, type Referral } from "./components/referral-stats";
import { ReferralList } from "./components/referral-list";
import { ShareReferral } from "./components/share-referral";
import { AppSidebar } from "./components/app-sidebar";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

const STORAGE_KEY = "referral-tracker-data";

// In production, this comes from the user's profile (profileData.referral_url)
const REFERRAL_LINK = "https://www.ergeon.com/ref/ABC123XYZ";

// Demo data to showcase different referral states
const DEMO_REFERRALS: Referral[] = [
  {
    id: "demo-1",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(512) 555-1234",
    status: "ready_to_claim",
    rewardAmount: 75,
    dateAdded: "2026-02-15T10:00:00Z",
  },
  {
    id: "demo-2",
    name: "Mike Chen",
    email: "mike.c@email.com",
    phone: "(713) 555-5678",
    status: "claimed",
    rewardAmount: 100,
    giftCardCode: "AMZN-Q7K2-X9PL-R4MW",
    dateAdded: "2026-01-20T10:00:00Z",
  },
  {
    id: "demo-3",
    name: "Lisa Park",
    email: "lisa.p@email.com",
    phone: "(214) 555-9012",
    status: "pending",
    rewardAmount: null,
    dateAdded: "2026-03-10T10:00:00Z",
  },
  {
    id: "demo-4",
    name: "James Wilson",
    email: "james.w@email.com",
    phone: "(512) 555-3456",
    status: "pending",
    rewardAmount: null,
    dateAdded: "2026-03-25T10:00:00Z",
  },
];

export default function App() {
  const [referrals, setReferrals] = useState<Referral[]>(DEMO_REFERRALS);

  // Load referrals from localStorage on mount (merged with demo data)
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Merge user-added referrals with demo data
        const demoIds = new Set(DEMO_REFERRALS.map((r) => r.id));
        const userReferrals = parsed.filter((r: Referral) => !demoIds.has(r.id));
        setReferrals([...DEMO_REFERRALS, ...userReferrals]);
      } catch (err) {
        console.error("Failed to parse stored data:", err);
      }
    }
  }, []);

  // Save referrals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(referrals));
  }, [referrals]);

  const handleClaimReward = (id: string) => {
    // In production, this calls the backend which returns the gift card code
    const demoCode = "AMZN-" + Math.random().toString(36).substring(2, 6).toUpperCase()
      + "-" + Math.random().toString(36).substring(2, 6).toUpperCase()
      + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();
    setReferrals((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "claimed" as const, giftCardCode: demoCode } : r
      )
    );
    toast.success("Reward claimed! We've also sent the gift card code to your email.");
  };

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
    <AppSidebar>
      <div className="max-w-4xl space-y-6">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Refer and Earn!
          </h1>
          <p className="text-gray-600">
            Earn <strong>up to $100 in rewards</strong> when you refer Ergeon to
            a friend or family member — and{" "}
            <strong>they'll get up to $100 off</strong> their project too!
          </p>
          <a
            href="https://www.ergeon.com/help/202403315"
            target="_blank"
            rel="noreferrer"
            className="inline-block text-sm text-blue-600 hover:text-blue-800 underline"
          >
            How does the referral program work?
          </a>
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
            <ReferralList referrals={referrals} onClaim={handleClaimReward} />
          </div>
        </div>

        {/* Help & Policy */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500 border-t border-gray-200 pt-4">
          <a
            href="https://www.ergeon.com/help/202403315"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Referral Policy Details
          </a>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span>
            Questions about your referrals?{" "}
            <a
              href="mailto:support@ergeon.com?subject=Referral%20Program%20Question"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Contact support
            </a>
          </span>
        </div>
      </div>

      <Toaster />
    </AppSidebar>
  );
}
