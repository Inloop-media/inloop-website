/**
 * Inloop Media — Lead CRM · MASTER sheet script
 *
 * Paste into the Master spreadsheet: Extensions → Apps Script → Code.gs
 * Then reload the sheet and run "Inloop CRM → 1. Setup" once (see SETUP.md).
 *
 * What it does
 *  - Receives website form leads (doPost) → new row in "Master" with Lead ID IM-1, IM-2 … and Date Registered
 *  - Status / Assigned To dropdowns
 *  - Assigning a lead copies it into that executive's own spreadsheet (+ Date Assigned)
 *  - Executive updates to Status, Remarks, Brief and meetings flow back into Master
 *  - Edits made in Master to those columns are pushed to the executive's sheet
 */

const CFG = {
  MASTER_TAB: "Master",
  EXECUTIVES_TAB: "Executives",
  EXEC_LEADS_TAB: "Leads",
  EXEC_CONFIG_TAB: "_config",
  LEAD_PREFIX: "IM-",
  DATE_FORMAT: "dd-mmm-yyyy hh:mm am/pm",
  SYNC_EVERY_MINUTES: 5,
  // Ops lead: guest on every meeting an executive books, and organiser of the ops meeting booked from Master
  OPS_EMAIL: "arushi@inloopmedia.com",
  OPS_NAME: "Arushi Pant",
  OPS_MEETING_MINUTES: 30,
};

const STATUSES = [
  "New Lead",
  "First Call / Touchbase",
  "Follow-up Scheduled",
  "Discovery Call",
  "Meeting Scheduled",
  "In-Person Meeting",
  "Client Brief Shared to Ops Team",
  "Proposal Deck in Making",
  "Strategy / Proposal Discussion",
  "Negotiation",
  "Awaiting Client Decision",
  "Won",
  "On Hold",
  "No Response",
  "Lost Lead",
];

const MASTER_HEADERS = [
  "Lead ID",
  "Date Registered",
  "First Name",
  "Last Name",
  "Contact Number",
  "Email",
  "Brand Name",
  "Location",
  "Service Interest",
  "Estimated Budget",
  "Project Details",
  "Newsletter",
  "Status",
  "Schedule Proposal Meeting",
  "Assigned To",
  "Date Assigned",
  "Remarks",
  "Brief",
  "Meeting Date & Time",
  "Meeting Link",
  "Last Updated",
];

// Picking this status hands the lead to Ops: the executive's meeting link is cleared and, from then on,
// Meeting Date & Time / Meeting Link in Master belong to the proposal meeting and never reach the executive.
const OPS_HANDOFF_STATUS = "Client Brief Shared to Ops Team";
const MEETING_FIELDS = ["Meeting Date & Time", "Meeting Link"];

const EXEC_HEADERS = [
  "Lead ID",
  "Date Registered",
  "Date Assigned",
  "First Name",
  "Last Name",
  "Contact Number",
  "Email",
  "Brand Name",
  "Location",
  "Service Interest",
  "Estimated Budget",
  "Project Details",
  "Status",
  "Remarks",
  "Brief",
  "Meeting Date & Time",
  "Schedule Meeting",
  "Meeting Link",
];

// Columns kept in sync between Master and the executive sheets
const SYNCED = ["Status", "Remarks", "Brief", "Meeting Date & Time", "Meeting Link"];
// Lead details copied from Master into an executive sheet on assignment
const COPIED = [
  "Lead ID",
  "Date Registered",
  "First Name",
  "Last Name",
  "Contact Number",
  "Email",
  "Brand Name",
  "Location",
  "Service Interest",
  "Estimated Budget",
  "Project Details",
];

// Colour of each Status option: [background, text]
const STATUS_COLORS = {
  "New Lead": ["#dbeafe", "#1e40af"],
  "First Call / Touchbase": ["#e0f2fe", "#075985"],
  "Follow-up Scheduled": ["#fef3c7", "#92400e"],
  "Discovery Call": ["#cffafe", "#155e75"],
  "Meeting Scheduled": ["#ede9fe", "#5b21b6"],
  "In-Person Meeting": ["#f3e8ff", "#6b21a8"],
  "Client Brief Shared to Ops Team": ["#e0e7ff", "#3730a3"],
  "Proposal Deck in Making": ["#fce7f3", "#9d174d"],
  "Strategy / Proposal Discussion": ["#fae8ff", "#86198f"],
  "Negotiation": ["#ffedd5", "#9a3412"],
  "Awaiting Client Decision": ["#fef9c3", "#854d0e"],
  "Won": ["#bbf7d0", "#14532d"],
  "On Hold": ["#e5e7eb", "#374151"],
  "No Response": ["#f1f5f9", "#64748b"],
  "Lost Lead": ["#fecaca", "#991b1b"],
};
// Colours handed out to executives in the Assigned To column, in Executives-tab order
const EXEC_COLORS = [
  ["#d1fae5", "#065f46"],
  ["#fee2e2", "#991b1b"],
  ["#dbeafe", "#1e40af"],
  ["#fef3c7", "#92400e"],
  ["#ede9fe", "#5b21b6"],
  ["#fce7f3", "#9d174d"],
  ["#cffafe", "#155e75"],
  ["#ffedd5", "#9a3412"],
  ["#e5e7eb", "#374151"],
  ["#ecfccb", "#3f6212"],
];

