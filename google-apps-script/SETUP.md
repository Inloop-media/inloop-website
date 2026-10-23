# Inloop Lead CRM — Setup (Google Sheets)

Website form → **Master sheet** (Lead ID `IM-1`, `IM-2`…) → assign to an executive → the lead lands in that
executive's own sheet → their Status / Remarks / Brief / Meeting updates flow back into Master.

Do this once, signed in to the Google account that owns the Master sheet.

---

## 1. Master sheet script

1. Open the Master sheet → **Extensions → Apps Script**.
2. Delete everything in `Code.gs` and paste the contents of [`master/Code.gs`](master/Code.gs).
3. Click the ⚙️ **Project Settings** → tick **"Show appsscript.json"** → open `appsscript.json` and paste [`master/appsscript.json`](master/appsscript.json) (sets the India time zone).
4. Save (💾).

## 2. Executive template (for meeting scheduling)

Every executive gets a copy of this file, so the meeting script travels with it.

1. Create a new blank Google Sheet named **Inloop Executive Template**.
2. **Extensions → Apps Script** → paste [`executive-template/Code.gs`](executive-template/Code.gs).
3. Left sidebar **Services → + → Google Calendar API → Add** (or paste [`executive-template/appsscript.json`](executive-template/appsscript.json) as in step 1.3).
4. Save. Copy this template sheet's URL.

## 3. Run Setup

1. Go back to the Master sheet and reload it. A new menu **Inloop CRM** appears.
2. **Inloop CRM → 1. Setup (run once)** → allow the permissions Google asks for → paste the template URL from step 2.
3. Setup creates:
   - **Master** tab with all columns, the **Status** dropdown and the **Assigned To** dropdown
   - **Executives** tab
   - The background sync (every 5 minutes) and the edit triggers
4. At the end it shows a **website secret** — keep it for step 5 (you can see it again via **Inloop CRM → Show website secret**).

## 4. Add executives

1. In the **Executives** tab, fill **Executive Name** and their **Gmail** (one per row).
2. **Inloop CRM → 2. Create / refresh executive sheets**.
   Each executive gets their own spreadsheet ("Inloop Leads — Name"), shared with their Gmail. The link appears in the tab.
3. Each executive opens their sheet once → **Inloop → Enable meeting scheduling (run once)** → allows Calendar access.

Run step 4.2 again whenever you add a new executive.

## 4b. Proposal meetings by the ops lead (once)

1. Master Apps Script → **Services → + → Google Calendar API → Add** (or paste `master/appsscript.json`).
2. The ops lead (`OPS_EMAIL`, needs edit access to Master) opens the Master sheet from their own account →
   **Inloop CRM → Enable proposal meetings** → allows the permissions.

## 4c. Slack (optional)

When a proposal meeting is booked, the brief (brand, service interest, meeting time, brief) is posted to a Slack channel.

1. [api.slack.com/apps](https://api.slack.com/apps) → **Create New App → From scratch** → pick your workspace.
2. **Incoming Webhooks** → turn **On** → **Add New Webhook to Workspace** → choose the channel → copy the URL.
3. Master sheet → **Inloop CRM → Connect Slack channel** → paste the URL. A test message appears in the channel.
4. The ops lead runs **Inloop CRM → Enable proposal meetings** once more so Google asks for the new permission.

## 5. Connect the website

1. In the Master sheet's Apps Script: **Deploy → New deployment → Select type: Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - **Deploy** → copy the **Web app URL** (ends with `/exec`).
2. In **Vercel → Project → Settings → Environment Variables**, add:
   - `LEADS_WEBHOOK_URL` = the Web app URL
   - `LEADS_WEBHOOK_SECRET` = the website secret from step 3.4
3. Redeploy the site. For local testing, put the same two lines in `.env.local` (see `.env.example`).

> If you change `Code.gs` later: **Deploy → Manage deployments → ✏️ → Version: New version → Deploy** (the URL stays the same).

---

## How it works day to day

| Who | Does | What happens |
|---|---|---|
| Visitor | Submits the website form | New row in Master: `IM-n`, Date Registered, all details, Status = **New Lead** |
| You | Pick a name in **Assigned To** | Lead copied to that executive's sheet with **Date Assigned**. Changing the name moves it; clearing it removes it |
| Executive | Changes **Status / Remarks / Brief** | Master updates instantly |
| Executive | Sets Status to **Discovery Call**, fills **Meeting Date & Time**, ticks **Schedule Meeting** | Google Calendar event + Meet link from the executive's account, invite to the lead and to the ops lead (`OPS_EMAIL` in `master/Code.gs`); Status → Meeting Scheduled; link shows in Master within ~5 min |
| You | Edit Status / Remarks / Brief in Master | Pushed to the executive's sheet |
| Anyone | Sets Status to **Client Brief Shared to Ops Team** | The lead moves to Ops: the executive's meeting link is cleared from Master and the executive sheet, and from now on Meeting Date & Time / Meeting Link no longer sync with the executive |
| Ops lead | Fills **Meeting Date & Time** in Master, ticks **Schedule Proposal Meeting** | Calendar event + Meet link from the ops lead's account, invite to the client only; link goes in Master's **Meeting Link** (executives never see it) |

Use **Inloop CRM → Sync from executives now** if you don't want to wait for the 5-minute sync.

Status and Assigned To options are colour-coded. After adding a new executive, run **Inloop CRM → Apply dropdown colours** so their name gets a colour too. To change a colour, edit `STATUS_COLORS` / `EXEC_COLORS` in `master/Code.gs`.

### Columns

- **Master:** Lead ID · Date Registered · First Name · Last Name · Contact Number · Email · Brand Name · Location · Service Interest · Estimated Budget · Project Details · Newsletter · Status · Assigned To · Date Assigned · Remarks · Brief · Meeting Date & Time · Meeting Link · Last Updated
- **Executive:** Lead ID · Date Registered · Date Assigned · contact & project details · Status · Remarks · Brief · Meeting Date & Time · Schedule Meeting ☑ · Meeting Link

### Notes

- Don't rename tabs, and don't move, insert or delete columns in the Master / Leads tabs — the scripts find columns by their position (the order in `MASTER_HEADERS` / `EXEC_HEADERS`). To change the order, change it in `Code.gs` first, then match the sheet.
- Lead IDs never repeat, even if rows are deleted.
- Google limits: a free Gmail account can create up to 20 triggers per script — one is used per executive, so up to ~17 executives.
