# Referral Notification Flow

Complete list of all messages sent as part of the referral program.

---

## Share Messages (sent BY the referrer to their friend)

### Share via Email
Triggered when referrer clicks "Share via Email" button on the referrals page.

**Subject:** You've been referred to Ergeon!

**Body:**
```
You've been referred to Ergeon!

Ergeon designs and builds fences, decks, patios, driveways, and other outdoor
projects — handling everything from permits to installation.

Redeem your referral and save up to $100 on your project.

Next Steps:

1. Click the link below
2. Provide some details about you and your project
3. Click "Get your FREE Quote"

{{referral_url}}

That's it! We'll contact you within 24 hours, and your discount will
automatically be applied!

Sincerely,
The Ergeon Team
```

### Share via Text (SMS)
Triggered when referrer clicks "Share via Text" button on the referrals page.

```
Hey! I used Ergeon for my fence/deck/patio project — they handle everything
from design to installation and it was a great experience. Use my referral
link and you'll get up to $100 off your project: {{referral_url}}
```

---

## System Notifications (sent BY Ergeon automatically)

### #1 — Referral Created (EXISTS TODAY)
- **Channel:** SMS
- **To:** Referrer
- **Trigger:** Referral is submitted
- **Template code:** `cx_referral_confirmation`

```
Hi {{referring_user}}, thanks for referring {{referred_user}}! We will be
validating the contact and if all checks out, you'll receive a gift card
from us shortly. Know anyone else? Share your referral link: {{link}} .
Thanks for your support!
```

### #2 — Referee Gets an Order (EXISTS TODAY)
- **Channel:** SMS
- **To:** Referee
- **Trigger:** Referred user has an order created
- **Template code:** `referral_lead_notification`

```
Hi {{lead_name}}, your friend {{referring_user_first_name}} sent you our way.
Ergeon will contact you shortly about your {{project_type}} project.
```

### #3 — Reward Ready to Claim (NEW)
- **Channel:** SMS
- **To:** Referrer
- **Trigger:** Ops approves the reward (status -> `ready_to_claim`)

```
Hi {{referring_user}}, great news! Your {{amount}} Amazon gift card for
referring {{referred_user}} is ready. Claim it now:
https://www.ergeon.com/app/referrals/
```

### #4 — Reward Ready to Claim (NEW)
- **Channel:** Email
- **To:** Referrer
- **Trigger:** Same as #3 (sent alongside SMS)

**Subject:** Your {{amount}} Ergeon referral reward is ready!

**Body:**
```
Hi {{referring_user}},

Your referral of {{referred_user}} paid off! Your {{amount}} Amazon gift card
is ready to claim.

[Claim My Reward] (button linking to /app/referrals/)

Thanks for spreading the word about Ergeon!
```

### #5 — Reward Claimed (NEW)
- **Channel:** Email
- **To:** Referrer
- **Trigger:** Customer clicks "Confirm Claim" on the referrals page

**Subject:** Your {{amount}} Amazon gift card code

**Body:**
```
Hi {{referring_user}},

Here's your Amazon gift card code:

{{gift_card_code}}

To redeem, visit amazon.com/gc and enter the code above.

Know someone else who could use Ergeon? Refer another friend and earn up to
$100: https://www.ergeon.com/app/referrals/
```

### #6 — 30-Day Nudge (NEW)
- **Channel:** SMS
- **To:** Referrer
- **Trigger:** Reward unclaimed for 30 days (celery periodic task)

```
Hi {{referring_user}}, you still have a {{amount}} Amazon gift card waiting!
Claim it before it expires: https://www.ergeon.com/app/referrals/
```

### #7 — 90-Day Unclaimed Alert (NEW)
- **Channel:** Internal (Slack or email)
- **To:** Ops team
- **Trigger:** Reward unclaimed for 90 days (celery periodic task)

```
Referral #{{referral_id}}: {{referring_user}}'s {{amount}} reward has been
unclaimed for 90 days.
```

---

## Referral Status Lifecycle

```
Referral submitted          -> "pending"        (#1 SMS to referrer, #2 SMS to referee)
Referee pays                -> "eligible"       (internal, no notification)
Ops approves reward         -> "ready_to_claim" (#3 SMS + #4 Email to referrer)
Customer claims on page     -> "claimed"        (#5 Email with gift card code)
30 days unclaimed           ->                  (#6 SMS nudge to referrer)
90 days unclaimed           ->                  (#7 Internal alert to ops)
Referral invalid/cancelled  -> "expired"        (no notification)
```