const mCol = (name) => MASTER_HEADERS.indexOf(name) + 1;
const eCol = (name) => EXEC_HEADERS.indexOf(name) + 1;
const props = () => PropertiesService.getScriptProperties();

/* ------------------------------------------------------------------ */
/* Menu + setup                                                        */
/* ------------------------------------------------------------------ */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Inloop CRM")
    .addItem("1. Setup (run once)", "setup")
    .addItem("2. Create / refresh executive sheets", "ensureExecutiveSheets")
    .addSeparator()
    .addItem("Sync from executives now", "syncFromExecutives")
    .addItem("Fix executive sheet rows", "compactExecutiveSheets")
    .addItem("Apply dropdown colours", "applyAllColors")
    .addItem("Show website secret", "showSecret")
    .addSeparator()
    .addItem("Enable proposal meetings (" + CFG.OPS_NAME.split(" ")[0] + ", run once)", "enableProposalMeetings")
    .addItem("Schedule proposal meeting for selected row", "scheduleProposalSelected")
    .addItem("Connect Slack channel", "connectSlack")
    .addToUi();
}

function setup() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActive();
  props().setProperty("MASTER_ID", ss.getId());

  // Executive template (holds the meeting-scheduling script)
  if (!props().getProperty("TEMPLATE_ID")) {
    const res = ui.prompt(
      "Executive template",
      "Paste the URL of the 'Inloop Executive Template' spreadsheet (see SETUP.md step 2):",
      ui.ButtonSet.OK_CANCEL
    );
    if (res.getSelectedButton() !== ui.Button.OK) return;
    const id = extractId_(res.getResponseText());
    if (!id) return ui.alert("That doesn't look like a Google Sheets URL. Run Setup again.");
    props().setProperty("TEMPLATE_ID", id);
  }

  // Master tab
  let master = ss.getSheetByName(CFG.MASTER_TAB);
  if (!master) {
    const first = ss.getSheets()[0];
    master = first.getLastRow() === 0 && first.getName() === "Sheet1" ? first.setName(CFG.MASTER_TAB) : ss.insertSheet(CFG.MASTER_TAB, 0);
  }
  styleHeader_(master, MASTER_HEADERS);
  ensureRows_(master, 1000);
  applyMasterRules_(master, 2, master.getMaxRows() - 1);
  applyMasterColors_(master);

  // Executives tab
  let execs = ss.getSheetByName(CFG.EXECUTIVES_TAB) || ss.insertSheet(CFG.EXECUTIVES_TAB);
  styleHeader_(execs, ["Executive Name", "Email", "Sheet Link", "Sheet ID"]);
  execs.setColumnWidth(1, 200).setColumnWidth(2, 260).setColumnWidth(3, 360);
  execs.hideColumns(4);

  // Website secret + ID counter
  if (!props().getProperty("SECRET")) props().setProperty("SECRET", Utilities.getUuid().replace(/-/g, ""));
  if (!props().getProperty("LAST_ID")) props().setProperty("LAST_ID", String(maxExistingId_(master)));

  installTriggers_();
  ensureExecutiveSheets();

  ui.alert(
    "Inloop CRM is ready ✅",
    "Next: add your executives (name + Gmail) in the 'Executives' tab, then run 'Inloop CRM → 2. Create / refresh executive sheets'.\n\n" +
      "Website secret (put this in Vercel as LEADS_WEBHOOK_SECRET):\n" + props().getProperty("SECRET"),
    ui.ButtonSet.OK
  );
}

function showSecret() {
  SpreadsheetApp.getUi().alert("LEADS_WEBHOOK_SECRET", props().getProperty("SECRET") || "Run Setup first", SpreadsheetApp.getUi().ButtonSet.OK);
}

function installTriggers_() {
  const keep = ["onMasterEdit", "syncFromExecutives"];
  ScriptApp.getProjectTriggers().forEach((t) => {
    if (keep.includes(t.getHandlerFunction())) ScriptApp.deleteTrigger(t);
  });
  const ss = SpreadsheetApp.getActive();
  ScriptApp.newTrigger("onMasterEdit").forSpreadsheet(ss).onEdit().create();
  ScriptApp.newTrigger("syncFromExecutives").timeBased().everyMinutes(CFG.SYNC_EVERY_MINUTES).create();
}

