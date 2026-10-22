/**
 * Inloop Media — Lead CRM · EXECUTIVE TEMPLATE script
 *
 * Paste into the "Inloop Executive Template" spreadsheet: Extensions → Apps Script → Code.gs
 * and turn on the Google Calendar API service (Services → + → Google Calendar API).
 * The Master script copies this template for every executive, so each copy carries this code.
 *
 * Each executive opens their sheet once and runs "Inloop → Enable meeting scheduling".
 * After that, filling "Meeting Date & Time" and ticking "Schedule Meeting" creates a
 * Google Calendar event with a Meet link from THEIR account, invites the lead and the
 * Master owner, writes the link into the sheet and sets Status to "Meeting Scheduled".
 * The Master sheet picks the link up within a few minutes.
 */

const LEADS_TAB = "Leads";
const CONFIG_TAB = "_config";
const MEETING_MINUTES = 30;

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Inloop")
    .addItem("Enable meeting scheduling (run once)", "enableScheduling")
    .addItem("Schedule meeting for selected row", "scheduleSelected")
    .addToUi();
}

function enableScheduling() {
  ScriptApp.getProjectTriggers().forEach((t) => {
    if (t.getHandlerFunction() === "onLeadsEdit") ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger("onLeadsEdit").forSpreadsheet(SpreadsheetApp.getActive()).onEdit().create();
  // Touch the calendar once so Google asks for permission now, not on the first meeting
  Calendar.CalendarList.list({ maxResults: 1 });
  SpreadsheetApp.getUi().alert(
    "Meeting scheduling is on ✅\n\nFill 'Meeting Date & Time' for a lead, then tick 'Schedule Meeting'. A Google Meet invite goes to the lead and to Inloop."
  );
}

function header_(sheet) {
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String);
}

function config_(key) {
  const sh = SpreadsheetApp.getActive().getSheetByName(CONFIG_TAB);
  if (!sh) return "";
  const row = sh.getRange(1, 1, sh.getLastRow(), 2).getValues().find((r) => r[0] === key);
  return row ? String(row[1]) : "";
}

/** Installable onEdit (created by enableScheduling) — runs as the executive. */
function onLeadsEdit(e) {
  const sheet = e.range.getSheet();
  if (sheet.getName() !== LEADS_TAB || e.range.getRow() < 2) return;
  const head = header_(sheet);
  const scheduleCol = head.indexOf("Schedule Meeting") + 1;
  if (e.range.getColumn() !== scheduleCol || e.range.getNumColumns() !== 1) return;
  for (let r = e.range.getRow(); r < e.range.getRow() + e.range.getNumRows(); r++) {
    if (sheet.getRange(r, scheduleCol).getValue() === true) scheduleRow_(sheet, r, head);
  }
}

function scheduleSelected() {
  const sheet = SpreadsheetApp.getActiveSheet();
  if (sheet.getName() !== LEADS_TAB) return SpreadsheetApp.getUi().alert("Open the 'Leads' tab and select a lead's row.");
  const r = sheet.getActiveRange().getRow();
  if (r < 2) return;
  scheduleRow_(sheet, r, header_(sheet));
}

function scheduleRow_(sheet, r, head) {
  const col = (h) => head.indexOf(h) + 1;
  const get = (h) => sheet.getRange(r, col(h)).getValue();
  const ss = SpreadsheetApp.getActive();

  if (String(get("Meeting Link")).trim()) {
    ss.toast("A meeting is already scheduled for this lead. Clear 'Meeting Link' to book a new one.", "Inloop", 6);
    return;
  }
  const start = get("Meeting Date & Time");
  if (!(start instanceof Date)) {
    sheet.getRange(r, col("Schedule Meeting")).setValue(false);
    ss.toast("Fill 'Meeting Date & Time' first (e.g. 25/10/2026 15:30), then tick again.", "Inloop", 8);
    return;
  }

  const name = [get("First Name"), get("Last Name")].filter(String).join(" ");
  const company = get("Brand Name");
  const leadEmail = String(get("Email")).trim();
  const masterEmail = config_("MASTER_EMAIL");
  const end = new Date(start.getTime() + MEETING_MINUTES * 60000);

  const attendees = [];
  if (leadEmail) attendees.push({ email: leadEmail });
  if (masterEmail && masterEmail !== Session.getActiveUser().getEmail()) attendees.push({ email: masterEmail });

  const event = Calendar.Events.insert(
    {
      summary: `Inloop Media × ${company || name || "Introductory Call"}`,
      description: welcomeMessage_(get("First Name"), company, get("Service Interest")),
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() },
      attendees,
      conferenceData: {
        createRequest: { requestId: Utilities.getUuid(), conferenceSolutionKey: { type: "hangoutsMeet" } },
      },
    },
    "primary",
    { conferenceDataVersion: 1, sendUpdates: "all" }
  );

  const link =
    event.hangoutLink ||
    ((event.conferenceData && event.conferenceData.entryPoints) || []).map((p) => p.uri).find((u) => /meet\.google/.test(u)) ||
    event.htmlLink;

  sheet.getRange(r, col("Meeting Link")).setValue(link);
  sheet.getRange(r, col("Status")).setValue("Meeting Scheduled");
  ss.toast(`Meeting booked ✅ Invite sent to ${attendees.map((a) => a.email).join(", ") || "you"}.`, "Inloop", 8);
}

/** Text the lead sees in the calendar invite. */
function welcomeMessage_(firstName, company, service) {
  const execName = config_("EXECUTIVE_NAME");
  const about = company ? `${company}` : "your brand";
  const help = service && !/not sure/i.test(service) ? ` with ${service}` : "";
  return [
    `Hi ${firstName || "there"},`,
    "",
    `Thank you for reaching out to Inloop Media. We're excited to learn more about ${about} and how we can help${help}.`,
    "",
    "On this call we'll understand your goals, walk you through how we work, and answer any questions you may have.",
    "",
    "Looking forward to speaking with you.",
    "",
    "Warm regards,",
    execName ? `${execName}\nInloop Media` : "Team Inloop Media",
  ].join("\n");
}