function styleHeader_(sheet, headers) {
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold").setBackground("#000000").setFontColor("#ffffff").setVerticalAlignment("middle");
  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 34);
}

function ensureRows_(sheet, n) {
  if (sheet.getMaxRows() < n) sheet.insertRowsAfter(sheet.getMaxRows(), n - sheet.getMaxRows());
}

function statusRule_() {
  return SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).setAllowInvalid(false).build();
}

function applyMasterRules_(sheet, startRow, numRows) {
  if (numRows < 1) return;
  const execs = masterSS_().getSheetByName(CFG.EXECUTIVES_TAB);
  sheet.getRange(startRow, mCol("Status"), numRows).setDataValidation(statusRule_());
  if (execs) {
    const assignRule = SpreadsheetApp.newDataValidation().requireValueInRange(execs.getRange("A2:A"), true).setAllowInvalid(false).build();
    sheet.getRange(startRow, mCol("Assigned To"), numRows).setDataValidation(assignRule);
  }
  ["Date Registered", "Date Assigned", "Meeting Date & Time", "Last Updated"].forEach((h) =>
    sheet.getRange(startRow, mCol(h), numRows).setNumberFormat(CFG.DATE_FORMAT)
  );
  // Checkbox rule only (no FALSE values written), so getLastRow() still ends at the last lead
  sheet.getRange(startRow, mCol("Schedule Proposal Meeting"), numRows).setDataValidation(SpreadsheetApp.newDataValidation().requireCheckbox().build());
  sheet.getRange(startRow, mCol("Remarks"), numRows).setWrap(true);
  sheet.getRange(startRow, mCol("Brief"), numRows).setWrap(true);
}

/* ------------------------------------------------------------------ */
/* Website → Master (Web App)                                          */
/* ------------------------------------------------------------------ */

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (!body.secret || body.secret !== props().getProperty("SECRET")) return json_({ ok: false, error: "unauthorized" });

    const master = masterSS_().getSheetByName(CFG.MASTER_TAB);
    const id = CFG.LEAD_PREFIX + nextId_();
    const now = new Date();
    const row = MASTER_HEADERS.map(() => "");
    const set = (h, v) => (row[mCol(h) - 1] = v == null ? "" : String(v).slice(0, 5000));

    set("Lead ID", id);
    row[mCol("Date Registered") - 1] = now;
    set("First Name", body.firstName);
    set("Last Name", body.lastName);
    set("Contact Number", body.phone ? "'" + body.phone : "");
    set("Email", body.email);
    set("Brand Name", body.company);
    set("Location", body.location);
    set("Service Interest", body.service);
    set("Estimated Budget", body.budget);
    set("Project Details", body.message);
    set("Newsletter", body.newsletter ? "Yes" : "No");
    set("Status", "New Lead");
    row[mCol("Last Updated") - 1] = now;

    // Write right under the last Lead ID (appendRow would skip past checkboxes / stray cells further down)
    const target = lastLeadRow_(master) + 1;
    if (target > master.getMaxRows()) {
      master.insertRowsAfter(master.getMaxRows(), 100);
      applyMasterRules_(master, target, 100);
    }
    master.getRange(target, 1, 1, row.length).setValues([row]);
    return json_({ ok: true, id });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, service: "Inloop CRM" });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function nextId_() {
  const n = Number(props().getProperty("LAST_ID") || 0) + 1;
  props().setProperty("LAST_ID", String(n));
  return n;
}

function maxExistingId_(master) {
  const last = master.getLastRow();
  if (last < 2) return 0;
  return master
    .getRange(2, mCol("Lead ID"), last - 1)
    .getValues()
    .map((r) => Number(String(r[0]).replace(CFG.LEAD_PREFIX, "")) || 0)
    .reduce((a, b) => Math.max(a, b), 0);
}

/* ------------------------------------------------------------------ */
/* Executives                                                          */
/* ------------------------------------------------------------------ */

function getExecutives_() {
  const sh = masterSS_().getSheetByName(CFG.EXECUTIVES_TAB);
  if (!sh || sh.getLastRow() < 2) return [];
  return sh
    .getRange(2, 1, sh.getLastRow() - 1, 4)
    .getValues()
    .map((r, i) => ({ row: i + 2, name: String(r[0]).trim(), email: String(r[1]).trim(), id: String(r[3]).trim() }))
    .filter((x) => x.name);
}

/** Creates a personal spreadsheet for every executive that doesn't have one yet. */
function ensureExecutiveSheets() {
  const execsTab = masterSS_().getSheetByName(CFG.EXECUTIVES_TAB);
  const templateId = props().getProperty("TEMPLATE_ID");
  if (!templateId) throw new Error("Run 'Inloop CRM → 1. Setup' first.");
  const ownerEmail = Session.getEffectiveUser().getEmail();

  getExecutives_().forEach((ex) => {
    if (ex.id) {
      // Existing sheet: just refresh its settings (e.g. a new meeting guest)
      try {
        writeExecConfig_(SpreadsheetApp.openById(ex.id), ex, ownerEmail);
      } catch (err) {
        console.warn("Could not update settings for " + ex.name + ": " + err);
      }
      return;
    }
    const file = DriveApp.getFileById(templateId).makeCopy("Inloop Leads — " + ex.name);
    const ss = SpreadsheetApp.openById(file.getId());

    let leads = ss.getSheetByName(CFG.EXEC_LEADS_TAB) || ss.getSheets()[0].setName(CFG.EXEC_LEADS_TAB);
    styleHeader_(leads, EXEC_HEADERS);
    ensureRows_(leads, 500);
    applyExecRules_(leads, 2, leads.getMaxRows() - 1);
    applyColors_(leads, [eCol("Status")], STATUS_COLORS);

    writeExecConfig_(ss, ex, ownerEmail);

    if (ex.email) {
      try {
        file.addEditor(ex.email);
      } catch (err) {
        console.warn("Could not share with " + ex.email + ": " + err);
      }
    }

    execsTab.getRange(ex.row, 3).setValue(ss.getUrl());
    execsTab.getRange(ex.row, 4).setValue(file.getId());
    ScriptApp.newTrigger("onExecutiveEdit").forSpreadsheet(ss).onEdit().create();
  });

  // Refresh the Assigned To dropdown so new names show up
  const master = masterSS_().getSheetByName(CFG.MASTER_TAB);
  if (master) {
    applyMasterRules_(master, 2, master.getMaxRows() - 1);
    applyMasterColors_(master);
  }
}

/* ------------------------------------------------------------------ */
/* Dropdown colours (conditional formatting — survives new leads)      */
/* ------------------------------------------------------------------ */

/** Replaces the colour rules on the given columns; other conditional formatting is kept. */
function applyColors_(sheet, cols, colors) {
  const n = sheet.getMaxRows() - 1;
  if (n < 1) return;
  const others = sheet.getConditionalFormatRules().filter((r) => !r.getRanges().some((g) => cols.includes(g.getColumn())));
  const rules = [];
  cols.forEach((c) => {
    const range = sheet.getRange(2, c, n);
    Object.keys(colors).forEach((value) => {
      const [bg, fg] = colors[value];
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo(value).setBackground(bg).setFontColor(fg).setBold(true).setRanges([range]).build());
    });
  });
  sheet.setConditionalFormatRules(others.concat(rules));
}

function applyMasterColors_(master) {
  const execColors = {};
  getExecutives_().forEach((ex, i) => (execColors[ex.name] = EXEC_COLORS[i % EXEC_COLORS.length]));
  applyColors_(master, [mCol("Status")], STATUS_COLORS);
  applyColors_(master, [mCol("Assigned To")], execColors);
}

/** Menu: colours the Status + Assigned To dropdowns in Master and Status in every executive sheet. */
function applyAllColors() {
  const master = masterSS_().getSheetByName(CFG.MASTER_TAB);
  if (master) applyMasterColors_(master);
  getExecutives_().forEach((ex) => {
    const sh = execLeadsSheet_(ex);
    if (sh) applyColors_(sh, [eCol("Status")], STATUS_COLORS);
  });
  SpreadsheetApp.getActive().toast("Dropdown colours applied 🎨", "Inloop CRM", 5);
}

/** Hidden _config tab the executive's meeting script reads. */
function writeExecConfig_(ss, ex, ownerEmail) {
  const cfg = ss.getSheetByName(CFG.EXEC_CONFIG_TAB) || ss.insertSheet(CFG.EXEC_CONFIG_TAB);
  cfg.clearContents();
  cfg.getRange(1, 1, 4, 2).setValues([
    ["MASTER_EMAIL", ownerEmail],
    ["EXECUTIVE_NAME", ex.name],
    ["EXECUTIVE_EMAIL", ex.email],
    ["MEETING_GUEST", CFG.OPS_EMAIL],
  ]);
  cfg.hideSheet();
}

function applyExecRules_(sheet, startRow, numRows) {
  sheet.getRange(startRow, eCol("Status"), numRows).setDataValidation(statusRule_());
  sheet.getRange(startRow, eCol("Schedule Meeting"), numRows).insertCheckboxes();
  ["Date Registered", "Date Assigned", "Meeting Date & Time"].forEach((h) =>
    sheet.getRange(startRow, eCol(h), numRows).setNumberFormat(CFG.DATE_FORMAT)
  );
  const dateRule = SpreadsheetApp.newDataValidation().requireDate().setAllowInvalid(false).setHelpText("Pick a date, then type the time e.g. 25/10/2026 15:30").build();
  sheet.getRange(startRow, eCol("Meeting Date & Time"), numRows).setDataValidation(dateRule);
  sheet.getRange(startRow, eCol("Remarks"), numRows).setWrap(true);
  sheet.getRange(startRow, eCol("Brief"), numRows).setWrap(true);
}

function execByName_(name) {
  return getExecutives_().find((x) => x.name === name);
}

function execLeadsSheet_(ex) {
  if (!ex || !ex.id) return null;
  return SpreadsheetApp.openById(ex.id).getSheetByName(CFG.EXEC_LEADS_TAB);
}

/** Last row with a Lead ID — getLastRow() can't be used because the checkbox column fills every row. */
function lastLeadRow_(sheet) {
  const last = sheet.getLastRow();
  if (last < 2) return 1;
  const ids = sheet.getRange(2, eCol("Lead ID"), last - 1).getValues();
  for (let i = ids.length - 1; i >= 0; i--) if (String(ids[i][0]).trim()) return i + 2;
  return 1;
}

function findRowById_(sheet, idCol, leadId) {
  const last = sheet.getLastRow();
  if (last < 2) return 0;
  const ids = sheet.getRange(2, idCol, last - 1).getValues();
  for (let i = 0; i < ids.length; i++) if (String(ids[i][0]) === String(leadId)) return i + 2;
  return 0;
}

/** Moves every lead row in each executive sheet up so they start at row 2 with no gaps. */
function compactExecutiveSheets() {
  let moved = 0;
  getExecutives_().forEach((ex) => {
    const sh = execLeadsSheet_(ex);
    if (!sh || sh.getLastRow() < 2) return;
    const n = sh.getLastRow() - 1;
    const rows = sh.getRange(2, 1, n, EXEC_HEADERS.length).getValues().filter((r) => String(r[eCol("Lead ID") - 1]).trim());
    sh.getRange(2, 1, n, EXEC_HEADERS.length).clearContent();
    sh.getRange(2, eCol("Schedule Meeting"), n).setValue(false);
    if (rows.length) sh.getRange(2, 1, rows.length, EXEC_HEADERS.length).setValues(rows);
    moved += rows.length;
  });
  SpreadsheetApp.getActive().toast(`Executive sheets tidied — ${moved} lead(s) now start from row 2.`, "Inloop CRM", 6);
}

/* ------------------------------------------------------------------ */
/* Master edits                                                        */
/* ------------------------------------------------------------------ */

function onMasterEdit(e) {
  const sheet = e.range.getSheet();
  if (sheet.getName() === CFG.EXECUTIVES_TAB) return; // names/emails: use menu item 2
  if (sheet.getName() !== CFG.MASTER_TAB) return;

  const r0 = e.range.getRow();
  const c0 = e.range.getColumn();
  const rows = e.range.getNumRows();
  const cols = e.range.getNumColumns();
  if (r0 + rows - 1 < 2) return;

  // Big structural edits (e.g. deleting whole columns) touch every row — ignore them
  if (cols > 3 || rows > 200) return;
  for (let r = Math.max(r0, 2); r < r0 + rows; r++) {
    if (!String(sheet.getRange(r, mCol("Lead ID")).getValue()).trim()) continue; // empty row
    for (let c = c0; c < c0 + cols; c++) {
      const header = MASTER_HEADERS[c - 1];
      if (header === "Assigned To") assignLead_(sheet, r);
      else if (SYNCED.includes(header)) pushToExecutive_(sheet, r, header);
      if (header === "Status" && sheet.getRange(r, c).getValue() === OPS_HANDOFF_STATUS) handToOps_(sheet, r);
    }
    sheet.getRange(r, mCol("Last Updated")).setValue(new Date());
  }
}

function assignLead_(master, row) {
  const leadId = master.getRange(row, mCol("Lead ID")).getValue();
  if (!leadId) return;
  const newName = String(master.getRange(row, mCol("Assigned To")).getValue()).trim();

  // Remove the lead from whoever had it before
  getExecutives_().forEach((ex) => {
    if (ex.name === newName || !ex.id) return;
    const sh = execLeadsSheet_(ex);
    const r = sh && findRowById_(sh, eCol("Lead ID"), leadId);
    if (r) sh.deleteRow(r);
  });

  if (!newName) {
    master.getRange(row, mCol("Date Assigned")).clearContent();
    return;
  }

  let ex = execByName_(newName);
  if (ex && !ex.id) {
    ensureExecutiveSheets();
    ex = execByName_(newName);
  }
  const sh = execLeadsSheet_(ex);
  if (!sh) return;

  const now = new Date();
  master.getRange(row, mCol("Date Assigned")).setValue(now);

  const values = master.getRange(row, 1, 1, MASTER_HEADERS.length).getValues()[0];
  const get = (h) => values[mCol(h) - 1];
  const out = EXEC_HEADERS.map((h) => {
    if (h === "Date Assigned") return now;
    if (h === "Schedule Meeting") return false;
    if (MEETING_FIELDS.includes(h) && isOpsLead_(leadId)) return "";
    if (COPIED.includes(h) || SYNCED.includes(h)) return get(h);
    return "";
  });
  if (out[eCol("Contact Number") - 1]) out[eCol("Contact Number") - 1] = "'" + out[eCol("Contact Number") - 1];

  let target = findRowById_(sh, eCol("Lead ID"), leadId);
  if (!target) {
    target = lastLeadRow_(sh) + 1;
    if (target > sh.getMaxRows()) {
      sh.insertRowsAfter(sh.getMaxRows(), 100);
      applyExecRules_(sh, target, 100);
    }
  }
  sh.getRange(target, 1, 1, EXEC_HEADERS.length).setValues([out]);
}

function pushToExecutive_(master, row, header) {
  if (MEETING_FIELDS.includes(header) && isOpsLead_(master.getRange(row, mCol("Lead ID")).getValue())) return;
  const name = String(master.getRange(row, mCol("Assigned To")).getValue()).trim();
  if (!name) return;
  const sh = execLeadsSheet_(execByName_(name));
  if (!sh) return;
  const leadId = master.getRange(row, mCol("Lead ID")).getValue();
  const r = findRowById_(sh, eCol("Lead ID"), leadId);
  if (r) sh.getRange(r, eCol(header)).setValue(master.getRange(row, mCol(header)).getValue());
}

/* ------------------------------------------------------------------ */
/* Executive edits → Master                                            */
/* ------------------------------------------------------------------ */

/** Installable trigger on each executive spreadsheet (runs as the Master owner). */
function onExecutiveEdit(e) {
  const sheet = e.range.getSheet();
  if (sheet.getName() !== CFG.EXEC_LEADS_TAB) return;
  const r0 = e.range.getRow();
  const rows = e.range.getNumRows();
  const c0 = e.range.getColumn();
  const cols = e.range.getNumColumns();
  const touched = [];
  for (let c = c0; c < c0 + cols; c++) if (SYNCED.includes(EXEC_HEADERS[c - 1])) touched.push(EXEC_HEADERS[c - 1]);
  if (!touched.length) return;

  const master = masterSS_().getSheetByName(CFG.MASTER_TAB);
  for (let r = Math.max(r0, 2); r < r0 + rows; r++) {
    const leadId = sheet.getRange(r, eCol("Lead ID")).getValue();
    const mr = leadId && findRowById_(master, mCol("Lead ID"), leadId);
    if (!mr) continue;
    const ops = isOpsLead_(leadId);
    touched.filter((h) => !(ops && MEETING_FIELDS.includes(h))).forEach((h) => master.getRange(mr, mCol(h)).setValue(sheet.getRange(r, eCol(h)).getValue()));
    master.getRange(mr, mCol("Last Updated")).setValue(new Date());
    if (touched.includes("Status") && sheet.getRange(r, eCol("Status")).getValue() === OPS_HANDOFF_STATUS) handToOps_(master, mr);
  }
}

/** Every few minutes: pull Status / Remarks / Brief / meeting from all executive sheets into Master. */
function syncFromExecutives() {
  const master = masterSS_().getSheetByName(CFG.MASTER_TAB);
  const last = master.getLastRow();
  if (last < 2) return;
  const data = master.getRange(2, 1, last - 1, MASTER_HEADERS.length).getValues();
  const index = {};
  data.forEach((row, i) => (index[String(row[0])] = i));
  let changed = false;

  getExecutives_().forEach((ex) => {
    const sh = execLeadsSheet_(ex);
    if (!sh || sh.getLastRow() < 2) return;
    sh.getRange(2, 1, sh.getLastRow() - 1, EXEC_HEADERS.length)
      .getValues()
      .forEach((er, j) => {
        const i = index[String(er[0])];
        if (i == null) return;
        if (String(data[i][mCol("Assigned To") - 1]).trim() !== ex.name) return;
        let ops = isOpsLead_(er[0]);
        SYNCED.forEach((h) => {
          if (ops && MEETING_FIELDS.includes(h)) return;
          const v = er[eCol(h) - 1];
          const cur = data[i][mCol(h) - 1];
          const same = v instanceof Date && cur instanceof Date ? v.getTime() === cur.getTime() : String(v) === String(cur);
          if (!same) {
            data[i][mCol(h) - 1] = v;
            data[i][mCol("Last Updated") - 1] = new Date();
            changed = true;
            if (h === "Status" && v === OPS_HANDOFF_STATUS && !ops) {
              markOpsLead_(er[0]);
              ops = true; // Meeting Date & Time / Link come after Status in SYNCED — skip them from now on
              data[i][mCol("Meeting Link") - 1] = "";
              sh.getRange(j + 2, eCol("Meeting Link")).clearContent();
              sh.getRange(j + 2, eCol("Schedule Meeting")).setValue(false);
            }
          }
        });
      });
  });

  if (changed) master.getRange(2, 1, data.length, MASTER_HEADERS.length).setValues(data);
}

/* ------------------------------------------------------------------ */
/* Proposal meeting (booked from Master by the ops lead, never shown to executives) */
/* ------------------------------------------------------------------ */

const isOpsLead_ = (leadId) => !!leadId && props().getProperty("OPS_" + leadId) === "1";
const markOpsLead_ = (leadId) => leadId && props().setProperty("OPS_" + leadId, "1");

/** Brief handed to Ops: remove the executive's meeting link everywhere and stop syncing meeting fields. */
function handToOps_(master, row) {
  const leadId = master.getRange(row, mCol("Lead ID")).getValue();
  if (!leadId || isOpsLead_(leadId)) return;
  markOpsLead_(leadId);
  master.getRange(row, mCol("Meeting Link")).clearContent();
  const name = String(master.getRange(row, mCol("Assigned To")).getValue()).trim();
  const sh = name && execLeadsSheet_(execByName_(name));
  const r = sh && findRowById_(sh, eCol("Lead ID"), leadId);
  if (!r) return;
  sh.getRange(r, eCol("Meeting Link")).clearContent();
  sh.getRange(r, eCol("Schedule Meeting")).setValue(false);
}

const isOps_ = (email) => String(email).toLowerCase() === CFG.OPS_EMAIL.toLowerCase();

/** Run once from the ops lead's own Google account — the meetings are then created from that account. */
function enableProposalMeetings() {
  const ui = SpreadsheetApp.getUi();
  if (!isOps_(Session.getActiveUser().getEmail())) {
    return ui.alert(`Open the Master sheet signed in as ${CFG.OPS_EMAIL} and run this again — the meetings are sent from that account.`);
  }
  ScriptApp.getProjectTriggers().forEach((t) => {
    if (t.getHandlerFunction() === "onProposalMeetingEdit") ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger("onProposalMeetingEdit").forSpreadsheet(masterSS_()).onEdit().create();
  Calendar.CalendarList.list({ maxResults: 1 }); // ask for Calendar permission now
  ui.alert(
    "Proposal meetings are on ✅\n\nOnce a lead's Status is 'Client Brief Shared to Ops Team', fill 'Meeting Date & Time' and tick 'Schedule Proposal Meeting'. The invite goes to the client from your account."
  );
}

/** Installable onEdit created by enableProposalMeetings — runs as the ops lead. */
function onProposalMeetingEdit(e) {
  if (!isOps_(Session.getEffectiveUser().getEmail())) return;
  const sheet = e.range.getSheet();
  if (sheet.getName() !== CFG.MASTER_TAB || e.range.getNumColumns() !== 1 || e.range.getColumn() !== mCol("Schedule Proposal Meeting")) return;
  for (let r = Math.max(e.range.getRow(), 2); r < e.range.getRow() + e.range.getNumRows(); r++) {
    if (sheet.getRange(r, mCol("Schedule Proposal Meeting")).getValue() === true) scheduleProposalRow_(sheet, r);
  }
}

function scheduleProposalSelected() {
  const ui = SpreadsheetApp.getUi();
  if (!isOps_(Session.getActiveUser().getEmail())) return ui.alert(`Only ${CFG.OPS_EMAIL} can book proposal meetings.`);
  const sheet = SpreadsheetApp.getActiveSheet();
  if (sheet.getName() !== CFG.MASTER_TAB) return ui.alert("Open the 'Master' tab and select a lead's row.");
  const r = sheet.getActiveRange().getRow();
  if (r >= 2) scheduleProposalRow_(sheet, r);
}

function scheduleProposalRow_(sheet, r) {
  const get = (h) => sheet.getRange(r, mCol(h)).getValue();
  const untick = () => sheet.getRange(r, mCol("Schedule Proposal Meeting")).setValue(false);
  const ss = sheet.getParent();
  const leadId = get("Lead ID");

  if (!isOpsLead_(leadId)) {
    untick();
    ss.toast(`Set Status to '${OPS_HANDOFF_STATUS}' first, then fill 'Meeting Date & Time' and tick again.`, "Inloop CRM", 8);
    return;
  }
  if (String(get("Meeting Link")).trim()) {
    ss.toast("A proposal meeting is already booked for this lead. Clear 'Meeting Link' to book a new one.", "Inloop CRM", 6);
    return;
  }
  const start = get("Meeting Date & Time");
  if (!(start instanceof Date)) {
    untick();
    ss.toast("Fill 'Meeting Date & Time' first (e.g. 25/10/2026 15:30), then tick again.", "Inloop CRM", 8);
    return;
  }

  const name = [get("First Name"), get("Last Name")].filter(String).join(" ");
  const company = get("Brand Name");
  const leadEmail = String(get("Email")).trim();
  const end = new Date(start.getTime() + CFG.OPS_MEETING_MINUTES * 60000);

  const event = Calendar.Events.insert(
    {
      summary: `Inloop Media × ${company || name || "Proposal Discussion"}`,
      description: proposalMessage_(get("First Name"), company),
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() },
      attendees: leadEmail ? [{ email: leadEmail }] : [],
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
  sheet.getRange(r, mCol("Meeting Link")).setValue(link);
  const posted = postBriefToSlack_(sheet, r, start);
  ss.toast(`Proposal meeting booked ✅ Invite sent to ${leadEmail || "you"}.${posted ? " Brief shared on Slack." : ""}`, "Inloop CRM", 8);
}

/* ------------------------------------------------------------------ */
/* Slack: brief posted to the team channel when a proposal meeting is booked */
/* ------------------------------------------------------------------ */

/** Menu: save the Slack Incoming Webhook URL (kept in Script Properties, not in the code). */
function connectSlack() {
  const ui = SpreadsheetApp.getUi();
  const res = ui.prompt("Connect Slack", "Paste the Slack Incoming Webhook URL for your channel (starts with https://hooks.slack.com/):", ui.ButtonSet.OK_CANCEL);
  if (res.getSelectedButton() !== ui.Button.OK) return;
  const url = res.getResponseText().trim();
  if (!/^https:\/\/hooks\.slack\.com\//.test(url)) return ui.alert("That doesn't look like a Slack webhook URL. Try again.");
  props().setProperty("SLACK_WEBHOOK_URL", url);
  const ok = slackSend_({ text: "✅ Inloop CRM connected — proposal meeting briefs will be posted here." });
  ui.alert(ok ? "Slack connected ✅ Check your channel for a test message." : "Saved, but Slack rejected the test message. Check the URL and try again.");
}

function slackSend_(payload) {
  const url = props().getProperty("SLACK_WEBHOOK_URL");
  if (!url) return false;
  try {
    const res = UrlFetchApp.fetch(url, { method: "post", contentType: "application/json", payload: JSON.stringify(payload), muteHttpExceptions: true });
    return res.getResponseCode() === 200;
  } catch (err) {
    console.warn("Slack post failed: " + err);
    return false;
  }
}

function postBriefToSlack_(sheet, r, start) {
  const get = (h) => String(sheet.getRange(r, mCol(h)).getValue() || "").trim();
  const when = Utilities.formatDate(start, Session.getScriptTimeZone(), "EEE, dd MMM yyyy · hh:mm a");
  const client = [get("First Name"), get("Last Name")].filter(Boolean).join(" ");
  const brand = get("Brand Name") || client || get("Lead ID");
  const lines = [
    `*Brand:* ${brand}`,
    `*Service Interest:* ${get("Service Interest") || "—"}`,
    `*Meeting:* ${when}`,
    `*Client:* ${client || "—"}   ·   *Executive:* ${get("Assigned To") || "—"}   ·   *Lead:* ${get("Lead ID")}`,
  ];
  return slackSend_({
    text: `New proposal meeting: ${brand} — ${when}`,
    blocks: [
      { type: "header", text: { type: "plain_text", text: `📋 Proposal meeting — ${brand}`.slice(0, 150) } },
      { type: "section", text: { type: "mrkdwn", text: lines.join("\n") } },
      { type: "section", text: { type: "mrkdwn", text: `*Brief:*\n${(get("Brief") || "_No brief added_").slice(0, 2900)}` } },
    ],
  });
}

/** Text the client sees in the proposal meeting invite. */
function proposalMessage_(firstName, company) {
  return [
    `Hi ${firstName || "there"},`,
    "",
    `Thank you for sharing your brief with us. As a next step, we'd love to go deeper into your goals for ${company || "your brand"}.`,
    "",
    "On this call we'll walk you through our thinking and how we would approach your brief.",
    "",
    "Looking forward to speaking with you.",
    "",
    "Warm regards,",
    `${CFG.OPS_NAME}\nInloop Media`,
  ].join("\n");
}

/* ------------------------------------------------------------------ */

function masterSS_() {
  return SpreadsheetApp.openById(masterId_());
}

function masterId_() {
  let id = props().getProperty("MASTER_ID");
  if (!id) {
    id = SpreadsheetApp.getActive().getId();
    props().setProperty("MASTER_ID", id);
  }
  return id;
}

function extractId_(url) {
  const m = String(url).match(/\/d\/([a-zA-Z0-9-_]+)/);
  return m ? m[1] : String(url).trim().match(/^[a-zA-Z0-9-_]{30,}$/) ? String(url).trim() : null;
}
